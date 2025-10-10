'use client';

import {encodeFunctionData, erc20Abi, maxUint256, type Address} from 'viem';
import {waitForTransactionReceipt} from 'viem/actions';
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
  useWalletClient,
} from 'wagmi';

import {useCurrentTick} from '~/hooks/pool/useCurrentTick';
import {usePoolData} from '~/hooks/pool/usePoolData';
import {useLiquidityBlocks} from './useLiquidityBlocks';
import {useVaultData} from './useVaultData';

import type {TimelockVault, UniswapMathLens} from '~/lib/contracts';
import {singleOwnerVaultAbi} from '~/abis/singleOwnerVault';
import {useLens} from '../useLens';

export const batchGetAmountsFromLiquidity = async (
  lens: UniswapMathLens,
  tickLower: number[],
  tickUpper: number[],
  liquidity: bigint[],
  currentTick: number,
) => {
  const currentTicksArray = new Array(tickLower.length).fill(currentTick);

  const amounts = await lens.read.batchGetAmountsForLiquidityTicks([
    currentTicksArray,
    tickLower,
    tickUpper,
    liquidity,
  ]);

  let totalAmount0 = 0n;
  let totalAmount1 = 0n;

  const amounts0: bigint[] = [];
  const amounts1: bigint[] = [];

  for (const scaled of amounts[0]) {
    totalAmount0 += scaled;
    amounts0.push(scaled);
  }
  for (const scaled of amounts[1]) {
    totalAmount1 += scaled;
    amounts1.push(scaled);
  }
  return {totalAmount0, totalAmount1, amounts0, amounts1};
};

interface MintPositionParams {
  tickLower: number;
  tickUpper: number;
  liquidity: bigint;
}

export const useMintLiquidity = (vault?: Address | TimelockVault) => {
  const {data: walletClient} = useWalletClient();
  const {refetch} = useLiquidityBlocks(vault);
  const {pool} = useVaultData(vault);
  const {uniswapLens} = useLens();

  const currentTick = useCurrentTick(pool);
  const {token0, token1} = usePoolData(pool);

  const vaultAddr = typeof vault === 'string' ? vault : vault?.address;

  const {data: lowestTick} = useReadContract({
    address: vaultAddr,
    abi: singleOwnerVaultAbi,
    functionName: 'lowestTick',
  });
  const {writeContractAsync, data: hash, isPending, error} = useWriteContract();

  const {isLoading: isConfirming, isSuccess} = useWaitForTransactionReceipt({
    hash,
  });

  const askForApproval = async (params: MintPositionParams[]) => {
    if (
      currentTick.exact === undefined ||
      !token0 ||
      !token1 ||
      !vaultAddr ||
      !uniswapLens
    ) {
      throw new Error('Current tick not available');
    }
    const {totalAmount0, totalAmount1} = await batchGetAmountsFromLiquidity(
      uniswapLens,
      params.map(p => p.tickLower),
      params.map(p => p.tickUpper),
      params.map(p => p.liquidity),
      currentTick.exact,
    );

    const [allowance0, allowance1] = await Promise.all([
      token0.read.allowance([walletClient!.account!.address, vaultAddr]),
      token1.read.allowance([walletClient!.account!.address, vaultAddr]),
    ]);
    const approvalPromises = [];

    if (allowance0 <= totalAmount0) {
      const approvalHash = await writeContractAsync({
        address: token0.address,
        abi: erc20Abi,
        functionName: 'approve',
        args: [vaultAddr, maxUint256],
      });
      approvalPromises.push(
        waitForTransactionReceipt(walletClient!, {hash: approvalHash}),
      );
    }
    if (allowance1 <= totalAmount1) {
      const approvalHash1 = await writeContractAsync({
        address: token1.address,
        abi: erc20Abi,
        functionName: 'approve',
        args: [vaultAddr, maxUint256],
      });
      approvalPromises.push(
        waitForTransactionReceipt(walletClient!, {hash: approvalHash1}),
      );
    }
    if (approvalPromises.length > 0) {
      await Promise.all(approvalPromises);
    }
  };

  const mint = async (
    tickLower: number,
    tickUpper: number,
    liquidity: bigint,
  ) => {
    if (!lowestTick || !vaultAddr) {
      throw new Error('Lowest tick lower not available');
    }
    await askForApproval([{tickLower, tickUpper, liquidity}]);

    const hash = await writeContractAsync({
      address: vaultAddr,
      abi: singleOwnerVaultAbi,
      functionName: 'mint',
      args: [tickLower, tickUpper, liquidity, lowestTick],
    });
    await waitForTransactionReceipt(walletClient!, {hash});
    void refetch();
    return hash;
  };

  const mintMultiple = async (positions: MintPositionParams[]) => {
    if (!currentTick.exact) {
      throw new Error('Current tick not available');
    }
    if (positions.length === 0) {
      throw new Error('No positions to mint');
    }
    if (!lowestTick || !vaultAddr) {
      throw new Error('Lowest tick lower not available');
    }
    if (positions.length === 1) {
      await mint(
        positions[0].tickLower,
        positions[0].tickUpper,
        positions[0].liquidity,
      );
    } else {
      await askForApproval(positions);

      const multicallData = positions.map(position =>
        encodeFunctionData({
          abi: singleOwnerVaultAbi,
          functionName: 'mint',
          args: [
            position.tickLower,
            position.tickUpper,
            position.liquidity,
            lowestTick,
          ],
        }),
      );
      const hash = await writeContractAsync({
        address: vaultAddr,
        abi: singleOwnerVaultAbi,
        functionName: 'multicall',
        args: [multicallData],
      });
      await waitForTransactionReceipt(walletClient!, {hash});
      void refetch();
    }
  };

  return {
    mintMultiple,
    mint,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
    isLoading: isPending || isConfirming,
  };
};
