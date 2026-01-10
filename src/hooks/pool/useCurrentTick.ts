import type {Address} from 'viem';
import {useMemo} from 'react';
import {useReadContract, useReadContracts} from 'wagmi';
import {useLens} from '~/hooks/useLens';
import type {PoolKey} from '~/lib/liquidityUtils';
import {stateViewAbi} from '~/abis/stateView';
import type {PoolInput} from './usePoolData';

export const useCurrentTick = (poolManager?: Address, poolKey?: PoolKey) => {
  const {stateView} = useLens();

  return useReadContract({
    address: stateView?.address,
    abi: stateViewAbi,
    functionName: 'getSlot0',
    args: poolManager && poolKey ? [poolManager, poolKey] : undefined,
    query: {
      enabled: !!poolManager && !!poolKey,
      refetchInterval: 3000,
      select: raw => {
        const sqrtPriceX96 = raw[0];
        const currentTick = raw[1];
        return {currentTick, sqrtPriceX96};
      },
    },
  });
};

export const useCurrentTicks = (pools: PoolInput[]) => {
  const {stateView} = useLens();

  // Get unique pools and create index mapping
  const {uniquePools, indexMap} = useMemo(() => {
    const seen = new Map<string, number>();
    const unique: PoolInput[] = [];
    const mapping: number[] = [];

    for (const pool of pools) {
      const key = [
        pool.poolManager,
        pool.poolKey.currency0,
        pool.poolKey.currency1,
        pool.poolKey.fee,
        pool.poolKey.tickSpacing,
        pool.poolKey.hooks,
      ].join('-');

      if (!seen.has(key)) {
        seen.set(key, unique.length);
        unique.push(pool);
      }
      mapping.push(seen.get(key)!);
    }

    return {uniquePools: unique, indexMap: mapping};
  }, [pools]);

  // Build contracts array for unique pools only
  const contracts = useMemo(() => {
    if (!stateView) return undefined;

    return uniquePools.map(({poolManager, poolKey}) => ({
      address: stateView.address,
      abi: stateViewAbi,
      functionName: 'getSlot0' as const,
      args: [poolManager, poolKey] as const,
    }));
  }, [stateView, uniquePools]);

  const result = useReadContracts({
    contracts,
    query: {
      enabled: !!stateView && pools.length > 0,
      refetchInterval: 3000,
    },
  });

  // Map unique results back to original array order (with duplicates)
  const data = useMemo(() => {
    if (!result.data) return undefined;

    return indexMap.map(idx => {
      const raw = result.data[idx]?.result;

      if (!raw) {
        throw new Error(`Failed to fetch data for pool at index ${idx}`);
      }
      const sqrtPriceX96 = raw[0];
      const currentTick = raw[1];

      return {currentTick, sqrtPriceX96};
    });
  }, [result.data, indexMap]);

  return {...result, data};
};
