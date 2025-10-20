import type {Address} from 'viem';
import {useQuery} from '@tanstack/react-query';
import {useTimelockConfig} from '~/providers/TimelockMarketProvider';

export type OptionData = ReturnType<typeof useUserOptions>['data'][0];

const useUserOptions = (user?: string, active = false) => {
  const {graphqlClient} = useTimelockConfig();

  const {data, ...rest} = useQuery({
    queryKey: ['userTrades', user || '--', active],
    queryFn: async () => {
      if (!graphqlClient) return [];

      const data = active
        ? await graphqlClient.GetActiveUserOptions({user: user!.toLowerCase()})
        : await graphqlClient.GetClosedUserOptions({user: user!.toLowerCase()});

      return data.UserOption.map(option => ({
        ...option,
        optionId: BigInt(option.optionId),
        marketAddr: option.marketAddr as Address,
        optionType: option.optionType as 'CALL' | 'PUT',
        createdAt: new Date(Number(option.createdAt) * 1000),
        expiresAt: new Date(Number(option.expiresAt) * 1000),
        premiumPaid: BigInt(option.premiumPaid),
        realizedPayout: BigInt(option.realizedPayout),
        liquiditiesAtOpen: option.liquiditiesAtOpen.map(l => BigInt(l)),
        liquiditiesCurrent: option.liquiditiesCurrent.map(l => BigInt(l)),
        positionSizeAtOpen: BigInt(option.positionSizeAtOpen),
        positionSizeCurrent: BigInt(option.positionSizeCurrent),
        strikePrice: BigInt(option.strikePrice),
        entryPrice: BigInt(option.entryPrice),
      })).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    },
    enabled: !!user && !!graphqlClient,
  });
  return {data: data || [], ...rest};
};

export const useActiveUserOptions = (user?: string) => {
  return useUserOptions(user, true);
};

export const useClosedUserOptions = (user?: string) => {
  return useUserOptions(user, false);
};
