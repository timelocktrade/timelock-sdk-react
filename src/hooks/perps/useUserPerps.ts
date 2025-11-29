import type {Address} from 'viem';
import {useQuery} from '@tanstack/react-query';
import {usePerpsOperator} from './usePerpsOperator';

export const useUserPerps = (
  marketAddr: Address | undefined,
  userAddr: Address | undefined,
  type: 'active' | 'closed' | undefined,
) => {
  const {operator} = usePerpsOperator();

  userAddr = userAddr?.toLowerCase() as Address;
  marketAddr = marketAddr?.toLowerCase() as Address;

  return useQuery({
    queryKey: ['userPerps', type, userAddr || '-', marketAddr || '-'],
    queryFn: () => operator?.getUserPerps(userAddr!, marketAddr, type),
    enabled: !!userAddr,
    staleTime: 10000,
    refetchInterval: 10000,
  });
};

export const useActiveUserPerps = (
  marketAddr: Address | undefined,
  userAddr: Address | undefined,
) => {
  return useUserPerps(marketAddr, userAddr, 'active');
};

export const useClosedUserPerps = (
  marketAddr: Address | undefined,
  userAddr: Address | undefined,
) => {
  return useUserPerps(marketAddr, userAddr, 'closed');
};
