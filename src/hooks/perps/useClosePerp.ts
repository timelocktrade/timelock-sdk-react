import {useMutation, useQueryClient} from '@tanstack/react-query';
import {usePerpsOperator} from './usePerpsOperator';
import type {ExercisePerpBody} from '~/lib/perpsOperator';
import {sleep} from '~/lib/utils';

export const useClosePerp = () => {
  const queryClient = useQueryClient();
  const {
    operator,
    signMessage: {mutateAsync: signMessage},
  } = usePerpsOperator();

  return useMutation({
    mutationFn: async (body: ExercisePerpBody) => {
      if (!operator) throw new Error('Operator not connected');
      if (!operator.auth) await signMessage();
      await operator.exercisePerp(body);

      await sleep(200);
      void queryClient.invalidateQueries({queryKey: ['userOptions']});
      void queryClient.invalidateQueries({queryKey: ['userOptions']});
      void queryClient.invalidateQueries({queryKey: ['readContract']});
    },
  });
};
