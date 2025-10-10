import type {Address} from 'viem';
import {useCurrentTick} from './useCurrentTick';

import type {UniswapPool} from '~/lib/contracts';
import usePriceAtTick from './usePriceAtTick';

export const useCurrentPrice = (pool?: Address | UniswapPool) => {
  const currentTick = useCurrentTick(pool);
  const currentPrice = usePriceAtTick(currentTick.exact, pool);

  return {currentPrice, currentTick};
};
