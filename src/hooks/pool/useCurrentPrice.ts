import {useMemo} from 'react';
import type {Address} from 'viem';
import {usePriceAtSqrtPriceX96} from './usePriceAtTick';
import {useCurrentTick, useCurrentTicks} from './useCurrentTick';
import {usePoolsData, type PoolInput} from './usePoolData';
import {getPriceAtSqrtPriceX96, type PoolKey} from '~/lib/liquidityUtils';
import {wrapPrice} from '~/lib/numberUtils';

export const useCurrentPrice = (
  poolManager?: Address,
  poolKey?: PoolKey,
  token0For1 = true,
) => {
  const {data: {sqrtPriceX96, currentTick} = {}} = useCurrentTick(
    poolManager,
    poolKey,
  );
  const currentPrice = usePriceAtSqrtPriceX96(
    poolManager,
    poolKey,
    sqrtPriceX96,
    token0For1,
  );

  return useMemo(
    () => ({currentPrice, sqrtPriceX96, currentTick}),
    [currentPrice, sqrtPriceX96, currentTick],
  );
};

export const useCurrentPrices = (
  pools: (PoolInput & {token0For1: boolean})[],
) => {
  const {data: ticksData, ...ticksResult} = useCurrentTicks(pools);
  const {data: poolsData} = usePoolsData(pools);

  const pricesBigInt = useMemo(() => {
    if (!ticksData) return undefined;

    return ticksData.map(({sqrtPriceX96}, index) =>
      getPriceAtSqrtPriceX96(sqrtPriceX96, pools[index].token0For1),
    );
  }, [ticksData, pools]);

  const data = useMemo(() => {
    if (!ticksData || !pricesBigInt || !poolsData) return undefined;

    return pricesBigInt.map((priceBigInt, index) => ({
      currentPrice: wrapPrice(
        priceBigInt,
        pools[index].token0For1
          ? poolsData[index]!.token0Decimals
          : poolsData[index]!.token1Decimals,
        pools[index].token0For1
          ? poolsData[index]!.token1Decimals
          : poolsData[index]!.token0Decimals,
      ),
      sqrtPriceX96: ticksData[index]!.sqrtPriceX96,
      currentTick: ticksData[index]!.currentTick,
    }));
  }, [ticksData, poolsData, pricesBigInt]);

  return {...ticksResult, data};
};
