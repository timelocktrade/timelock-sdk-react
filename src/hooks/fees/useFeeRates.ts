import type {Address} from 'viem';
import {useReadContract} from 'wagmi';
import {useLens} from '../useLens';
import {lensAbi} from '~/abis/lens';

export const useFeeRates = (feeStrategy?: Address) => {
  const {timelockLens} = useLens();

  return useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    args: feeStrategy ? [feeStrategy] : undefined,
    functionName: 'getFeeRates',
  });
};
