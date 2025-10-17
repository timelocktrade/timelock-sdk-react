import {type Address, encodeFunctionData} from 'viem';
import {waitForTransactionReceipt} from 'viem/actions';
import {useWriteContract, useWaitForTransactionReceipt, useClient} from 'wagmi';

import {useCurrentTick} from '../pool/useCurrentTick';
import {useVaultData} from './useVaultData';
import {useLens} from '../useLens';

import {singleOwnerVaultAbi} from '~/abis/singleOwnerVault';

interface BurnPosition {
  tickLower: number;
  tickUpper: number;
  liquidity: bigint;
}

export const useBurnLiquidity = (vaultAddr?: Address) => {
  const client = useClient();
  const {timelockLens} = useLens();
  const {pool} = useVaultData(vaultAddr);
  const currentTick = useCurrentTick(pool);

  const {writeContractAsync, data: hash, isPending, error} = useWriteContract();

  const {isLoading: isConfirming, isSuccess} = useWaitForTransactionReceipt({
    hash,
  });

  const burn = async (
    tickLower: number,
    tickUpper: number,
    liquidity: bigint,
  ) => {
    if (!client) throw new Error('Wallet not connected');

    if (!vaultAddr || !timelockLens) {
      throw new Error('Vault/lens not available');
    }
    const refTick = await timelockLens.read.getRefTick([vaultAddr, tickLower]);

    const hash = await writeContractAsync({
      address: vaultAddr,
      abi: singleOwnerVaultAbi,
      functionName: 'burn',
      args: [tickLower, tickUpper, liquidity, refTick],
    });
    await waitForTransactionReceipt(client, {hash});
    return hash;
  };

  const burnMultiple = async (positions: BurnPosition[]) => {
    if (!client) throw new Error('Wallet not connected');

    if (!currentTick.exact) {
      throw new Error('Current tick not available');
    }
    if (positions.length === 0) {
      throw new Error('No positions to burn');
    }
    if (!timelockLens || !vaultAddr) {
      throw new Error('Vault/lens not available');
    }
    if (positions.length === 1) {
      await burn(
        positions[0].tickLower,
        positions[0].tickUpper,
        positions[0].liquidity,
      );
    } else {
      const refTicks = await timelockLens.read.batchGetRefTick([
        vaultAddr,
        positions.map(position => position.tickLower),
      ]);
      const multicallData = positions.map((p, i) =>
        encodeFunctionData({
          abi: singleOwnerVaultAbi,
          functionName: 'burn',
          args: [p.tickLower, p.tickUpper, p.liquidity, refTicks[i]],
        }),
      );
      const hash = await writeContractAsync({
        address: vaultAddr,
        abi: singleOwnerVaultAbi,
        functionName: 'multicall',
        args: [multicallData],
      });
      await waitForTransactionReceipt(client, {hash});
    }
  };

  return {
    burnMultiple,
    burn,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
    isLoading: isPending || isConfirming,
  };
};
