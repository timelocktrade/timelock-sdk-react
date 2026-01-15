import type {Address} from 'viem';
import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';

import {useTimelockConfig} from '~/providers/TimelockProvider';
import type {PoolKey} from '~/lib/liquidityUtils';
import {getPoolId} from '~/lib/utils';

export const usePoolVolume = (
  poolManager: Address | undefined,
  poolKey: PoolKey | undefined,
) => {
  const {uniV4GraphqlClient} = useTimelockConfig();

  const poolId = useMemo(
    () => (poolKey ? getPoolId(poolKey) : undefined),
    [poolKey],
  );

  return useQuery({
    queryKey: [
      'poolVolume',
      poolId?.toLowerCase() || '--',
      poolManager?.toLowerCase() || '--',
    ],
    queryFn: async () => {
      const result = await uniV4GraphqlClient!.GetPoolVolume({
        poolId: poolId!,
      });
      return {
        ...result.Pool[0],
        volume0: BigInt(result.Pool[0].volume0),
        volume1: BigInt(result.Pool[0].volume1),
        fees0: BigInt(result.Pool[0].fees0),
        fees1: BigInt(result.Pool[0].fees1),
        txCount: BigInt(result.Pool[0].txCount),
        swapCount: BigInt(result.Pool[0].swapCount),
        modifyLiquidityCount: BigInt(result.Pool[0].modifyLiquidityCount),
        positionCount: BigInt(result.Pool[0].positionCount),
      };
    },
    enabled: !!poolId && !!uniV4GraphqlClient,
  });
};
