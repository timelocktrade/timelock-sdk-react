import type {Address} from 'viem';
import {useReadContract} from 'wagmi';
import type {PoolKey} from './usePoolData';
import {useLens} from '~/hooks/useLens';
import {statelessStateViewAbi} from '~/abis/statelessStateView';

export const useCurrentTick = (poolManager?: Address, poolKey?: PoolKey) => {
  const {stateView} = useLens();

  return useReadContract({
    address: stateView?.address,
    abi: statelessStateViewAbi,
    functionName: 'getSlot0',
    args: poolManager && poolKey ? [poolManager, poolKey] : undefined,
    query: {
      enabled: !!poolManager && !!poolKey,
      refetchInterval: 3000,
      select: (raw: readonly [bigint, number, number, number]) => {
        const sqrtPriceX96 = raw[0];
        const currentTick = raw[1];
        return {currentTick, sqrtPriceX96};
      },
    },
  });
};
