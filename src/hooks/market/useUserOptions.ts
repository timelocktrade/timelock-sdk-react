import {getContract, type Address} from 'viem';
import {useClient} from 'wagmi';
import {useQuery} from '@tanstack/react-query';

import type {TimelockMarket} from '../../lib/contracts';
import {useCurrentMarket} from '../../providers/TimelockMarketProvider';
import {lensAbi} from '../../abis/lens';

export type OptionData = ReturnType<typeof useUserOptions>['options'][0];

export const useUserOptions = (
  userAddr?: Address,
  market?: Address | TimelockMarket,
) => {
  const client = useClient();
  const {lensAddr} = useCurrentMarket();

  const marketAddr = typeof market === 'string' ? market : market?.address;

  const fetchAllUserOptions = async () => {
    if (!lensAddr || !marketAddr || !userAddr || !client) return [];

    const lens = getContract({address: lensAddr, abi: lensAbi, client: client});
    const allOptions = [];
    const limit = 50n;

    let startId = 0n;
    let hasMore = true;

    while (hasMore) {
      try {
        const [userOptions, nextStartId, moreAvailable] =
          await lens.read.getUserOptions([
            marketAddr,
            userAddr,
            startId,
            limit,
          ]);
        allOptions.push(...userOptions);

        hasMore = moreAvailable;
        startId = nextStartId;
      } catch (error) {
        console.error('Error fetching user options:', error);
        break;
      }
    }
    return allOptions;
  };

  const {
    data: options = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['userOptions', marketAddr, userAddr, lensAddr],
    queryFn: () => fetchAllUserOptions(),
    enabled: !!(marketAddr && userAddr && lensAddr && client),
    refetchInterval: 60 * 1000,
  });

  return {
    options,
    isLoading,
    isError,
    error,
    refetch,
  };
};
