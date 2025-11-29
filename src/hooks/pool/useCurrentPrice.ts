import {useMemo} from 'react';
import type {Address} from 'viem';
import type {PoolKey} from './usePoolData';
import {usePriceAtSqrtPriceX96} from './usePriceAtTick';
import {useCurrentTick} from './useCurrentTick';

export const useCurrentPrice = (poolManager?: Address, poolKey?: PoolKey) => {
  const {data: {sqrtPriceX96, currentTick} = {}} = useCurrentTick(
    poolManager,
    poolKey,
  );
  const currentPrice = usePriceAtSqrtPriceX96(
    poolManager,
    poolKey,
    sqrtPriceX96,
  );
  return useMemo(
    () => ({currentPrice, sqrtPriceX96, currentTick}),
    [currentPrice, currentTick],
  );
};
