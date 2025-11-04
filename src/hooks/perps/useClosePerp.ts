import {useMutation} from '@tanstack/react-query';
import type {ExercisePerpBody} from '~/lib/perpsOperator';
import {usePerpsOperator} from './usePerpsOperator';

export const useClosePerp = () => {
  const {operator} = usePerpsOperator();

  return useMutation({
    mutationFn: (body: ExercisePerpBody) => {
      if (!operator) throw new Error('Operator not connected');
      return operator.exercisePerp(body);
    },
  });
};
