import {maxUint256, type Address} from 'viem';
import {useConnection, useClient} from 'wagmi';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {usePerpsOperator} from './usePerpsOperator';
import {useApproval} from '~/hooks/tokens/useApproval';
import {useUserOperators} from '~/hooks/operators/useUserOperators';
import {useSetOperatorPerms} from '~/hooks/operators/useSetOperatorPerms';
import {useMarketData} from '~/hooks/market/useMarketData';
import {usePoolData} from '~/hooks/pool/usePoolData';
import {useCurrentTick} from '~/hooks/pool/useCurrentTick';
import {getNearestValidStrikeTick} from '~/lib/liquidityUtils';
import {sleep} from '~/lib/utils';

export const useMintPerp = (marketAddr: Address | undefined) => {
  const queryClient = useQueryClient();
  const client = useClient();
  const {address} = useConnection();

  const {
    operator,
    addresses: operatorAddresses,
    signMessage: {mutateAsync: signMessage},
  } = usePerpsOperator();

  const {poolManager, poolKey, optionAssetIsToken0, payoutAsset} =
    useMarketData(marketAddr);
  const {tickSpacing} = usePoolData(poolManager, poolKey);

  const {askForApproval} = useApproval();
  const {mutateAsync: setOperatorPerms} = useSetOperatorPerms(marketAddr);

  const {refetch: refetchOperators} = useUserOperators(address, marketAddr);
  const {refetch: refetchCurrentTick} = useCurrentTick(poolManager, poolKey);

  const updateOperatorPermsIfNeeded = async (
    requiredSpendingApproval: bigint,
  ) => {
    if (!operatorAddresses) return;

    const {data: operators = []} = await refetchOperators();

    const permsToUpdate: {
      operator: Address;
      canExtend: boolean;
      canExercise: boolean;
      canTransfer: boolean;
      canMint: boolean;
      spendingApproval: bigint;
    }[] = [];

    for (const operatorAddr of operatorAddresses) {
      const userPerms = operators.find(
        o => o.operatorAddr.toLowerCase() === operatorAddr.toLowerCase(),
      );
      const hasEnoughPerms =
        userPerms &&
        userPerms.canMint &&
        userPerms.canExtend &&
        userPerms.canExercise &&
        userPerms.spendingApproval > requiredSpendingApproval;

      if (!hasEnoughPerms) {
        permsToUpdate.push({
          operator: operatorAddr,
          canMint: true,
          canExtend: true,
          canExercise: true,
          canTransfer: userPerms?.canTransfer ?? false,
          spendingApproval: maxUint256,
        });
      }
    }
    if (permsToUpdate.length > 0) {
      await setOperatorPerms(permsToUpdate);
    }
  };

  const mintPerp = async (data: {
    optionType: 'CALL' | 'PUT';
    amount: bigint;
    duration: number;
    maxPremium: bigint;
    maxSteps: number;
    strikeTick?: number;
  }) => {
    const {optionType, amount, duration, strikeTick, maxPremium, maxSteps} =
      data;

    if (!client || !address) throw new Error('Wallet not connected');
    if (!marketAddr) throw new Error('Market address not found');
    if (!tickSpacing) throw new Error('Pool data not found');

    if (!operator || !operatorAddresses) {
      throw new Error('Operator address not found');
    }
    if (optionAssetIsToken0 === undefined || !payoutAsset) {
      throw new Error('Market data not found');
    }
    if (!operator.auth) await signMessage();

    const {data: {currentTick} = {}} = await refetchCurrentTick();

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
    await updateOperatorPermsIfNeeded(maxPremium);
    await askForApproval(payoutAsset, marketAddr, maxPremium);

    await operator.mintPerp({
      marketAddr: marketAddr,
      amount: amount,
      optionType: optionType,
      duration: duration,
      strikeTick: validStrikeTick,
      maxPremium: maxPremium,
      maxSteps: maxSteps,
    });

    await sleep(200);
    void refetchOperators();
    void queryClient.invalidateQueries({queryKey: ['userOptions']});
    void queryClient.invalidateQueries({queryKey: ['userOptions']});
    void queryClient.invalidateQueries({queryKey: ['readContract']});
  };
  return useMutation({mutationFn: mintPerp});
};
