import type {Address} from 'viem';
import {useReadContract} from 'wagmi';
import {useLens} from '../useLens';
import {lensAbi} from '~/abis/lens';

export const useGuardianGlobalState = (guardianAddr?: Address) => {
  const {timelockLens} = useLens();

  return useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getGlobalGuardianState',
    args: guardianAddr ? [guardianAddr] : undefined,
  });
};
