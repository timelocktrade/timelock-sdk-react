import type {Address} from 'viem';
import {useReadContract} from 'wagmi';
import {singleOwnerVaultAbi} from '~/abis/singleOwnerVault';

export const useVaultData = (vaultAddr?: Address) => {
  const {data} = useReadContract({
    address: vaultAddr,
    abi: singleOwnerVaultAbi,
    functionName: 'pool',
  });
  return {pool: data};
};
