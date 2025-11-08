import type {Address} from 'viem';
import {useQuery} from '@tanstack/react-query';
import {usePerpsOperator} from './usePerpsOperator';

const EMPTY_ARRAY: never[] = [];

export const useUserPerps = (
  marketAddr?: Address,
  userAddr?: Address,
  type?: 'active' | 'closed',
) => {
  const {operator} = usePerpsOperator();

  userAddr = userAddr?.toLowerCase() as Address;
  marketAddr = marketAddr?.toLowerCase() as Address;

  const {data, ...rest} = useQuery({
    queryKey: ['userPerps', type, userAddr || '-', marketAddr || '-'],
    queryFn: () => operator?.getUserPerps(userAddr!, marketAddr, type),
    enabled: !!userAddr,
    staleTime: 10000,
    refetchInterval: 10000,
  });
  return {data: data || EMPTY_ARRAY, ...rest};
};

export const useActiveUserPerps = (
  marketAddr?: Address,
  userAddr?: Address,
) => {
  return useUserPerps(marketAddr, userAddr, 'active');
};

export const useClosedUserPerps = (
  marketAddr?: Address,
  userAddr?: Address,
) => {
  return useUserPerps(marketAddr, userAddr, 'closed');
};
