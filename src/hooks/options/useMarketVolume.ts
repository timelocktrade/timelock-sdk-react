import {useQuery, type NonUndefinedGuard} from '@tanstack/react-query';
import type {Address} from 'viem';

import {useTimelockConfig} from '~/providers/TimelockProvider';

export const useMarketVolume = (marketAddr?: Address) => {
  const {graphqlClient} = useTimelockConfig();

  const {data} = useQuery({
    queryKey: ['marketVolume', marketAddr?.toLowerCase() || '--'],
    queryFn: async () => {
      const result = await graphqlClient!.GetMarketVolume({
        marketAddr: marketAddr!.toLowerCase(),
      });
      return {
        ...result.TimelockMarket[0],
        address: result.TimelockMarket[0].address as Address,
        volume: BigInt(result.TimelockMarket[0].volume),
        optionsCount: BigInt(result.TimelockMarket[0].optionsCount),
        tradersCount: BigInt(result.TimelockMarket[0].tradersCount),
      };
    },
    enabled: !!marketAddr && !!graphqlClient,
  });
  return (data || {}) as Partial<NonUndefinedGuard<typeof data>>;
};
