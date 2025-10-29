import {encodeAbiParameters, type Address} from 'viem';
import {waitForTransactionReceipt} from 'viem/actions';
import {useWriteContract, useClient, useAccount} from 'wagmi';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import type {OptionData} from './useUserOptions';
import {useMarketData} from './useMarketData';
import {useLens} from '~/hooks/useLens';
import {usePoolData} from '~/hooks/pool/usePoolData';

import {optionsMarketAbi} from '~/abis/optionsMarket';

const swapper = '0xc396aa907F8De0c32460050B8Adbf047186C504d';

export const useExerciseOption = (marketAddr?: Address) => {
  const {vault, pool} = useMarketData(marketAddr);
  const {fee} = usePoolData(pool);
  const {timelockLens} = useLens();

  const queryClient = useQueryClient();
  const client = useClient();
  const {address} = useAccount();
  const {writeContractAsync} = useWriteContract();

  const exerciseOption = async ({
    option,
    liquidities,
  }: {
    option: OptionData;
    liquidities: readonly bigint[];
  }) => {
    if (!client || !address) throw new Error('Wallet not connected');
    if (!marketAddr) throw new Error('Market address not available');
    if (!timelockLens) throw new Error('Timelock lens not available');
    if (!vault) throw new Error('Vault not available');
    if (!fee) throw new Error('Pool data not available');

    const refTick = await timelockLens.read.getRefTick([
      vault,
      option.startTick,
    ]);
    const hash = await writeContractAsync({
      address: marketAddr,
      abi: optionsMarketAbi,
      functionName: 'exerciseOption',
      args: [
        option.optionId,
        liquidities,
        0n,
        swapper,
        encodeAbiParameters([{type: 'uint24'}], [fee]),
        refTick,
      ],
    });
    await waitForTransactionReceipt(client, {hash});

    void queryClient.invalidateQueries({
      queryKey: ['userOptions', address.toLowerCase()],
    });
    return hash;
  };
  return useMutation({mutationFn: exerciseOption});
};
