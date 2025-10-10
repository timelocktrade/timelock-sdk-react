import type {Address} from 'viem';
import {useClient} from 'wagmi';
import {useQuery} from '@tanstack/react-query';
import {getUniswapPool, type UniswapPool} from '../../lib/contracts';

export const getCurrentTick = async (pool: UniswapPool) => {
  const [tickSpacing, {1: exact}] = await Promise.all([
    pool.read.tickSpacing(),
    pool.read.slot0(),
  ]);
  const rounded = Math.floor(exact / tickSpacing) * tickSpacing;
  return {exact, rounded};
};

export const useCurrentTick = (pool?: Address | UniswapPool) => {
  const client = useClient();

  const {data: currentTick} = useQuery({
    queryKey: [
      'currentTick',
      typeof pool !== 'string' ? pool?.address || '-' : pool,
    ],
    queryFn: () =>
      getCurrentTick(
        typeof pool === 'string' ? getUniswapPool(pool, client!) : pool!,
      ),
    enabled: !!pool && !!client,
    refetchInterval: 5000,
  });
  return (currentTick || {}) as {exact?: number; rounded?: number};
};
