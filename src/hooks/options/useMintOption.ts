import {maxUint256, type Address} from 'viem';
import {waitForTransactionReceipt} from 'viem/actions';
import {useWriteContract, useClient, useAccount} from 'wagmi';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {useMarketData} from './useMarketData';
import {useCurrentTick} from '~/hooks/pool/useCurrentTick';
import {usePoolData} from '~/hooks/pool/usePoolData';
import {useLens} from '~/hooks/useLens';
import {useApproval} from '~/hooks/useApproval';

import {getTimelockMarket} from '~/lib/contracts';
import {getNearestValidStrikeTick} from '~/lib/liquidityUtils';
import {sleep} from '~/lib/utils';
import {optionsMarketAbi} from '~/abis/optionsMarket';

export const useMintOption = (marketAddr?: Address) => {
  const {payoutAsset, vault, pool, optionAssetIsToken0} =
    useMarketData(marketAddr);

  const {tickSpacing} = usePoolData(pool);
  const {exact: currentTick} = useCurrentTick(pool);

  const queryClient = useQueryClient();
  const client = useClient();
  const {address} = useAccount();
  const {timelockLens} = useLens();

  const {askForApproval} = useApproval();
  const {writeContractAsync} = useWriteContract();

  const mintOption = async ({
    optionType,
    amount,
    duration,
    strikeTick,
  }: {
    optionType: 'CALL' | 'PUT';
    amount: bigint;
    duration: number;
    strikeTick?: number;
  }) => {
    if (!client || !address) throw new Error('Wallet not connected');
    if (!marketAddr) throw new Error('Market address not available');
    if (!timelockLens) throw new Error('Timelock lens not available');

    if (!vault || !payoutAsset || optionAssetIsToken0 === undefined) {
      throw new Error('Market data not available');
    }
    if (currentTick === undefined || !tickSpacing) {
      throw new Error('Pool data not available');
    }
    strikeTick = getNearestValidStrikeTick(
      optionType,
      optionAssetIsToken0,
      tickSpacing,
      currentTick,
      strikeTick,
    );
    const market = getTimelockMarket(marketAddr, client);

    const [premium, protocolFee] = await market.read.calculatePremium([
      optionType === 'CALL' ? 0 : 1,
      amount,
      strikeTick,
      duration,
      0,
    ]);
    const maxPremium = ((premium + protocolFee) * 11n) / 10n;
    await askForApproval(payoutAsset, marketAddr, maxPremium);

    const hash = await writeContractAsync({
      address: marketAddr,
      abi: optionsMarketAbi,
      functionName: 'mintOption',
      args: [
        address,
        optionType === 'CALL' ? 0 : 1,
        amount,
        strikeTick,
        duration,
        maxUint256,
        await timelockLens.read.getRefTick([vault, strikeTick]),
      ],
    });
    await waitForTransactionReceipt(client, {hash});

    await sleep(200);
    void queryClient.invalidateQueries({queryKey: ['userOptions']});
    void queryClient.invalidateQueries({queryKey: ['userOptions']});
    void queryClient.invalidateQueries({queryKey: ['readContract']});

    return hash;
  };
  return useMutation({mutationFn: mintOption});
};
