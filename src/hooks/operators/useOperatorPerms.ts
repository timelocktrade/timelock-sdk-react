import type {Address} from 'viem';
import {useReadContract} from 'wagmi';
import {optionsMarketAbi} from '~/abis/optionsMarket';

export const useOperatorPerms = (
  marketAddr?: Address,
  userAddr?: Address,
  operatorAddr?: Address,
) => {
  const {data, ...rest} = useReadContract({
    abi: optionsMarketAbi,
    address: marketAddr,
    functionName: 'operatorPerms',
    args: [userAddr!, operatorAddr!],
    query: {enabled: !!userAddr && !!operatorAddr},
  });
  const d = data
    ? {
        canExtend: data[0],
        canExercise: data[1],
        canTransfer: data[2],
        canMint: data[3],
        spendingApproval: data[4],
      }
    : undefined;

  return {data: d, ...rest};
};
