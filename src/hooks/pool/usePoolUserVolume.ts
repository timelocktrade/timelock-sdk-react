import type {Address} from 'viem';
import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';

import {useTimelockConfig} from '~/providers/TimelockProvider';
import type {PoolKey} from '~/lib/liquidityUtils';
import {getPoolId} from '~/lib/utils';

export const usePoolUserVolume = (
  poolManager: Address | undefined,
  poolKey: PoolKey | undefined,
  userAddr: Address | undefined,
) => {
  const {uniV4GraphqlClient} = useTimelockConfig();

  const poolId = useMemo(
    () => (poolKey ? getPoolId(poolKey) : undefined),
    [poolKey],
  );

  return useQuery({
    queryKey: [
      'poolUserVolume',
      poolManager?.toLowerCase() || '--',
      poolId?.toLowerCase() || '--',
      userAddr?.toLowerCase() || '--',
    ],
    queryFn: async () => {
      const result = await uniV4GraphqlClient!.GetPoolUserVolume({
        poolId: poolId!,
        userAddr: userAddr!,
      });
      return {
        address: result.PoolUser[0].address as Address,
        volume0: BigInt(result.PoolUser[0].volume0),
        volume1: BigInt(result.PoolUser[0].volume1),
        fees0: BigInt(result.PoolUser[0].fees0),
        fees1: BigInt(result.PoolUser[0].fees1),
        swapCount: BigInt(result.PoolUser[0].swapCount),
      };
    },
    enabled: !!poolId && !!userAddr && !!uniV4GraphqlClient,
  });
};
