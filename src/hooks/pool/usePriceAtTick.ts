import type {Address} from 'viem';
import {useMemo} from 'react';
import {usePoolData} from './usePoolData';

import {getPriceAtTick} from '../../lib/liquidityUtils';
import {wrapPrice} from '../../lib/numberUtils';

export const usePriceAtTick = (tick?: number, poolAddr?: Address) => {
  const {token0Decimals, token1Decimals} = usePoolData(poolAddr);

  const priceBigInt = useMemo(
    () => (tick ? getPriceAtTick(tick) : undefined),
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
