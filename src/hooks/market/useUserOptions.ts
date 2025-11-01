import type {Address} from 'viem';
import {useQuery} from '@tanstack/react-query';
import {useTimelockConfig} from '~/providers/TimelockMarketProvider';
import {EMPTY_ARRAY} from '~/lib/numberUtils';

export type OptionData = ReturnType<typeof useUserOptions>['data'][0];

const useUserOptions = (
  userAddr?: Address,
  marketAddr?: Address | '*',
  active = false,
) => {
  const {graphqlClient} = useTimelockConfig();

  userAddr = userAddr?.toLowerCase() as Address | undefined;
  marketAddr = marketAddr?.toLowerCase() as Address | '*' | undefined;

  const {data, ...rest} = useQuery({
    queryKey: ['userOptions', userAddr || '--', active],
    queryFn: async () => {
      if (!graphqlClient || !userAddr || !marketAddr) return [];

      const data = await (marketAddr === '*'
        ? active
          ? graphqlClient.GetActiveUserOptions({userAddr})
          : graphqlClient.GetClosedUserOptions({userAddr})
        : active
          ? graphqlClient.GetActiveUserOptionsByMarket({
              userAddr,
              marketAddr,
            })
          : graphqlClient.GetClosedUserOptionsByMarket({
              userAddr,
              marketAddr,
            }));

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
    enabled: !!userAddr && !!marketAddr && !!graphqlClient,
  });
  return {data: data || EMPTY_ARRAY, ...rest};
};

export const useActiveUserOptions = (
  userAddr?: Address,
  marketAddr?: Address | '*',
) => {
  return useUserOptions(userAddr, marketAddr, true);
};

export const useClosedUserOptions = (
  userAddr?: Address,
  marketAddr?: Address | '*',
) => {
  return useUserOptions(userAddr, marketAddr, false);
};
