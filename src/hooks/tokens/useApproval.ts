import {type Address, erc20Abi, maxUint256} from 'viem';
import {waitForTransactionReceipt} from 'viem/actions';
import {useWriteContract, useClient, useConnection} from 'wagmi';
import {getErc20} from '~/lib/contracts';

export const useApproval = () => {
  const client = useClient();
  const {address} = useConnection();
  const {
    writeContractAsync,
    data: hash,
    isPending,
    error,
    reset,
  } = useWriteContract();

  const askForApproval = async (
    tokenAddress: Address,
    spenderAddress: Address,
    amount: bigint,
  ) => {
    if (!client || !address) throw new Error('Wallet not connected');

    const tokenContract = getErc20(tokenAddress, client);

    const allowance = await tokenContract.read.allowance([
      address,
      spenderAddress,
    ]);

    if (allowance < amount) {
      const approvalHash = await writeContractAsync({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [spenderAddress, maxUint256],
      });
      await waitForTransactionReceipt(client, {hash: approvalHash});
    }
  };
  return {askForApproval, hash, isPending, error, reset};
};
