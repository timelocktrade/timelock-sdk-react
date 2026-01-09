import {useMemo} from 'react';
import {useReadContracts} from 'wagmi';

import type {OptionData} from './useUserOptions';
import {useLens} from '~/hooks/useLens';
import {useMarketsData} from '~/hooks/market/useMarketData';
import {useCurrentPrices} from '~/hooks/pool/useCurrentPrice';
import {
  PRICE_PRECISION,
  liquiditiesToAmounts,
  token0ToToken1,
  token0ToToken1AtTick,
  token1ToToken0,
  token1ToToken0AtTick,
} from '~/lib/liquidityUtils';
import {wrapAmount, type Amount} from '~/lib/numberUtils';
import {quoterAbi} from '~/abis/quoterV4';

const calculateDisplayPnl = (
  option: OptionData,
  scaledPrice: bigint,
  optionAssetIsToken0: boolean,
  payoutAssetDecimals: number,
): Amount => {
  const strikeSize = optionAssetIsToken0
    ? token0ToToken1AtTick(option.positionSizeCurrent, option.strikeTick)
    : token1ToToken0AtTick(option.positionSizeCurrent, option.strikeTick);

  const currentSize = optionAssetIsToken0
    ? token0ToToken1(option.positionSizeCurrent, scaledPrice)
    : token1ToToken0(option.positionSizeCurrent, scaledPrice);

  const delta = currentSize - strikeSize;
  const pnl = option.optionType === 'CALL' ? delta : -delta;

  return wrapAmount(pnl, payoutAssetDecimals);
};

export const useOptionsPnl = (options: OptionData[]) => {
  const {quoter} = useLens();

  const marketAddrs = useMemo(() => options.map(o => o.marketAddr), [options]);
  const {data: marketsData} = useMarketsData(marketAddrs);

  const poolInputs = useMemo(() => {
    return (
      marketsData?.map(marketData => ({
        poolManager: marketData.poolManager,
        poolKey: marketData.poolKey,
        token0For1: true,
      })) || []
    );
  }, [marketsData]);

  const {data: pricesData} = useCurrentPrices(poolInputs);

  const displayPnls = useMemo(() => {
    if (!marketsData || !pricesData) return undefined;

    return options.map((option, i) => {
      const marketData = marketsData[i];
      const priceData = pricesData[i];

      if (!marketData || !priceData) {
        throw new Error('Missing market or price data');
      }
      const {optionAssetIsToken0, payoutAssetDecimals} = marketData;

      return calculateDisplayPnl(
        option,
        priceData.currentPrice.scaled,
        optionAssetIsToken0,
        payoutAssetDecimals,
      );
    });
  }, [options, marketsData, pricesData]);

  // Compute values needed for quotes
  const computedValues = useMemo(() => {
    if (!marketsData || !pricesData) return [];

    return options.map((option, i) => {
      const marketData = marketsData[i];
      const priceData = pricesData[i];

      if (!marketData || !priceData) {
        throw new Error('Missing market or price data');
      }
      const {poolManager, poolKey, optionAssetIsToken0, payoutAssetDecimals} =
        marketData;
      const tickSpacing = poolKey?.tickSpacing;

      const entryPrice = optionAssetIsToken0
        ? option.entryPrice
        : PRICE_PRECISION ** 2n / option.entryPrice;

      const [borrowed0, borrowed1] = liquiditiesToAmounts(
        option.liquiditiesCurrent,
        option.startTick,
        entryPrice,
        tickSpacing,
      );
      const [repay0, repay1] = liquiditiesToAmounts(
        option.liquiditiesCurrent,
        option.startTick,
        priceData.currentPrice.scaled,
        tickSpacing,
      );

      const isLong0 =
        (optionAssetIsToken0 && option.optionType === 'CALL') ||
        (!optionAssetIsToken0 && option.optionType === 'PUT');

      const borrowedLong = isLong0 ? borrowed0 : borrowed1;
      const repayLong = isLong0 ? repay0 : repay1;

      const excessLong =
        borrowedLong > repayLong ? borrowedLong - repayLong : 0n;
      const neededShort = isLong0 ? repay1 : repay0;

      const output0 = !optionAssetIsToken0;

      return {
        excessLong,
        neededShort,
        option,
        poolManager,
        poolKey,
        isLong0,
        output0,
      };
    });
  }, [options, marketsData, pricesData]);

  // Batch fetch quotes using useReadContracts
  const {data: quoteResults, ...rest} = useReadContracts({
    contracts: computedValues
      .filter(v => v.neededShort > 0n && v.excessLong > 0n)
      .map(computed => {
        const {neededShort, excessLong, isLong0, output0} = computed;

        const isExactOutput = (isLong0 && output0) || (!isLong0 && !output0);

        const functionName = isExactOutput
          ? 'quoteExactOutputSingle'
          : 'quoteExactInputSingle';

        const amount = isExactOutput ? excessLong : neededShort;

        const params = {
          poolKey: computed.poolKey,
          zeroForOne: computed.isLong0,
          exactAmount: amount,
          hookData: '0x' as const,
        } as const;

        return {
          address: quoter?.address,
          abi: quoterAbi,
          functionName,
          args: [computed.poolManager, params] as const,
        } as const;
      }),
    query: {
      enabled:
        quoter?.address &&
        computedValues.length > 0 &&
        computedValues.some(v => v.neededShort > 0n && v.excessLong > 0n),
      staleTime: 10_000,
    },
  });

  // Process quote results into unrealized payouts
  const unrealizedPayouts = useMemo(() => {
    if (!marketsData || !quoteResults) return undefined;

    let quoteIndex = 0;

    const payouts = computedValues.map((computed, i) => {
      const {payoutAssetDecimals} = marketsData[i];
      const {neededShort, excessLong, isLong0, output0} = computed;

      const hasQuote = computed.neededShort > 0n && computed.excessLong > 0n;
      const isExactOutput = (isLong0 && output0) || (!isLong0 && !output0);

      if (!hasQuote) {
        return wrapAmount(0n, payoutAssetDecimals);
      }
      const result = quoteResults[quoteIndex++];

      if (result.status === 'success' && result.result) {
        const [swapResult] = result.result as [bigint, bigint];

        let payout: bigint;

        if (isExactOutput) {
          payout = excessLong > swapResult ? excessLong - swapResult : 0n;
        } else {
          payout = swapResult > neededShort ? swapResult - neededShort : 0n;
        }
        return wrapAmount(payout, payoutAssetDecimals);
      } else {
        return wrapAmount(0n, payoutAssetDecimals);
      }
    });
    return payouts;
  }, [quoteResults, computedValues, marketsData]);

  // Combine results
  const results = useMemo(() => {
    return displayPnls && unrealizedPayouts
      ? options.map((option, i) => ({
          option,
          displayPnl: displayPnls[i],
          unrealizedPayout: unrealizedPayouts[i],
        }))
      : undefined;
  }, [options, displayPnls, unrealizedPayouts]);

  return {data: results, ...rest};
};
