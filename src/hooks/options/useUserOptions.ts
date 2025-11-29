import type {Address} from 'viem';
import {useQuery, type NonUndefinedGuard} from '@tanstack/react-query';
import {useTimelockConfig} from '~/providers/TimelockProvider';

export type OptionData = NonUndefinedGuard<
  ReturnType<typeof useUserOptions>['data']
>[number];

const useUserOptions = (
  userAddr: Address | undefined,
  marketAddr: Address | '*' | undefined,
  active = false,
) => {
  const {graphqlClient} = useTimelockConfig();

  userAddr = userAddr?.toLowerCase() as Address | undefined;
  marketAddr = marketAddr?.toLowerCase() as Address | '*' | undefined;

  return useQuery({
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
