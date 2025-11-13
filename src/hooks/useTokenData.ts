import type {Address} from 'viem';
import {useClient, useReadContract} from 'wagmi';
import {useLens} from '~/hooks/useLens';
import {lensAbi} from '~/abis/lens';

export type TokenData = ReturnType<typeof useTokenData>;
type NonUndefined<T> = T extends undefined ? never : T;

export const useTokenData = (tokenAddr?: Address) => {
  const {timelockLens} = useLens();
  const client = useClient();

  const {data} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getTokenData',
    args: tokenAddr ? [tokenAddr] : undefined,
    query: {enabled: !!tokenAddr && !!client},
  });
  return (data || {}) as Partial<NonUndefined<typeof data>>;
};
