import {encodeAbiParameters, type Address} from 'viem';
import {waitForTransactionReceipt} from 'viem/actions';
import {useWriteContract, useClient, useConnection} from 'wagmi';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import type {OptionData} from './useUserOptions';
import {useMarketData} from '~/hooks/market/useMarketData';
import {useCurrentPrice} from '~/hooks/pool/useCurrentPrice';
import {useLens} from '~/hooks/useLens';

import {sleep} from '~/lib/utils';
import {swappers} from '~/lib/contracts';
import {optionsMarketAbi} from '~/abis/optionsMarket';

export const useExerciseOption = (marketAddr: Address | undefined) => {
  const {vault, poolManager, poolKey} = useMarketData(marketAddr);
  const {timelockLens} = useLens();

  const queryClient = useQueryClient();
  const client = useClient();
  const {address} = useConnection();
  const {writeContractAsync} = useWriteContract();

  const {sqrtPriceX96} = useCurrentPrice(poolManager, poolKey);

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
    if (!poolKey) throw new Error('Pool data not available');
    if (!sqrtPriceX96) throw new Error('Current price not available');

    const swapper = swappers[client.chain.id];
    if (!swapper) throw new Error('Swapper not available');

    const minSqrtPrice = (sqrtPriceX96 * 9n) / 10n;
    const maxSqrtPrice = (sqrtPriceX96 * 11n) / 10n;

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
        encodeAbiParameters(
          [
            {
              type: 'tuple',
              components: [
                {type: 'address', name: 'currency0'},
                {type: 'address', name: 'currency1'},
                {type: 'uint24', name: 'fee'},
                {type: 'int24', name: 'tickSpacing'},
                {type: 'address', name: 'hooks'},
              ],
            },
            {type: 'uint160'},
            {type: 'uint160'},
          ],
          [poolKey, minSqrtPrice, maxSqrtPrice],
        ),
        refTick,
      ],
    });
    await waitForTransactionReceipt(client, {hash});

    await sleep(200);
    void queryClient.invalidateQueries({queryKey: ['userOptions']});
    void queryClient.invalidateQueries({queryKey: ['userOptions']});
    void queryClient.invalidateQueries({queryKey: ['readContract']});

    return hash;
  };
  return useMutation({mutationFn: exerciseOption});
};
