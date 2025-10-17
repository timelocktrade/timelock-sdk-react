import {useMemo} from 'react';
import type {Address} from 'viem';
import {useMarketData} from './useMarketData';
import {useCurrentTick} from '../pool/useCurrentTick';
import {token0ToToken1, token1ToToken0} from '~/lib/liquidityUtils';
import {wrapAmount} from '~/lib/numberUtils';

export const useOptionPnl = (optionData: {
  marketAddr: Address;
  optionType: 'CALL' | 'PUT';
  positionSizeCurrent: bigint;
  entryTick: number;
}) => {
  const {marketAddr, optionType, entryTick, positionSizeCurrent} = optionData;

  const {pool, optionAssetIsToken0, payoutAssetDecimals} =
    useMarketData(marketAddr);
  const {exact: currentTick} = useCurrentTick(pool);

  const {displayPnl, unrealizedPayout} = useMemo(() => {
    if (
      optionAssetIsToken0 === undefined ||
      currentTick === undefined ||
      !positionSizeCurrent ||
      !payoutAssetDecimals
    )
      return {};

    const delta = optionAssetIsToken0
      ? token0ToToken1(positionSizeCurrent, currentTick) -
        token0ToToken1(positionSizeCurrent, entryTick)
      : token1ToToken0(positionSizeCurrent, currentTick) -
        token1ToToken0(positionSizeCurrent, entryTick);

    const displayPnl = wrapAmount(
      optionType === 'CALL' ? delta : -delta,
      payoutAssetDecimals,
    );
    const unrealizedPayout = wrapAmount(
      displayPnl.scaled < 0 ? 0n : displayPnl.scaled,
      payoutAssetDecimals,
    );
    return {unrealizedPayout, displayPnl};
  }, [optionData, optionAssetIsToken0, currentTick, positionSizeCurrent]);

  return {displayPnl, unrealizedPayout};
};
