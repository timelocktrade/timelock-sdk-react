import type {Address} from 'viem';
import {useMemo} from 'react';
import {useBalance, useReadContract} from 'wagmi';
import {optionsMarketAbi} from '~/abis/optionsMarket';
import {useMarketData} from '../options/useMarketData';

export const useOperatorPerms = (
  marketAddr?: Address,
  userAddr?: Address,
  operatorAddr?: Address,
) => {
  const {payoutAsset} = useMarketData(marketAddr);

  const {data: payoutAssetBalance} = useBalance({
    address: userAddr,
    token: payoutAsset,
  });

  const {data, ...rest} = useReadContract({
    abi: optionsMarketAbi,
    address: marketAddr,
    functionName: 'operatorPerms',
    args: [userAddr!, operatorAddr!],
    query: {
      enabled: !!userAddr && !!operatorAddr,
      refetchInterval: 5000,
    },
  });
  const [canExtend, canExercise, canTransfer, canMint, spendingApproval] =
    data || [];

  const min = (a: bigint, b: bigint) => (a < b ? a : b);

  const effectiveApproval =
    spendingApproval && payoutAssetBalance
      ? min(spendingApproval, payoutAssetBalance.value)
      : 0n;

  const d = useMemo(
    () => ({
      canExtend,
      canExercise,
      canTransfer,
      canMint,
      spendingApproval,
      effectiveApproval,
    }),
    [
      canExtend,
      canExercise,
      canTransfer,
      canMint,
      spendingApproval,
      effectiveApproval,
    ],
  );
  return {data: d, ...rest};
};
