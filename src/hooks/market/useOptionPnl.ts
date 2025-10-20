import {useMemo} from 'react';
import type {Address} from 'viem';
import {useMarketData} from './useMarketData';
import {useCurrentTick} from '../pool/useCurrentTick';
import {
  PRICE_PRECISION,
  token0ToToken1,
  token1ToToken0,
} from '~/lib/liquidityUtils';
import {wrapAmount} from '~/lib/numberUtils';

export const useOptionPnl = (optionData: {
  marketAddr: Address;
  optionType: 'CALL' | 'PUT';
  positionSizeCurrent: bigint;
  strikePrice: bigint;
}) => {
  const {marketAddr, optionType, strikePrice, positionSizeCurrent} = optionData;

  const {pool, optionAssetIsToken0, payoutAssetDecimals} =
    useMarketData(marketAddr);
  const {exact: currentTick} = useCurrentTick(pool);

  return useMemo(() => {
    if (
      optionAssetIsToken0 === undefined ||
      currentTick === undefined ||
      !positionSizeCurrent ||
      !payoutAssetDecimals
    )
      return {};

    const strikeSize = (positionSizeCurrent * strikePrice) / PRICE_PRECISION;

    const currentSize = optionAssetIsToken0
      ? token0ToToken1(positionSizeCurrent, currentTick)
      : token1ToToken0(positionSizeCurrent, currentTick);

    const delta = currentSize - strikeSize;

    const displayPnl = wrapAmount(
      optionType === 'CALL' ? delta : -delta,
      payoutAssetDecimals,
    );
    const unrealizedPayout = wrapAmount(
      displayPnl.scaled < 0 ? 0n : displayPnl.scaled,
      payoutAssetDecimals,
    );
    return {unrealizedPayout, displayPnl};
  }, [
    strikePrice,
    optionType,
    optionAssetIsToken0,
    currentTick,
    positionSizeCurrent,
    payoutAssetDecimals,
  ]);
};
