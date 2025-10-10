'use client';

import {encodeFunctionData} from 'viem';
import {waitForTransactionReceipt} from 'viem/actions';
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
  useWalletClient,
} from 'wagmi';

import {useCurrentTick} from '../pool/useCurrentTick';
import {useLiquidityBlocks} from './useLiquidityBlocks';
import {useVaultData} from './useVaultData';

import {type TimelockVault} from '../../lib/contracts';
import {singleOwnerVaultAbi} from '../../abis/singleOwnerVault';

interface BurnPosition {
  tickLower: number;
  tickUpper: number;
  liquidity: bigint;
}

export const useBurnLiquidity = (vault: TimelockVault) => {
  const {data: walletClient} = useWalletClient();
  const {pool} = useVaultData(vault);
  const {refetch} = useLiquidityBlocks(vault);
  const currentTick = useCurrentTick(pool);

  const {data: lowestTick} = useReadContract({
    address: vault.address,
    abi: singleOwnerVaultAbi,
    functionName: 'lowestTick',
  });
  const {writeContractAsync, data: hash, isPending, error} = useWriteContract();

  const {isLoading: isConfirming, isSuccess} = useWaitForTransactionReceipt({
    hash,
  });

  const burn = async (
    tickLower: number,
    tickUpper: number,
    liquidity: bigint,
  ) => {
    if (!lowestTick) {
      throw new Error('Lowest tick lower not available');
    }
    const hash = await writeContractAsync({
      address: vault.address,
      abi: singleOwnerVaultAbi,
      functionName: 'burn',
      args: [tickLower, tickUpper, liquidity, lowestTick],
    });
    await waitForTransactionReceipt(walletClient!, {hash});
    void refetch();
    return hash;
  };

  const burnMultiple = async (positions: BurnPosition[]) => {
    if (!currentTick.exact) {
      throw new Error('Current tick not available');
    }
    if (positions.length === 0) {
      throw new Error('No positions to burn');
    }
    if (!lowestTick) {
      throw new Error('Lowest tick lower not available');
    }
    if (positions.length === 1) {
      await burn(
        positions[0].tickLower,
        positions[0].tickUpper,
        positions[0].liquidity,
      );
    } else {
      const multicallData = positions.map(position =>
        encodeFunctionData({
          abi: singleOwnerVaultAbi,
          functionName: 'burn',
          args: [
            position.tickLower,
            position.tickUpper,
            position.liquidity,
            lowestTick,
          ],
        }),
      );
      const hash = await writeContractAsync({
        address: vault.address,
        abi: singleOwnerVaultAbi,
        functionName: 'multicall',
        args: [multicallData],
      });
      await waitForTransactionReceipt(walletClient!, {hash});
      void refetch();
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
