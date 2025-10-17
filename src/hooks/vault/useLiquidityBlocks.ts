import type {Address} from 'viem';
import {useReadContract} from 'wagmi';

import {useLens} from '../useLens';
import {lensAbi} from '~/abis/lens';

export type LiquidityBlockData = ReturnType<
  typeof useLiquidityBlocks
>['data'][0];

export const useLiquidityBlocks = (vaultAddr?: Address) => {
  const {timelockLens} = useLens();

  const {data: blocks = [], ...rest} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getAllBlocks',
    args: [vaultAddr!],
    query: {enabled: !!vaultAddr && !!timelockLens},
  });
  return {data: blocks, ...rest};
};
