import type {Address} from 'viem';
import {useClient, useReadContract} from 'wagmi';
import {getErc20, type TimelockMarket} from '../../lib/contracts';
import {useLens} from '../useLens';
import {lensAbi} from '../../abis/lens';

export const useMarketData = (market?: Address | TimelockMarket) => {
  const {timelockLens} = useLens();
  const client = useClient();
  const marketAddr = typeof market === 'string' ? market : market?.address;

  const {data: rawMarketData} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getMarketData',
    args: marketAddr ? [marketAddr] : undefined,
    query: {
      enabled: marketAddr !== undefined,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  });

  type TimelockMarketData = typeof rawMarketData & {
    address: Address;
    optionAsset: ReturnType<typeof getErc20>;
    payoutAsset: ReturnType<typeof getErc20>;
  };

  if (!rawMarketData || !marketAddr || !client) {
    return {} as Partial<TimelockMarketData>;
  }
  return {
    ...rawMarketData,
    address: marketAddr,
  } as Partial<TimelockMarketData>;
};
