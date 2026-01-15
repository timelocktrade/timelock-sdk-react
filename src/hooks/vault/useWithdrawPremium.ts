import type {Address} from 'viem';
import {useWriteContract} from 'wagmi';
import {singleOwnerVaultAbi} from '~/abis/singleOwnerVault';

export const useWithdrawPremium = (vaultAddr: Address | undefined) => {
  const {mutateAsync, ...rest} = useWriteContract();

  const withdrawPremium = (asset: Address) => {
    if (!vaultAddr) {
      throw new Error('Vault address not provided');
    }
    return mutateAsync({
      address: vaultAddr,
      abi: singleOwnerVaultAbi,
      functionName: 'withdrawTokens',
      args: [[asset]],
    });
  };
  return {withdrawPremium, ...rest};
};
