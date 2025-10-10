'use client';

import {type Address, erc20Abi, maxUint256} from 'viem';
import {waitForTransactionReceipt} from 'viem/actions';
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
  useWalletClient,
} from 'wagmi';

import {useCurrentTick} from '../pool/useCurrentTick';
import {useLiquidityBlocks} from '../vault/useLiquidityBlocks';
import {useVaultData} from '../vault/useVaultData';
import {usePoolData} from '../pool/usePoolData';
import {useMarketData} from './useMarketData';
import {useUserOptions} from './useUserOptions';

import {getTimelockMarket, type TimelockMarket} from '../../lib/contracts';
import {optionsMarketAbi} from '../../abis/optionsMarket';
import {singleOwnerVaultAbi} from '../../abis/singleOwnerVault';

export const useMintOption = (market?: Address | TimelockMarket) => {
  const {refetch: refetchOptions} = useUserOptions(market);
  const {payoutAsset, vault} = useMarketData(market);
  const {pool} = useVaultData(vault);
  const {refetch: refetchLiquidity} = useLiquidityBlocks(vault);
  const {tickSpacing} = usePoolData(pool);
  const {rounded: currentTick} = useCurrentTick(pool);

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
  market = market || marketAddr;

  const askForApproval = async (premiumAmount: bigint) => {
    if (!payoutAsset || !marketAddr) {
      throw new Error('Tokens not available');
    }
    const allowance = await payoutAsset.read.allowance([
      walletClient!.account!.address,
      marketAddr,
    ]);

    if (allowance < premiumAmount) {
      const approvalHash = await writeContractAsync({
        address: payoutAsset.address,
        abi: erc20Abi,
        functionName: 'approve',
        args: [marketAddr, maxUint256],
      });
      await waitForTransactionReceipt(walletClient!, {hash: approvalHash});
    }
  };

  const mintOption = async (
    optionType: 'CALL' | 'PUT',
    amount: bigint,
    duration: number,
  ) => {
    if (
      lowestTick === undefined ||
      !marketAddr ||
      !walletClient ||
      !currentTick ||
      !tickSpacing
    ) {
      throw new Error('Lowest tick lower not available');
    }
    const strikeTick =
      optionType === 'CALL' ? currentTick + tickSpacing : currentTick;

    const market = getTimelockMarket(marketAddr, walletClient);

    const premium = await market.read.calculatePremium([
      optionType === 'CALL' ? 0 : 1,
      amount,
      strikeTick,
      BigInt(duration),
    ]);
    await askForApproval(premium);

    const hash = await writeContractAsync({
      address: marketAddr,
      abi: optionsMarketAbi,
      functionName: 'mintOption',
      args: [
        optionType === 'CALL' ? 0 : 1,
        amount,
        strikeTick,
        BigInt(duration),
        BigInt(1e69),
        lowestTick,
      ],
    });
    await waitForTransactionReceipt(walletClient!, {hash});
    void refetchLiquidity();
    void refetchOptions();
    return hash;
  };
  return {
    mintOption,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
    isLoading: isPending || isConfirming,
  };
};
