import type {Address} from 'viem';
import {useReadContract} from 'wagmi';
import {useLens} from '../useLens';
import {lensAbi} from '~/abis/lens';

export const useMarketState = (marketAddr: Address | undefined) => {
  const {timelockLens} = useLens();

  return useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getMarketState',
    args: marketAddr ? [marketAddr] : undefined,
  });
};
