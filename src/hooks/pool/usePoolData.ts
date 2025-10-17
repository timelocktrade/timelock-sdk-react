import type {Address} from 'viem';
import {useClient, useReadContract} from 'wagmi';
import {useLens} from '../useLens';
import {lensAbi} from '~/abis/lens';

export type UniswapPoolData = ReturnType<typeof usePoolData>;
type NonUndefined<T> = T extends undefined ? never : T;

export const usePoolData = (poolAddr?: Address) => {
  const {timelockLens} = useLens();
  const client = useClient();

  const {data} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getPoolData',
    args: poolAddr ? [poolAddr] : undefined,
    query: {enabled: !!poolAddr && !!client},
  });
  return (data || {}) as Partial<NonUndefined<typeof data>>;
};
