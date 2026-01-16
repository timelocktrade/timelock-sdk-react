import type {Address} from 'viem';
import {useQuery} from '@tanstack/react-query';
import {useTimelockConfig} from '~/providers/TimelockProvider';

export const useMarketDailyVolume = (marketAddr: Address | undefined) => {
  const {timelockGraphqlClient} = useTimelockConfig();

  return useQuery({
    queryKey: ['marketDailyData', marketAddr?.toLowerCase() || '--'],
    queryFn: async () => {
      const result = await timelockGraphqlClient!.GetMarketDailyVolume({
        marketAddr: marketAddr!.toLowerCase(),
      });
      return result.MarketDailyData.map(data => ({
        id: data.id,
        date: BigInt(data.date),
        totalVolume: BigInt(data.totalVolume),
        totalPremium: BigInt(data.totalPremium),
        totalPayout: BigInt(data.totalPayout),
        totalProtocolFee: BigInt(data.totalProtocolFee),
      }));
    },
    enabled: !!marketAddr && !!timelockGraphqlClient,
  });
};
