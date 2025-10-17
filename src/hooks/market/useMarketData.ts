import {useQuery, type NonUndefinedGuard} from '@tanstack/react-query';
import type {Address} from 'viem';

import type {TimelockMarket} from '~/lib/contracts';
import {useTimelockConfig} from '~/providers/TimelockMarketProvider';

export const useMarketData = (market?: Address | TimelockMarket) => {
  const {graphqlClient} = useTimelockConfig();
  const marketAddr = typeof market === 'string' ? market : market?.address;

  const {data} = useQuery({
    queryKey: ['marketData', marketAddr || '--'],
    queryFn: () =>
      graphqlClient!.GetMarketData({marketAddr: marketAddr!.toLowerCase()}),
    select: data => ({
      ...data.TimelockMarket[0],
      pool: data.TimelockMarket[0].pool as Address,
      vault: data.TimelockMarket[0].vault as Address,
      optionAsset: data.TimelockMarket[0].optionAsset as Address,
      payoutAsset: data.TimelockMarket[0].payoutAsset as Address,
      optionsCount: BigInt(data.TimelockMarket[0].optionsCount),
      tradersCount: BigInt(data.TimelockMarket[0].tradersCount),
    }),
    enabled: !!marketAddr && !!graphqlClient,
  });

  return (data || {}) as Partial<NonUndefinedGuard<typeof data>>;
};
