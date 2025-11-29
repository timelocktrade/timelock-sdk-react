import type {Address} from 'viem';
import {useMemo} from 'react';
import {useReadContract} from 'wagmi';
import {useMarketData} from '~/hooks/market/useMarketData';
import {useTokenBalance} from '~/hooks/tokens/useTokenBalance';
import {optionsMarketAbi} from '~/abis/optionsMarket';

export const useOperatorPerms = (
  marketAddr?: Address,
  userAddr?: Address,
  operatorAddr?: Address,
) => {
  const {payoutAsset} = useMarketData(marketAddr);
  const {data: payoutAssetBalance} = useTokenBalance(payoutAsset, userAddr);

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
      ? min(spendingApproval, payoutAssetBalance.scaled)
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
