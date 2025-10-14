import type {Address} from 'viem';
import {useMemo} from 'react';
import {usePoolData} from './usePoolData';

import type {UniswapPool} from '../../lib/contracts';
import {getPriceAtTick} from '../../lib/liquidityUtils';
import {wrapPrice} from '../../lib/numberUtils';

export const usePriceAtTick = (tick?: number, pool?: Address | UniswapPool) => {
  const {token0Decimals, token1Decimals} = usePoolData(pool);

  const price = useMemo(
    () =>
      tick && token0Decimals && token1Decimals
        ? wrapPrice(getPriceAtTick(tick), token0Decimals, token1Decimals)
        : undefined,
    [tick, token0Decimals, token1Decimals],
  );
  return price;
};
