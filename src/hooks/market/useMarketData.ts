import {useQuery, type NonUndefinedGuard} from '@tanstack/react-query';
import type {Address} from 'viem';

import {useTimelockConfig} from '~/providers/TimelockMarketProvider';

export const useMarketData = (marketAddr?: Address) => {
  const {graphqlClient} = useTimelockConfig();

  const {data} = useQuery({
    queryKey: ['marketData', marketAddr || '--'],
    queryFn: async () => {
      const result = await graphqlClient!.GetMarketData({
        marketAddr: marketAddr!.toLowerCase(),
      });
      return {
        ...result.TimelockMarket[0],
        pool: result.TimelockMarket[0].pool as Address,
        vault: result.TimelockMarket[0].vault as Address,
        optionAsset: result.TimelockMarket[0].optionAsset as Address,
        payoutAsset: result.TimelockMarket[0].payoutAsset as Address,
        optionsCount: BigInt(result.TimelockMarket[0].optionsCount),
        tradersCount: BigInt(result.TimelockMarket[0].tradersCount),
      };
    },
    enabled: !!marketAddr && !!graphqlClient,
  });
  return (data || {}) as Partial<NonUndefinedGuard<typeof data>>;
};
