import type {Address} from 'viem';
import {useQuery} from '@tanstack/react-query';

import {useTimelockConfig} from '~/providers/TimelockProvider';

export const useMarketUserVolume = (
  marketAddr: Address | undefined,
  userAddr?: Address | undefined,
) => {
  const {timelockGraphqlClient} = useTimelockConfig();

  return useQuery({
    queryKey: [
      'marketUserVolume',
      marketAddr?.toLowerCase() || '--',
      userAddr?.toLowerCase() || '--',
    ],
    queryFn: async () => {
      const result = await timelockGraphqlClient!.GetMarketUserVolume({
        marketAddr: marketAddr!.toLowerCase(),
        userAddr: userAddr!.toLowerCase(),
      });
      return {
        address: result.TimelockMarketUser[0].address as Address,
        totalVolume: BigInt(result.TimelockMarketUser[0].totalVolume),
        totalPremium: BigInt(result.TimelockMarketUser[0].totalPremium),
        totalProfit: BigInt(result.TimelockMarketUser[0].totalProfit),
        optionsCount: BigInt(result.TimelockMarketUser[0].optionsCount),
      };
    },
    enabled: !!marketAddr && !!userAddr && !!timelockGraphqlClient,
  });
};
