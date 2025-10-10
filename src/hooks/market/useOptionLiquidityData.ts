import {useMemo} from 'react';
import type {Address} from 'viem';
import {useMarketData} from './useMarketData';
import {usePoolData} from '../pool/usePoolData';
import {useCurrentTick} from '../pool/useCurrentTick';
import {
  liquiditiesToAmount1,
  liquiditiesToAmount0,
  liquiditiesToAmounts,
  token0ToToken1,
  token1ToToken0,
  getPriceAtTick,
  PRICE_PRECISION,
} from '../../lib/liquidityUtils';

export const useOptionLiquidityData = (
  marketAddr: Address,
  optionType: 'CALL' | 'PUT',
  liquidities: bigint[],
  strikeTick: number,
  entryTick: number,
) => {
  const {pool, optionAssetIsToken0} = useMarketData(marketAddr);
  const {tickSpacing} = usePoolData(pool);
  const {exact: currentTick} = useCurrentTick(pool);

  return useMemo(() => {
    if (
      tickSpacing === undefined ||
      currentTick === undefined ||
      optionAssetIsToken0 === undefined
    ) {
      return {
        optionAssetToRepay: undefined,
        payoutAssetToRepay: undefined,
        optionAssetBorrowed: undefined,
        payoutAssetBorrowed: undefined,
        positionSize: undefined,
        displayPnl: undefined,
        strikePrice: undefined,
      };
    }

    const leftTick =
      optionType === 'CALL'
        ? strikeTick
        : strikeTick - tickSpacing * liquidities.length;

    const [repayAmount0, repayAmount1] = liquiditiesToAmounts(
      liquidities,
      leftTick,
      currentTick,
      tickSpacing,
    );
    const borrowedAmount0 = liquiditiesToAmount0(
      liquidities,
      leftTick,
      tickSpacing,
    );
    const borrowedAmount1 = liquiditiesToAmount1(
      liquidities,
      leftTick,
      tickSpacing,
    );

    const [optionAssetToRepay, payoutAssetToRepay] = optionAssetIsToken0
      ? [repayAmount0, repayAmount1]
      : [repayAmount1, repayAmount0];

    let optionAssetBorrowed = 0n;
    let payoutAssetBorrowed = 0n;
    let positionSize = 0n;

    if (optionType === 'CALL') {
      optionAssetBorrowed = optionAssetIsToken0
        ? borrowedAmount0
        : borrowedAmount1;
      positionSize = optionAssetBorrowed;
    } else {
      payoutAssetBorrowed = optionAssetIsToken0
        ? borrowedAmount1
        : borrowedAmount0;
      positionSize = optionAssetIsToken0
        ? token1ToToken0(payoutAssetBorrowed, entryTick)
        : token0ToToken1(payoutAssetBorrowed, entryTick);
    }

    const displayPnl =
      optionType === 'CALL'
        ? optionAssetIsToken0
          ? token0ToToken1(positionSize, currentTick) -
            token0ToToken1(positionSize, entryTick)
          : token1ToToken0(positionSize, currentTick) -
            token1ToToken0(positionSize, entryTick)
        : optionAssetIsToken0
          ? token0ToToken1(positionSize, entryTick) -
            token0ToToken1(positionSize, currentTick)
          : token1ToToken0(positionSize, entryTick) -
            token1ToToken0(positionSize, currentTick);

    const strikePrice = optionAssetIsToken0
      ? getPriceAtTick(strikeTick)
      : (PRICE_PRECISION * PRICE_PRECISION) / getPriceAtTick(strikeTick);

    return {
      optionAssetToRepay,
      payoutAssetToRepay,
      optionAssetBorrowed,
      payoutAssetBorrowed,
      positionSize,
      displayPnl,
      strikePrice,
    };
  }, [
    tickSpacing,
    currentTick,
    optionAssetIsToken0,
    optionType,
    strikeTick,
    liquidities,
    entryTick,
  ]);
};
