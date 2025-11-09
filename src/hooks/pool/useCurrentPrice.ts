import {useMemo} from 'react';
import type {Address} from 'viem';
import {usePriceSqrtPriceX96} from './usePriceAtTick';
import {useCurrentTick} from './useCurrentTick';

export const useCurrentPrice = (poolAddr?: Address) => {
  const {sqrtPriceX96, exact, rounded} = useCurrentTick(poolAddr);
  const currentPrice = usePriceSqrtPriceX96(sqrtPriceX96, poolAddr);

  return useMemo(
    () => ({currentPrice, sqrtPriceX96, currentTick: {exact, rounded}}),
    [currentPrice, exact, rounded],
  );
};
