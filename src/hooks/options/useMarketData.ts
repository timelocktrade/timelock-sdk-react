import {useQuery, type NonUndefinedGuard} from '@tanstack/react-query';
import type {Address} from 'viem';

import {useTimelockConfig} from '~/providers/TimelockProvider';
import {useLens} from '../useLens';

export const useMarketData = (marketAddr?: Address) => {
  const {graphqlClient} = useTimelockConfig();
  const {timelockLens} = useLens();

  const {data} = useQuery({
    queryKey: ['marketData', marketAddr?.toLowerCase() || '--'],
    queryFn: async () => {
      const result = await graphqlClient!.GetMarketData({
        marketAddr: marketAddr!.toLowerCase(),
      });
      return {
        ...result.TimelockMarket[0],
        address: result.TimelockMarket[0].address as Address,
        pool: result.TimelockMarket[0].pool as Address,
        vault: result.TimelockMarket[0].vault as Address,
        optionAsset: result.TimelockMarket[0].optionAsset as Address,
        payoutAsset: result.TimelockMarket[0].payoutAsset as Address,
      };
    },
    enabled: !!marketAddr && !!graphqlClient,
  });
  const {data: fallback} = useQuery({
    queryKey: ['marketData', marketAddr || '--'],
    queryFn: async () => {
      if (!marketAddr || !timelockLens) return undefined;
      const result = await timelockLens!.read.getMarketData([marketAddr]);

      return {...result, tradersCount: undefined};
    },
    enabled: !!marketAddr && !!timelockLens,
  });
  return (data || fallback || {}) as Partial<NonUndefinedGuard<typeof data>>;
};
