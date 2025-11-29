import type {NonUndefinedGuard} from '@tanstack/react-query';
import type {Address} from 'viem';
import {useMemo} from 'react';
import {useReadContract} from 'wagmi';
import {useLens} from '~/hooks/useLens';
import {lensAbi} from '~/abis/lens';

export type PoolKey = {
  currency0: Address;
  currency1: Address;
  fee: number;
  tickSpacing: number;
  hooks: Address;
};

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
