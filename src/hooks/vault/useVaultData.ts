import type {Address} from 'viem';
import {useReadContract} from 'wagmi';
import {singleOwnerVaultAbi} from '../../abis/singleOwnerVault';
import type {TimelockVault} from '../../lib/contracts';

export const useVaultData = (vault?: Address | TimelockVault) => {
  const {data} = useReadContract({
    address: typeof vault === 'string' ? vault : vault?.address,
    abi: singleOwnerVaultAbi,
    functionName: 'pool',
  });
  return {pool: data};
};
