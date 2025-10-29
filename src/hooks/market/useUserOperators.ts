import type {Address} from 'viem';
import {useQuery} from '@tanstack/react-query';

import {useTimelockConfig} from '~/providers/TimelockMarketProvider';

export const useUserOperators = (userAddr?: Address, marketAddr?: Address) => {
  const {graphqlClient} = useTimelockConfig();

  const {data, ...rest} = useQuery({
    queryKey: [
      'userOperators',
      userAddr?.toLowerCase() || '--',
      marketAddr?.toLowerCase() || '--',
    ],
    queryFn: async () => {
      if (!userAddr || !marketAddr) return undefined;

      const result = await graphqlClient!.GetUserMarketOperators({
        userAddr: userAddr.toLowerCase(),
        marketAddr: marketAddr.toLowerCase(),
      });
      return result.UserMarketOperator.map(operator => ({
        ...operator,
        spendingApproval: BigInt(operator.spendingApproval),
        operatorAddr: operator.operator!.address.toLowerCase(),
      }));
    },
    enabled: !!userAddr && !!marketAddr && !!graphqlClient,
  });

  return {...rest, data: data || []};
};
