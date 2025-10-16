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
import {wrapAmount, wrapPrice} from 'src/lib/numberUtils';

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

  const {pool, optionAssetIsToken0, optionAssetDecimals, payoutAssetDecimals} =
    useMarketData(marketAddr);
  const {tickSpacing} = usePoolData(pool);
  const {exact: currentTick} = useCurrentTick(pool);

  const {strikePrice, entryPrice} = useMemo(() => {
    if (
      optionAssetIsToken0 === undefined ||
      !optionAssetDecimals ||
      !payoutAssetDecimals
    )
      return {};

    const entryPrice = wrapPrice(
      getPrice(entryTick, optionAssetIsToken0),
      optionAssetDecimals,
      payoutAssetDecimals,
    );
    const strikePrice = wrapPrice(
      getPrice(strikeTick, optionAssetIsToken0),
      optionAssetDecimals,
      payoutAssetDecimals,
    );
    return {strikePrice, entryPrice};
  }, [
    optionData,
    optionAssetIsToken0,
    optionAssetDecimals,
    payoutAssetDecimals,
  ]);

  const {positionSizeAtOpen, positionSizeCurrent} = useMemo(() => {
    if (
      optionAssetIsToken0 === undefined ||
      !tickSpacing ||
      !optionAssetDecimals ||
      !payoutAssetDecimals
    )
      return {};

    const positionSizeAtOpen = wrapAmount(
      getPositionSize(
        liquiditiesAtOpen,
        entryTick,
        strikeTick,
        tickSpacing,
        optionType,
        optionAssetIsToken0,
      ),
      optionAssetDecimals,
    );
    const positionSizeCurrent = wrapAmount(
      getPositionSize(
        liquiditiesCurrent,
        entryTick,
        strikeTick,
        tickSpacing,
        optionType,
        optionAssetIsToken0,
      ),
      optionAssetDecimals,
    );
    return {positionSizeAtOpen, positionSizeCurrent};
  }, [
    optionData,
    optionAssetIsToken0,
    tickSpacing,
    optionAssetDecimals,
    payoutAssetDecimals,
  ]);

  const {displayPnl, unrealizedPayout} = useMemo(() => {
    if (
      optionAssetIsToken0 === undefined ||
      currentTick === undefined ||
      !positionSizeCurrent ||
      !payoutAssetDecimals
    )
      return {};

    const size = positionSizeCurrent.scaled;

    const delta = optionAssetIsToken0
      ? token0ToToken1(size, currentTick) - token0ToToken1(size, entryTick)
      : token1ToToken0(size, currentTick) - token1ToToken0(size, entryTick);

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

  return {
    positionSizeCurrent,
    positionSizeAtOpen,
    displayPnl,
    unrealizedPayout,
    strikePrice,
    entryPrice,
  };
};
