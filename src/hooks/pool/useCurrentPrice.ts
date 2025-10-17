import {useMemo} from 'react';
import type {Address} from 'viem';
import {usePriceAtTick} from './usePriceAtTick';
import {useCurrentTick} from './useCurrentTick';

export const useCurrentPrice = (poolAddr?: Address) => {
  const currentTick = useCurrentTick(poolAddr);
  const currentPrice = usePriceAtTick(currentTick.exact, poolAddr);

  return useMemo(
    () => ({currentPrice, currentTick}),
    [currentPrice, currentTick],
  );
};
