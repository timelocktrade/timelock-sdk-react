import type {Address} from 'viem';
import {useReadContract} from 'wagmi';
import {usePoolData} from './usePoolData';
import {uniswapV3PoolAbi} from '~/abis/uniswapV3Pool';

export const useCurrentTick = (poolAddr?: Address) => {
  const {tickSpacing} = usePoolData(poolAddr);

  const {data, ...rest} = useReadContract({
    address: poolAddr,
    abi: uniswapV3PoolAbi,
    functionName: 'slot0',
    args: [],
    query: {
      refetchInterval: 3000,
      select: raw => {
        const sqrtPriceX96 = raw?.[0];
        const exact = raw?.[1];

        const rounded =
          exact !== undefined && tickSpacing
            ? Math.floor(exact / tickSpacing) * tickSpacing
            : undefined;

        return {exact, rounded, sqrtPriceX96};
      },
    },
  });
  return {
    exact: data?.exact,
    rounded: data?.rounded,
    sqrtPriceX96: data?.sqrtPriceX96,
    ...rest,
  };
};
