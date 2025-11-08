import {useAccount} from 'wagmi';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import type {ExercisePerpBody} from '~/lib/perpsOperator';
import {usePerpsOperator} from './usePerpsOperator';

export const useClosePerp = () => {
  const queryClient = useQueryClient();
  const {address} = useAccount();

  const {
    operator,
    signMessage: {mutateAsync: signMessage},
  } = usePerpsOperator();

  return useMutation({
    mutationFn: async (body: ExercisePerpBody) => {
      if (!operator) throw new Error('Operator not connected');
      if (!operator.auth) await signMessage();
      await operator.exercisePerp(body);

      void queryClient.invalidateQueries({
        queryKey: ['userOptions', address?.toLowerCase(), true],
      });
      void queryClient.invalidateQueries({
        queryKey: ['userOptions', address?.toLowerCase(), false],
      });
      void queryClient.invalidateQueries({queryKey: ['readContract']});
    },
  });
};
