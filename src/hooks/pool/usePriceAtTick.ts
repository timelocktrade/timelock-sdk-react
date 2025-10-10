import type {Address} from 'viem';
import {useState, useEffect} from 'react';
import {debounce} from 'lodash';
import {useReadContract} from 'wagmi';

import {usePoolData} from './usePoolData';
import {useLens} from '../useLens';

import {type Amount, wrapPrice} from '../../lib/numberUtils';
import type {UniswapPool} from '../../lib/contracts';
import {uniswapMathLensAbi} from '../../abis/uniswapMathLens';

const usePriceAtTick = (tick?: number, pool?: Address | UniswapPool) => {
  const {uniswapLens} = useLens();
  const {token0Decimals, token1Decimals} = usePoolData(pool);
  const [debouncedTick, setDebouncedTick] = useState(tick);
  const [price, setPrice] = useState<Amount>();

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedTick(tick);
    }, 300);
    handler();

    return () => handler.cancel();
  }, [tick]);

  const {data: priceRaw} = useReadContract({
    address: uniswapLens?.address,
    abi: uniswapMathLensAbi,
    functionName: 'getPriceAtTick',
    args: [debouncedTick!],
    query: {enabled: debouncedTick !== undefined},
  });

  useEffect(() => {
    if (
      priceRaw !== undefined &&
      token0Decimals !== undefined &&
      token1Decimals !== undefined
    ) {
      setPrice(wrapPrice(priceRaw, token0Decimals, token1Decimals));
    }
  }, [priceRaw, token0Decimals, token1Decimals]);

  return price;
};

export default usePriceAtTick;
