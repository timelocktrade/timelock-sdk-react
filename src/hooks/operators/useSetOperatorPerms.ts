import type {Address} from 'viem';
import {waitForTransactionReceipt} from 'viem/actions';
import {useWriteContract, useClient, useAccount} from 'wagmi';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {optionsMarketAbi} from '~/abis/optionsMarket';

export const useSetOperatorPerms = (marketAddr?: Address) => {
  const queryClient = useQueryClient();
  const client = useClient();
  const {address} = useAccount();

  const {writeContractAsync} = useWriteContract();

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

    const hash = await writeContractAsync({
      address: marketAddr,
      abi: optionsMarketAbi,
      functionName: 'setOperatorPerms',
      args: [
        operator,
        canExtend,
        canExercise,
        canTransfer,
        canMint,
        spendingApproval,
      ],
    });
    await waitForTransactionReceipt(client, {hash});

    void queryClient.invalidateQueries({
      queryKey: [
        'userOperators',
        address.toLowerCase(),
        marketAddr.toLowerCase(),
      ],
    });
    return hash;
  };
  return useMutation({mutationFn: setOperatorPerms});
};
