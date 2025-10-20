import type {Address} from 'viem';
import {waitForTransactionReceipt} from 'viem/actions';
import {useWriteContract, useWaitForTransactionReceipt, useClient} from 'wagmi';

import {useMarketData} from './useMarketData';

import {optionsMarketAbi} from '~/abis/optionsMarket';
import type {OptionData} from './useUserOptions';
import {useLens} from '../useLens';

export const useExerciseOption = (marketAddr?: Address) => {
  const {vault} = useMarketData(marketAddr);
  const {timelockLens} = useLens();
  const client = useClient();

  const {writeContractAsync, data: hash, isPending, error} = useWriteContract();

  const {isLoading: isConfirming, isSuccess} = useWaitForTransactionReceipt({
    hash,
  });

  const exerciseOption = async (
    option: OptionData,
    liquidities: readonly bigint[],
  ) => {
    if (!client || !timelockLens || !vault || !marketAddr)
      throw new Error('Wallet not connected');

    const refTick = await timelockLens.read.getRefTick([
      vault,
      option.startTick,
    ]);
    const hash = await writeContractAsync({
      address: marketAddr,
      abi: optionsMarketAbi,
      functionName: 'exerciseOption',
      args: [option.optionId, liquidities, 0n, refTick],
    });
    await waitForTransactionReceipt(client, {hash});
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
