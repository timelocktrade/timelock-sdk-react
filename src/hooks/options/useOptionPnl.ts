import {useMemo} from 'react';
import {useReadContracts} from 'wagmi';
import {useQuery} from '@tanstack/react-query';
import {usePublicClient} from 'wagmi';

import type {OptionData} from './useUserOptions';
import {useMarketData, useMarketsData} from '~/hooks/market/useMarketData';
import {useCurrentPrice, useCurrentPrices} from '~/hooks/pool/useCurrentPrice';
import {usePoolData} from '~/hooks/pool/usePoolData';
import {useLens} from '~/hooks/useLens';
import {
  liquiditiesToAmounts,
  PRICE_PRECISION,
  token0ToToken1,
  token0ToToken1AtTick,
  token1ToToken0,
  token1ToToken0AtTick,
} from '~/lib/liquidityUtils';
import {type Amount, wrapAmount} from '~/lib/numberUtils';
import {getQuoter} from '~/lib/contracts';
import {quoterAbi} from '~/abis/quoterV4';

const calculateDisplayPnl = (
  option: OptionData,
  poolPrice: bigint,
  optionAssetIsToken0: boolean,
  payoutAssetDecimals: number,
): Amount => {
  const strikeSize = optionAssetIsToken0
    ? token0ToToken1AtTick(option.positionSizeCurrent, option.strikeTick)
    : token1ToToken0AtTick(option.positionSizeCurrent, option.strikeTick);

  const currentSize = optionAssetIsToken0
    ? token0ToToken1(option.positionSizeCurrent, poolPrice)
    : token1ToToken0(option.positionSizeCurrent, poolPrice);

  const delta = currentSize - strikeSize;
  const pnl = option.optionType === 'CALL' ? delta : -delta;

  return wrapAmount(pnl, payoutAssetDecimals);
};

export const useOptionPnl = (option?: OptionData) => {
  const client = usePublicClient();

  const {poolManager, poolKey, optionAssetIsToken0, payoutAssetDecimals} =
    useMarketData(option?.marketAddr);

  const {currentPrice: poolPrice} = useCurrentPrice(poolManager, poolKey);
  const {tickSpacing} = usePoolData(poolManager, poolKey);

  // Simple theoretical PnL (no slippage)
  const displayPnl = useMemo(() => {
    if (
      !option ||
      !poolPrice ||
      !payoutAssetDecimals ||
      optionAssetIsToken0 === undefined
    )
      return undefined;

    return calculateDisplayPnl(
      option,
      poolPrice.scaled,
      optionAssetIsToken0,
      payoutAssetDecimals,
    );
  }, [option, optionAssetIsToken0, poolPrice, payoutAssetDecimals]);

  // Actual payout accounting for slippage via quoter
  const canQueryPayout =
    !!client &&
    !!poolManager &&
    !!poolKey &&
    !!tickSpacing &&
    !!poolPrice &&
    !!payoutAssetDecimals &&
    optionAssetIsToken0 !== undefined;

  const {data: unrealizedPayout} = useQuery({
    queryKey: [
      'unrealizedPayout',
      option?.id || '-',
      poolPrice?.scaled.toString() || '-',
    ],
    queryFn: async () => {
      if (!option || !poolPrice || !payoutAssetDecimals || !tickSpacing) return;

      const {optionType, marketAddr} = option;

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
        poolPrice.scaled,
        tickSpacing,
      );
      const isLong0 =
        (optionAssetIsToken0 && optionType === 'CALL') ||
        (!optionAssetIsToken0 && optionType === 'PUT');

      const borrowedLong = isLong0 ? borrowed0 : borrowed1;
      const repayLong = isLong0 ? repay0 : repay1;

      const excessLong =
        borrowedLong > repayLong ? borrowedLong - repayLong : 0n;
      const neededShort = isLong0 ? repay1 : repay0;

      if (neededShort === 0n || excessLong === 0n)
        return wrapAmount(0n, payoutAssetDecimals!);

      const quoter = await getQuoter(client!);
      const output0 = !optionAssetIsToken0;

      let payout: bigint;

      const isExactOutput = (isLong0 && output0) || (!isLong0 && !output0);
      const exactAmount = isExactOutput ? neededShort : excessLong;

      const params = {
        poolKey: poolKey!,
        zeroForOne: isLong0,
        exactAmount,
        hookData: '0x',
      } as const;

      if (isExactOutput) {
        const {
          result: [swappedLong],
        } = await quoter.simulate.quoteExactOutputSingle(
          [poolManager!, params],
          {account: marketAddr},
        );
        payout = excessLong > swappedLong ? excessLong - swappedLong : 0n;
      } else {
        const {
          result: [receviedShort],
        } = await quoter.simulate.quoteExactInputSingle(
          [poolManager!, params],
          {account: marketAddr},
        );
        payout = receviedShort > neededShort ? receviedShort - neededShort : 0n;
      }
      return wrapAmount(payout, payoutAssetDecimals);
    },
    enabled: canQueryPayout,
    staleTime: 10_000, // Cache for 10s to avoid excessive quoter calls
  });

  return {unrealizedPayout, displayPnl};
};
