import type {Address} from 'viem';
import {useReadContract} from 'wagmi';
import {guardianAbi} from '~/abis/guardian';

export const useMarketGuardianState = (
  guardianAddr?: Address,
  marketAddr?: Address,
) => {
  return useReadContract({
    address: guardianAddr,
    abi: guardianAbi,
    functionName: 'marketTradingPaused',
    args: marketAddr ? [marketAddr] : undefined,
    query: {
      select: data => ({paused: data[0], updatedAt: data[1]}),
    },
  });
};
