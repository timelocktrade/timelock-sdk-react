import type {Address} from 'viem';
import {useClient, useReadContract} from 'wagmi';
import {useLens} from '../useLens';
import {getErc20, type UniswapPool} from '../../lib/contracts';
import {lensAbi} from '../../abis/lens';

export type UniswapPoolData = ReturnType<typeof usePoolData>;
type NonUndefined<T> = T extends undefined ? never : T;

export const usePoolData = (pool?: Address | UniswapPool) => {
  const poolAddress = typeof pool === 'string' ? pool : pool?.address;
  const {timelockLens} = useLens();
  const client = useClient();

  const {data} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getPoolData',
    args: poolAddress ? [poolAddress] : undefined,
    query: {
      enabled: !!poolAddress && !!client,
      select: poolData => ({
        ...poolData,
        token0: getErc20(poolData.token0, client!),
        token1: getErc20(poolData.token1, client!),
      }),
    },
  });
  return (data || {}) as Partial<NonUndefined<typeof data>>;
};
