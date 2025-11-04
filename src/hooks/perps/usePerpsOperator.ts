import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {PerpsOperator} from '~/lib/perpsOperator';
import {useTimelockConfig} from '~/providers/TimelockProvider';

export const usePerpsOperator = () => {
  const {perpsOperatorUrl} = useTimelockConfig();

  const operator = useMemo(
    () => (perpsOperatorUrl ? new PerpsOperator(perpsOperatorUrl) : undefined),
    [perpsOperatorUrl],
  );

  const {data: address} = useQuery({
    queryKey: ['perpsOperatorAddr', perpsOperatorUrl || '--'],
    queryFn: () => operator?.getOperatorAddr(),
    staleTime: 10000,
    refetchInterval: 10000,
    enabled: !!operator,
  });

  return {operator, address};
};
