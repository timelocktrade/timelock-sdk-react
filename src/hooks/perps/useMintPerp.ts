import {type Address, maxUint256} from 'viem';
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

export const useMintPerp = (marketAddr?: Address) => {
  const queryClient = useQueryClient();
  const client = useClient();
  const {address} = useAccount();

  const {operator, address: operatorAddr} = usePerpsOperator();
  const {askForApproval} = useApproval();

  const {data: operators} = useUserOperators(address, marketAddr);
  const {mutateAsync: setOperatorPerms} = useSetOperatorPerms(marketAddr);
  const {pool, optionAssetIsToken0, payoutAsset} = useMarketData(marketAddr);
  const {tickSpacing} = usePoolData(pool);
  const {exact: currentTick} = useCurrentTick(pool);

  const userPerms = operatorAddr
    ? operators.find(
        o => o.operatorAddr.toLowerCase() === operatorAddr.toLowerCase(),
      )
    : undefined;

  const hasEnoughPerms = userPerms && userPerms.canMint && userPerms.canExtend;

  const mintPerp = async (data: {
    optionType: 'CALL' | 'PUT';
    amount: bigint;
    duration: number;
    strikeTick?: number;
  }) => {
    const {optionType, amount, duration, strikeTick} = data;

    if (!client || !address) throw new Error('Wallet not connected');
    if (!marketAddr) throw new Error('Market address not found');

    if (!operator || !operatorAddr) {
      throw new Error('Operator address not found');
    }
    if (!tickSpacing || currentTick === undefined) {
      throw new Error('Pool data not found');
    }
    if (optionAssetIsToken0 === undefined || !payoutAsset) {
      throw new Error('Market data not found');
    }
    if (!hasEnoughPerms) {
      await setOperatorPerms({
        operator: operatorAddr,
        canMint: true,
        canExtend: true,
        canExercise: true,
        canTransfer: userPerms?.canTransfer || false,
        spendingApproval: maxUint256,
      });
    }
    const market = getTimelockMarket(marketAddr, client);

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
    await askForApproval(payoutAsset, marketAddr, maxPremium);

    await operator.mintPerp({
      marketAddr: marketAddr,
      userAddr: address,
      amount: amount,
      optionType: optionType,
      duration: duration,
      strikeTick: validStrikeTick,
    });
    void queryClient.invalidateQueries({
      queryKey: ['userOptions', address.toLowerCase()],
    });
  };
  return useMutation({mutationFn: mintPerp});
};
