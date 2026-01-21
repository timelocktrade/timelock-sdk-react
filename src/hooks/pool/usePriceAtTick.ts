import type {Address} from 'viem';
import {useMemo} from 'react';
import {usePoolData} from './usePoolData';

import {
  type PoolKey,
  getPriceAtTick,
  getPriceAtSqrtPriceX96,
} from '~/lib/liquidityUtils';
import {wrapPrice} from '~/lib/numberUtils';

export const usePriceAtTick = (
  poolManager?: Address,
  poolKey?: PoolKey,
  tick?: number,
  token0For1 = true,
) => {
  const {token0Decimals, token1Decimals} = usePoolData(poolManager, poolKey);

  const priceBigInt = useMemo(
    () => (tick !== undefined ? getPriceAtTick(tick, token0For1) : undefined),
    [tick],
  );
  const price = useMemo(
    () =>
      priceBigInt && token0Decimals && token1Decimals
        ? wrapPrice(
            priceBigInt,
            token0For1 ? token0Decimals : token1Decimals,
            token0For1 ? token1Decimals : token0Decimals,
          )
        : undefined,
    [priceBigInt, token0Decimals, token1Decimals],
  );
  return price;
};

export const usePriceAtSqrtPriceX96 = (
  poolManager?: Address,
  poolKey?: PoolKey,
  sqrtPriceX96?: bigint,
  token0For1 = true,
) => {
  const {token0Decimals, token1Decimals} = usePoolData(poolManager, poolKey);

  const priceBigInt = useMemo(
    () =>
      sqrtPriceX96 !== undefined
        ? getPriceAtSqrtPriceX96(sqrtPriceX96, token0For1)
        : undefined,
    [sqrtPriceX96],
  );

  const price = useMemo(() => {
    if (priceBigInt === undefined || !token0Decimals || !token1Decimals) {
      return undefined;
    }
    return wrapPrice(
      priceBigInt,
      token0For1 ? token0Decimals : token1Decimals,
      token0For1 ? token1Decimals : token0Decimals,
    );
  }, [priceBigInt, token0Decimals, token1Decimals]);

  return price;
};
