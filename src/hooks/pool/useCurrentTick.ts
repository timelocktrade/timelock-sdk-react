import {useMemo} from 'react';
import type {Address} from 'viem';
import {useReadContract} from 'wagmi';
import {usePoolData} from './usePoolData';
import {uniswapV3PoolAbi} from '~/abis/uniswapV3Pool';

export const useCurrentTick = (poolAddr?: Address) => {
  const {tickSpacing} = usePoolData(poolAddr);

  const {data} = useReadContract({
    address: poolAddr,
    abi: uniswapV3PoolAbi,
    functionName: 'slot0',
    args: [],
  });

  return useMemo(() => {
    const exact = data?.[1];

    const rounded =
      exact && tickSpacing
        ? Math.floor(exact / tickSpacing) * tickSpacing
        : undefined;

    return {exact, rounded};
  }, [data, tickSpacing]);
};
