import {useMemo} from 'react';
import type {OptionData} from './useUserOptions';
import {useMarketData} from './useMarketData';
import {
  token0ToToken1,
  token0ToToken1AtTick,
  token1ToToken0,
  token1ToToken0AtTick,
} from '~/lib/liquidityUtils';
import {wrapAmount} from '~/lib/numberUtils';
import {getPayoutAtPrice} from '~/lib/optionUtils';
import {useCurrentPrice} from '../pool/useCurrentPrice';

export const useOptionPnl = (option: OptionData) => {
  const {marketAddr, optionType, strikeTick, positionSizeCurrent} = option;

  const {pool, optionAssetIsToken0, payoutAssetDecimals, tickSpacing} =
    useMarketData(marketAddr);
  const {currentPrice} = useCurrentPrice(pool);

  const displayPnl = useMemo(() => {
    if (
      optionAssetIsToken0 === undefined ||
      currentPrice === undefined ||
      !payoutAssetDecimals
    )
      return undefined;

    const strikeSize = optionAssetIsToken0
      ? token0ToToken1AtTick(positionSizeCurrent, strikeTick)
      : token1ToToken0AtTick(positionSizeCurrent, strikeTick);

    const currentSize = optionAssetIsToken0
      ? token0ToToken1(positionSizeCurrent, currentPrice.scaled)
      : token1ToToken0(positionSizeCurrent, currentPrice.scaled);

    const delta = currentSize - strikeSize;
    const pnl = optionType === 'CALL' ? delta : -delta;

    return wrapAmount(pnl, payoutAssetDecimals);
  }, [
    strikeTick,
    optionType,
    optionAssetIsToken0,
    currentPrice,
    positionSizeCurrent,
    payoutAssetDecimals,
  ]);

  const unrealizedPayout = useMemo(() => {
    if (
      !payoutAssetDecimals ||
      !currentPrice ||
      !tickSpacing ||
      optionAssetIsToken0 === undefined
    )
      return undefined;

    const payout = getPayoutAtPrice(
      option,
      option.liquiditiesCurrent,
      currentPrice.scaled,
      tickSpacing,
      optionAssetIsToken0,
    );
    return wrapAmount(payout, payoutAssetDecimals);
  }, [
    currentPrice,
    tickSpacing,
    optionType,
    payoutAssetDecimals,
    optionAssetIsToken0,
  ]);

  return {unrealizedPayout, displayPnl};
};
