import type {Address} from 'viem';
import {waitForTransactionReceipt} from 'viem/actions';
import {useWriteContract, useClient, useConnection} from 'wagmi';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {optionsMarketAbi} from '~/abis/optionsMarket';

export const useSetOperatorPerms = (marketAddr: Address | undefined) => {
  const queryClient = useQueryClient();
  const client = useClient();
  const {address} = useConnection();

  const {mutateAsync: writeContractAsync} = useWriteContract();

  const setOperatorPerms = async ({
    operator,
    canExtend,
    canExercise,
    canTransfer,
    canMint,
    spendingApproval,
  }: {
    operator: Address;
    canExtend: boolean;
    canExercise: boolean;
    canTransfer: boolean;
    canMint: boolean;
    spendingApproval: bigint;
  }) => {
    if (!client || !address) throw new Error('Wallet not connected');
    if (!marketAddr) throw new Error('Market address not available');

    const perms = {
      canExtend,
      canExercise,
      canTransfer,
      canMint,
      spendingApproval,
    };

    const hash = await writeContractAsync({
      address: marketAddr,
      abi: optionsMarketAbi,
      functionName: 'setOperatorsPerms',
      args: [[operator], [perms]],
    });
    await waitForTransactionReceipt(client, {hash});

    void queryClient.invalidateQueries({queryKey: ['userOperators']});
    void queryClient.invalidateQueries({queryKey: ['readContract']});
    return hash;
  };
  return useMutation({mutationFn: setOperatorPerms});
};
