import {useMemo} from 'react';
import type {Address} from 'viem';
import {useMarketData} from './useMarketData';
import {usePoolData} from '../pool/usePoolData';
import {useCurrentTick} from '../pool/useCurrentTick';
import {
  liquiditiesToAmount1,
  liquiditiesToAmount0,
  token0ToToken1,
  token1ToToken0,
  getPriceAtTick,
  PRICE_PRECISION,
} from '../../lib/liquidityUtils';

const getPositionSize = (
  liquidities: bigint[],
  entryTick: number,
  strikeTick: number,
  tickSpacing: number,
  optionType: 'CALL' | 'PUT',
  optionAssetIsToken0: boolean,
) => {
  const startTick =
    strikeTick - (optionType === 'CALL' ? 0 : tickSpacing * liquidities.length);

  const bAmount0 = liquiditiesToAmount0(liquidities, startTick, tickSpacing);
  const bAmount1 = liquiditiesToAmount1(liquidities, startTick, tickSpacing);

  if (optionType === 'CALL') {
    return optionAssetIsToken0 ? bAmount0 : bAmount1;
  }
  return optionAssetIsToken0
    ? token1ToToken0(bAmount1, entryTick)
    : token0ToToken1(bAmount0, entryTick);
};

const getPrice = (entryTick: number, optionAssetIsToken0: boolean) => {
  const price = getPriceAtTick(entryTick);
  return optionAssetIsToken0 ? price : PRICE_PRECISION / price;
};

export const useOptionLiquidityData = (optionData: {
  marketAddr: Address;
  optionType: 'CALL' | 'PUT';
  liquiditiesAtOpen: bigint[];
  liquiditiesCurrent: bigint[];
  strikeTick: number;
  entryTick: number;
}) => {
  const {
    marketAddr,
    optionType,
    liquiditiesAtOpen,
    liquiditiesCurrent,
    strikeTick,
    entryTick,
  } = optionData;

  const {pool, optionAssetIsToken0} = useMarketData(marketAddr);
  const {tickSpacing} = usePoolData(pool);
  const {exact: currentTick} = useCurrentTick(pool);

  const {strikePrice, entryPrice} = useMemo(() => {
    if (optionAssetIsToken0 === undefined) return {};
    const entryPrice = getPrice(entryTick, optionAssetIsToken0);
    const strikePrice = getPrice(strikeTick, optionAssetIsToken0);

    return {strikePrice, entryPrice};
  }, [optionData, optionAssetIsToken0]);

  const {positionSizeAtOpen, positionSizeCurrent} = useMemo(() => {
    if (optionAssetIsToken0 === undefined || tickSpacing === undefined)
      return {};

    const positionSizeAtOpen = getPositionSize(
      liquiditiesAtOpen,
      entryTick,
      strikeTick,
      tickSpacing,
      optionType,
      optionAssetIsToken0,
    );
    const positionSizeCurrent = getPositionSize(
      liquiditiesCurrent,
      entryTick,
      strikeTick,
      tickSpacing,
      optionType,
      optionAssetIsToken0,
    );
    return {positionSizeAtOpen, positionSizeCurrent};
  }, [optionData, optionAssetIsToken0, tickSpacing]);

  const {displayPnl, unrealizedPayout} = useMemo(() => {
    if (
      currentTick === undefined ||
      positionSizeCurrent === undefined ||
      optionAssetIsToken0 === undefined
    )
      return {};

    const delta = optionAssetIsToken0
      ? token0ToToken1(positionSizeCurrent, currentTick) -
        token0ToToken1(positionSizeCurrent, entryTick)
      : token1ToToken0(positionSizeCurrent, currentTick) -
        token1ToToken0(positionSizeCurrent, entryTick);

    const displayPnl = optionType === 'CALL' ? delta : -delta;
    const unrealizedPayout = displayPnl < 0 ? 0 : displayPnl;

    return {unrealizedPayout, displayPnl};
  }, [optionData, optionAssetIsToken0, currentTick, positionSizeCurrent]);

  return {
    positionSizeCurrent,
    positionSizeAtOpen,
    displayPnl,
    unrealizedPayout,
    strikePrice,
    entryPrice,
  };
};
