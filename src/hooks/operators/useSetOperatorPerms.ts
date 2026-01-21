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
    operators,
    perms,
  }: {
    operators: Address[];
    perms: {
      canExtend: boolean;
      canExercise: boolean;
      canTransfer: boolean;
      canMint: boolean;
      spendingApproval: bigint;
    }[];
  }) => {
    if (!client || !address) throw new Error('Wallet not connected');
    if (!marketAddr) throw new Error('Market address not available');
    if (operators.length !== perms.length)
      throw new Error('Operators and perms arrays must have the same length');

    const hash = await writeContractAsync({
      address: marketAddr,
      abi: optionsMarketAbi,
      functionName: 'setOperatorsPerms',
      args: [operators, perms],
    });
    await waitForTransactionReceipt(client, {hash});

    void queryClient.invalidateQueries({queryKey: ['userOperators']});
    void queryClient.invalidateQueries({queryKey: ['readContract']});
    return hash;
  };
  return useMutation({mutationFn: setOperatorPerms});
};
