import {zeroAddress, type Address} from 'viem';
import {useWriteContract} from 'wagmi';
import {singleOwnerVaultAbi} from '~/abis/singleOwnerVault';

export const useWithdrawPremium = (vaultAddr: Address | undefined) => {
  const {mutateAsync, ...rest} = useWriteContract();

  const withdrawPremium = (
    assets: Address[],
    amounts: bigint[],
    recipient: Address,
  ) => {
    if (!vaultAddr) {
      throw new Error('Vault address not provided');
    }
    if (!assets.length || !amounts.length || assets.length !== amounts.length) {
      throw new Error('Invalid assets or amounts');
    }
    if (recipient === zeroAddress) {
      throw new Error('Invalid recipient address');
    }
    return mutateAsync({
      address: vaultAddr,
      abi: singleOwnerVaultAbi,
      functionName: 'withdrawTokens',
      args: [assets, amounts, recipient],
    });
  };
  return {withdrawPremium, ...rest};
};
