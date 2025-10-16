import {useMemo} from 'react';
import type {Address} from 'viem';
import {useQuery} from '@tanstack/react-query';

import {useTimelockConfig} from '../../providers/TimelockMarketProvider';

export type OptionData = ReturnType<typeof useUserOptions>['data'][0];

const useUserOptions = (user?: string, active = false) => {
  const {graphqlClient} = useTimelockConfig();

  const {data: options, ...rest} = useQuery({
    queryKey: ['userTrades', user || '--', active],
    queryFn: () =>
      active
        ? graphqlClient?.GetActiveUserOptions({user: user!.toLowerCase()})
        : graphqlClient?.GetClosedUserOptions({user: user!.toLowerCase()}),
    select: data =>
      data?.UserOption?.map(option => ({
        ...option,
        id: BigInt(option.id),
        marketAddr: option.marketAddr as Address,
        optionType: option.optionType as 'CALL' | 'PUT',
        createdAt: new Date(Number(option.createdAt) * 1000),
        expiresAt: new Date(Number(option.expiresAt) * 1000),
        premiumPaid: BigInt(option.premiumPaid),
        realizedPayout: BigInt(option.realizedPayout),
        liquiditiesAtOpen: option.liquiditiesAtOpen.map(liquidity =>
          BigInt(liquidity),
        ),
        liquiditiesCurrent: option.liquiditiesCurrent.map(liquidity =>
          BigInt(liquidity),
        ),
      })),
    enabled: !!user && !!graphqlClient,
  });

  const sorted = useMemo(
    () =>
      options?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) ||
      [],
    [options],
  );
  return {data: sorted, ...rest};
};

export const useActiveUserOptions = (user?: string) => {
  return useUserOptions(user, true);
};

export const useClosedUserOptions = (user?: string) => {
  return useUserOptions(user, false);
};
