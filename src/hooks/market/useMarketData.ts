import type {Address} from 'viem';
import {useClient, useReadContract} from 'wagmi';
import {useLens} from '../useLens';
import type {TimelockMarket} from '../../lib/contracts';
import {lensAbi} from '../../abis/lens';

export type TimelockMarketData = Required<ReturnType<typeof useMarketData>>;

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
    },
  });

  type TimelockMarketData = typeof rawMarketData & {
    address: Address;
  };

  if (!rawMarketData || !marketAddr || !client) {
    return {} as Partial<TimelockMarketData>;
  }
  return {
    ...rawMarketData,
    address: marketAddr,
  } as Partial<TimelockMarketData>;
};
