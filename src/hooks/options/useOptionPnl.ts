import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {usePublicClient} from 'wagmi';

import type {OptionData} from './useUserOptions';
import {useMarketData} from '~/hooks/market/useMarketData';
import {useCurrentPrice} from '~/hooks/pool/useCurrentPrice';
import {usePoolData} from '~/hooks/pool/usePoolData';
import {
  liquiditiesToAmounts,
  PRICE_PRECISION,
  token0ToToken1,
  token0ToToken1AtTick,
  token1ToToken0,
  token1ToToken0AtTick,
} from '~/lib/liquidityUtils';
import {wrapAmount} from '~/lib/numberUtils';
import {getQuoter} from '~/lib/contracts';

export const useOptionPnl = (option: OptionData) => {
  const {marketAddr, optionType, strikeTick, positionSizeCurrent} = option;

  const client = usePublicClient();
  const {poolManager, poolKey, optionAssetIsToken0, payoutAssetDecimals} =
    useMarketData(marketAddr);
  const {tickSpacing} = usePoolData(poolManager, poolKey);
  const {currentPrice} = useCurrentPrice(poolManager, poolKey);

  // Simple theoretical PnL (no slippage)
  const displayPnl = useMemo(() => {
    if (
      !currentPrice ||
      !payoutAssetDecimals ||
      optionAssetIsToken0 === undefined
    )
      return undefined;

    const strikeSize = optionAssetIsToken0
      ? token0ToToken1AtTick(positionSizeCurrent, strikeTick)
      : token1ToToken0AtTick(positionSizeCurrent, strikeTick);

    const currentSize = optionAssetIsToken0
      ? token0ToToken1(positionSizeCurrent, currentPrice.scaled)
      : token1ToToken0(positionSizeCurrent, currentPrice.scaled);

    const delta = currentSize - strikeSize;
    const pnl = optionType === 'CALL' ? delta : -delta;

    return wrapAmount(pnl, payoutAssetDecimals);
  }, [
    strikeTick,
    optionType,
    optionAssetIsToken0,
    currentPrice,
    positionSizeCurrent,
    payoutAssetDecimals,
  ]);

  // Actual payout accounting for slippage via quoter
  const canQueryPayout =
    !!client &&
    !!poolManager &&
    !!poolKey &&
    !!tickSpacing &&
    !!currentPrice &&
    !!payoutAssetDecimals &&
    optionAssetIsToken0 !== undefined;

  const {data: unrealizedPayout} = useQuery({
    queryKey: ['unrealizedPayout', option.id, currentPrice?.scaled.toString()],
    queryFn: async () => {
      const entryPrice = optionAssetIsToken0
        ? option.entryPrice
        : PRICE_PRECISION ** 2n / option.entryPrice;

      const [borrowed0, borrowed1] = liquiditiesToAmounts(
        option.liquiditiesCurrent,
        option.startTick,
        entryPrice,
        tickSpacing!,
      );
      const [repay0, repay1] = liquiditiesToAmounts(
        option.liquiditiesCurrent,
        option.startTick,
        currentPrice!.scaled,
        tickSpacing!,
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
      if ((isLong0 && output0) || (!isLong0 && !output0)) {
        // Need exact output amount
        const {
          result: [swappedLong],
        } = await quoter.simulate.quoteExactOutputSingle(
          [
            poolManager!,
            {
              poolKey: poolKey!,
              zeroForOne: isLong0,
              exactAmount: neededShort,
              hookData: '0x',
            },
          ],
          {account: marketAddr},
        );
        payout = excessLong > swappedLong ? excessLong - swappedLong : 0n;
      } else {
        // Swap all excess input
        const {
          result: [receviedShort],
        } = await quoter.simulate.quoteExactInputSingle(
          [
            poolManager!,
            {
              poolKey: poolKey!,
              zeroForOne: isLong0,
              exactAmount: excessLong,
              hookData: '0x',
            },
          ],
          {account: marketAddr},
        );
        payout = receviedShort > neededShort ? receviedShort - neededShort : 0n;
      }

      return wrapAmount(payout, payoutAssetDecimals!);
    },
    enabled: canQueryPayout,
    staleTime: 10_000, // Cache for 10s to avoid excessive quoter calls
  });

  return {unrealizedPayout, displayPnl};
};
