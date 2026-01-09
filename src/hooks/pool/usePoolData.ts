import type {NonUndefinedGuard} from '@tanstack/react-query';
import type {Address} from 'viem';
import {useMemo} from 'react';
import {useReadContract, useReadContracts} from 'wagmi';
import {useLens} from '~/hooks/useLens';
import type {PoolKey} from '~/lib/liquidityUtils';
import {lensAbi} from '~/abis/lens';

export type UniswapPoolData = ReturnType<typeof usePoolData>;

export const usePoolData = (poolManager?: Address, poolKey?: PoolKey) => {
  const {timelockLens} = useLens();

  const {data} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getPoolData',
    args: poolManager && poolKey ? [poolManager, poolKey] : undefined,
    query: {enabled: !!poolManager && !!poolKey},
  });
  const _default = useMemo(
    () => ({
      token0: poolKey?.currency0,
      token1: poolKey?.currency1,
      tickSpacing: poolKey?.tickSpacing,
      fee: poolKey?.fee,
    }),
    [poolKey],
  );
  return (data || _default) as Partial<NonUndefinedGuard<typeof data>>;
};

export type PoolInput = {
  poolManager: Address;
  poolKey: PoolKey;
};

export const usePoolsData = (pools: PoolInput[]) => {
  const {timelockLens} = useLens();

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
    if (!timelockLens) return [];

    return uniquePools.map(({poolManager, poolKey}) => ({
      address: timelockLens.address,
      abi: lensAbi,
      functionName: 'getPoolData' as const,
      args: [poolManager, poolKey] as const,
    }));
  }, [timelockLens, uniquePools]);

  const result = useReadContracts({
    contracts,
    query: {
      enabled: !!timelockLens && pools.length > 0,
      staleTime: 30_000,
    },
  });

  // Map unique results back to original array order (with duplicates)
  const data = useMemo(() => {
    if (!result.data) return undefined;

    return indexMap.map(idx => {
      const poolData = result.data[idx]?.result;

      if (!poolData) {
        throw new Error(`Failed to fetch data for pool at index ${idx}`);
      }
      return poolData;
    });
  }, [result.data, indexMap]);

  return {...result, data};
};
