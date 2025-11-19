import type {Address} from 'viem';
import {useAccount, useClient} from 'wagmi';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {usePerpsOperator} from './usePerpsOperator';
import {useApproval} from '~/hooks/useApproval';
import {useUserOperators} from '~/hooks/operators/useUserOperators';
import {useSetOperatorPerms} from '~/hooks/operators/useSetOperatorPerms';
import {useMarketData} from '~/hooks/options/useMarketData';
import {usePoolData} from '~/hooks/pool/usePoolData';
import {useCurrentTick} from '~/hooks/pool/useCurrentTick';
import {getTimelockMarket} from '~/lib/contracts';
import {getNearestValidStrikeTick} from '~/lib/liquidityUtils';
import {sleep} from '~/lib/utils';

export const useMintPerp = (marketAddr?: Address) => {
  const queryClient = useQueryClient();
  const client = useClient();
  const {address} = useAccount();

  const {
    operator,
    address: operatorAddr,
    signMessage: {mutateAsync: signMessage},
  } = usePerpsOperator();
  const {askForApproval} = useApproval();

  const {data: operators} = useUserOperators(address, marketAddr);
  const {mutateAsync: setOperatorPerms} = useSetOperatorPerms(marketAddr);
  const {pool, optionAssetIsToken0, payoutAsset} = useMarketData(marketAddr);
  const {tickSpacing} = usePoolData(pool);
  const {refetch: refetchCurrentTick} = useCurrentTick(pool);

  const userPerms = operatorAddr
    ? operators.find(
        o => o.operatorAddr.toLowerCase() === operatorAddr.toLowerCase(),
      )
    : undefined;

  const hasEnoughPerms =
    userPerms &&
    userPerms.canMint &&
    userPerms.canExtend &&
    userPerms.canExercise;

  const mintPerp = async (data: {
    optionType: 'CALL' | 'PUT';
    amount: bigint;
    duration: number;
    strikeTick?: number;
  }) => {
    const {optionType, amount, duration, strikeTick} = data;

    if (!client || !address) throw new Error('Wallet not connected');
    if (!marketAddr) throw new Error('Market address not found');
    if (!tickSpacing) throw new Error('Pool data not found');

    if (!operator || !operatorAddr) {
      throw new Error('Operator address not found');
    }
    if (optionAssetIsToken0 === undefined || !payoutAsset) {
      throw new Error('Market data not found');
    }
    if (!operator.auth) await signMessage();

    const market = getTimelockMarket(marketAddr, client);

    const {data: {exact: currentTick} = {}} = await refetchCurrentTick();

    if (currentTick === undefined) {
      throw new Error('Could not fetch current tick');
    }
    const validStrikeTick = getNearestValidStrikeTick(
      optionType,
      optionAssetIsToken0,
      tickSpacing,
      currentTick,
      strikeTick,
    );
    const [premium, protocolFee] = await market.read.calculatePremium([
      optionType === 'CALL' ? 0 : 1,
      amount,
      validStrikeTick,
      duration,
      0,
    ]);
    const maxPremium = ((premium + protocolFee) * 11n) / 10n;

    if (!hasEnoughPerms) {
      await setOperatorPerms({
        operator: operatorAddr,
        canMint: true,
        canExtend: true,
        canExercise: true,
        canTransfer: userPerms?.canTransfer || false,
        spendingApproval: maxPremium,
      });
    }
    await askForApproval(payoutAsset, marketAddr, maxPremium);

    await operator.mintPerp({
      marketAddr: marketAddr,
      amount: amount,
      optionType: optionType,
      duration: duration,
      strikeTick: validStrikeTick,
    });

    await sleep(200);
    void queryClient.invalidateQueries({queryKey: ['userOptions']});
    void queryClient.invalidateQueries({queryKey: ['userOptions']});
    void queryClient.invalidateQueries({queryKey: ['readContract']});
  };
  return useMutation({mutationFn: mintPerp});
};
