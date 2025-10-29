import type {Address} from 'viem';
import {useQuery} from '@tanstack/react-query';
import {useTimelockConfig} from '~/providers/TimelockMarketProvider';

export type OptionData = ReturnType<typeof useUserOptions>['data'][0];

const useUserOptions = (user?: Address, active = false) => {
  const {graphqlClient} = useTimelockConfig();

  user = user?.toLowerCase() as Address | undefined;

  const {data, ...rest} = useQuery({
    queryKey: ['userOptions', user?.toLowerCase() || '--', active],
    queryFn: async () => {
      if (!graphqlClient || !user) return [];

      const data = active
        ? await graphqlClient.GetActiveUserOptions({user})
        : await graphqlClient.GetClosedUserOptions({user});

      return data.UserOption.map(option => ({
        ...option,
        optionId: BigInt(option.optionId),
        marketAddr: option.market!.address as Address,
        ownerAddr: option.owner!.address as Address,
        optionType: option.optionType as 'CALL' | 'PUT',
        createdAt: new Date(Number(option.createdAt) * 1000),
        expiresAt: new Date(Number(option.expiresAt) * 1000),
        premium: BigInt(option.premium),
        protocolFee: BigInt(option.protocolFee),
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

export const useActiveUserOptions = (user?: Address) => {
  return useUserOptions(user, true);
};

export const useClosedUserOptions = (user?: Address) => {
  return useUserOptions(user, false);
};
