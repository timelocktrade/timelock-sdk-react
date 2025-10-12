'use client';

import type {Address} from 'viem';
import {waitForTransactionReceipt} from 'viem/actions';
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
  useWalletClient,
} from 'wagmi';

import {useMarketData} from './useMarketData';

import {type TimelockMarket} from '../../lib/contracts';
import {optionsMarketAbi} from '../../abis/optionsMarket';
import {singleOwnerVaultAbi} from '../../abis/singleOwnerVault';

export const useExerciseOption = (market?: Address | TimelockMarket) => {
  const {vault} = useMarketData(market);
  const {data: walletClient} = useWalletClient();

  const {data: lowestTick} = useReadContract({
    address: vault,
    abi: singleOwnerVaultAbi,
    functionName: 'lowestTick',
  });
  const {writeContractAsync, data: hash, isPending, error} = useWriteContract();

  const {isLoading: isConfirming, isSuccess} = useWaitForTransactionReceipt({
    hash,
  });

  const marketAddr = typeof market === 'string' ? market : market?.address;

  const exerciseOption = async (
    optionId: bigint,
    liquidities: readonly bigint[],
  ) => {
    if (lowestTick === undefined || !marketAddr) {
      throw new Error('Lowest tick lower not available');
    }
    const hash = await writeContractAsync({
      address: marketAddr,
      abi: optionsMarketAbi,
      functionName: 'exerciseOption',
      args: [optionId, liquidities, 0n, lowestTick],
    });
    await waitForTransactionReceipt(walletClient!, {hash});
    return hash;
  };

  return {
    exerciseOption,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
    isLoading: isPending || isConfirming,
  };
};
