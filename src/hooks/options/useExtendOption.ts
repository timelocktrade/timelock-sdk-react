import {maxUint256, type Address} from 'viem';
import {waitForTransactionReceipt} from 'viem/actions';
import {useWriteContract, useClient, useAccount} from 'wagmi';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import type {OptionData} from './useUserOptions';
import {useMarketData} from './useMarketData';
import {useApproval} from '~/hooks/useApproval';
import {getTimelockMarket} from '~/lib/contracts';
import {sleep} from '~/lib/utils';
import {optionsMarketAbi} from '~/abis/optionsMarket';

export const useExtendOption = (marketAddr?: Address) => {
  const {payoutAsset} = useMarketData(marketAddr);

  const queryClient = useQueryClient();
  const client = useClient();
  const {address} = useAccount();

  const {askForApproval} = useApproval();
  const {writeContractAsync} = useWriteContract();

  const extendOption = async ({
    option,
    duration,
  }: {
    option: OptionData;
    duration: number;
  }) => {
    if (!client || !address) throw new Error('Wallet not connected');

    if (!marketAddr || !payoutAsset) {
      throw new Error('Market address not available');
    }
    const market = getTimelockMarket(marketAddr, client);

    const remainingDuration = Math.max(
      0,
      Math.floor((option.expiresAt.getTime() - Date.now()) / 1000),
    );
    const [premium, protocolFee] = await market.read.calculatePremium([
      option.optionType === 'CALL' ? 0 : 1,
      option.positionSizeCurrent,
      option.strikeTick,
      duration,
      remainingDuration,
    ]);
    const maxPremium = ((premium + protocolFee) * 11n) / 10n;
    await askForApproval(payoutAsset, marketAddr, maxPremium);

    const hash = await writeContractAsync({
      address: marketAddr,
      abi: optionsMarketAbi,
      functionName: 'extendOption',
      args: [option.optionId, duration, maxUint256],
    });
    await waitForTransactionReceipt(client, {hash});

    await sleep(200);
    void queryClient.invalidateQueries({queryKey: ['userOptions']});
    void queryClient.invalidateQueries({queryKey: ['userOptions']});
    void queryClient.invalidateQueries({queryKey: ['readContract']});

    return hash;
  };
  return useMutation({mutationFn: extendOption});
};
