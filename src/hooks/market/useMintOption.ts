import {type Address, erc20Abi, maxUint256} from 'viem';
import {waitForTransactionReceipt} from 'viem/actions';
import {
  useWriteContract,
  useClient,
  useWaitForTransactionReceipt,
  useAccount,
} from 'wagmi';

import {useCurrentTick} from '../pool/useCurrentTick';
import {usePoolData} from '../pool/usePoolData';
import {useMarketData} from './useMarketData';
import {useLens} from '../useLens';

import {
  getErc20,
  getTimelockMarket,
  type TimelockMarket,
} from '../../lib/contracts';
import {roundTickDown, roundTickUp} from '../../lib/liquidityUtils';
import {optionsMarketAbi} from '../../abis/optionsMarket';

export const useMintOption = (market?: Address | TimelockMarket) => {
  const {timelockLens} = useLens();
  const {payoutAsset, vault, pool} = useMarketData(market);
  const {tickSpacing} = usePoolData(pool);
  const {exact: currentTick} = useCurrentTick(pool);

  const client = useClient();
  const {address} = useAccount();

  const {writeContractAsync, data: hash, isPending, error} = useWriteContract();

  const {isLoading: isConfirming, isSuccess} = useWaitForTransactionReceipt({
    hash,
  });
  const marketAddr = typeof market === 'string' ? market : market?.address;

  const askForApproval = async (premiumAmount: bigint) => {
    if (!client || !address) throw new Error('Wallet not connected');

    if (!payoutAsset || !marketAddr) {
      throw new Error('Tokens not available');
    }
    const payoutContract = getErc20(payoutAsset, client);

    const allowance = await payoutContract.read.allowance([
      address,
      marketAddr,
    ]);
    if (allowance < premiumAmount) {
      const approvalHash = await writeContractAsync({
        address: payoutAsset,
        abi: erc20Abi,
        functionName: 'approve',
        args: [marketAddr, maxUint256],
      });
      await waitForTransactionReceipt(client, {hash: approvalHash});
    }
  };

  const mintOption = async (
    optionType: 'CALL' | 'PUT',
    amount: bigint,
    duration: number,
    strikeTick?: number,
  ) => {
    if (!client) throw new Error('Wallet not connected');

    if (
      !timelockLens ||
      !vault ||
      !marketAddr ||
      !currentTick ||
      !tickSpacing
    ) {
      throw new Error('Lowest tick lower not available');
    }
    strikeTick = (optionType === 'CALL' ? roundTickUp : roundTickDown)(
      strikeTick ?? currentTick,
      tickSpacing,
    );
    const market = getTimelockMarket(marketAddr, client);

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
        await timelockLens.read.getRefTick([vault, strikeTick]),
      ],
    });
    await waitForTransactionReceipt(client, {hash});
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
