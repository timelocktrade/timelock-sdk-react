import type {NonUndefinedGuard} from '@tanstack/react-query';
import type {Address} from 'viem';

import {useLens} from '../useLens';
import {useReadContract} from 'wagmi';
import {lensAbi} from '~/abis/lens';

export const useMarketData = (marketAddr: Address | undefined) => {
  const {timelockLens} = useLens();

  const {data} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getMarketData',
    args: marketAddr ? [marketAddr] : undefined,
  });
  return (data || {}) as Partial<NonUndefinedGuard<typeof data>>;
};
