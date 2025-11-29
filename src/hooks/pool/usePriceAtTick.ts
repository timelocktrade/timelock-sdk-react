import type {Address} from 'viem';
import {useMemo} from 'react';
import {usePoolData, type PoolKey} from './usePoolData';

import {getPriceAtTick, getPriceAtSqrtPriceX96} from '~/lib/liquidityUtils';
import {wrapPrice} from '~/lib/numberUtils';

export const usePriceAtTick = (
  poolManager?: Address,
  poolKey?: PoolKey,
  tick?: number,
) => {
  const {token0Decimals, token1Decimals} = usePoolData(poolManager, poolKey);

  const priceBigInt = useMemo(
    () => (tick !== undefined ? getPriceAtTick(tick) : undefined),
    [tick],
  );
  const price = useMemo(
    () =>
      priceBigInt && token0Decimals && token1Decimals
        ? wrapPrice(priceBigInt, token0Decimals, token1Decimals)
        : undefined,
    [priceBigInt, token0Decimals, token1Decimals],
  );
  return price;
};

export const usePriceAtSqrtPriceX96 = (
  poolManager?: Address,
  poolKey?: PoolKey,
  sqrtPriceX96?: bigint,
) => {
  const {token0Decimals, token1Decimals} = usePoolData(poolManager, poolKey);

  const priceBigInt = useMemo(
    () =>
      sqrtPriceX96 !== undefined
        ? getPriceAtSqrtPriceX96(sqrtPriceX96)
        : undefined,
    [sqrtPriceX96],
  );
  const price = useMemo(
    () =>
      priceBigInt && token0Decimals && token1Decimals
        ? wrapPrice(priceBigInt, token0Decimals, token1Decimals)
        : undefined,
    [priceBigInt, token0Decimals, token1Decimals],
  );
  return price;
};
