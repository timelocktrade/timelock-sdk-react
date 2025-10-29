import {useMemo} from 'react';
import type {OptionData} from './useUserOptions';
import {useMarketData} from './useMarketData';
import {useCurrentTick} from '../pool/useCurrentTick';
import {
  liquiditiesToAmounts,
  PRICE_PRECISION,
  token0ToToken1,
  token1ToToken0,
} from '~/lib/liquidityUtils';
import {wrapAmount} from '~/lib/numberUtils';

export const useOptionPnl = (option: OptionData) => {
  const {marketAddr, optionType, strikePrice, positionSizeCurrent} = option;

  const {pool, optionAssetIsToken0, payoutAssetDecimals, tickSpacing} =
    useMarketData(marketAddr);
  const {exact: currentTick} = useCurrentTick(pool);

  const strikeSize = (positionSizeCurrent * strikePrice) / PRICE_PRECISION;

  const displayPnl = useMemo(() => {
    if (
      optionAssetIsToken0 === undefined ||
      currentTick === undefined ||
      !positionSizeCurrent ||
      !payoutAssetDecimals
    )
      return undefined;

    const currentSize = optionAssetIsToken0
      ? token0ToToken1(positionSizeCurrent, currentTick)
      : token1ToToken0(positionSizeCurrent, currentTick);

    const delta = currentSize - strikeSize;
    const pnl = optionType === 'CALL' ? delta : -delta;

    return wrapAmount(pnl, payoutAssetDecimals);
  }, [
    optionType,
    optionAssetIsToken0,
    currentTick,
    positionSizeCurrent,
    payoutAssetDecimals,
  ]);

  const unrealizedPayout = useMemo(() => {
    if (!payoutAssetDecimals || !currentTick || !tickSpacing) return undefined;

    const [amount0, amount1] = liquiditiesToAmounts(
      option.liquiditiesCurrent,
      option.startTick,
      currentTick,
      tickSpacing,
    );
    const currentSize = optionAssetIsToken0
      ? amount1 + token0ToToken1(amount0, currentTick)
      : amount0 + token1ToToken0(amount1, currentTick);

    const delta = currentSize - strikeSize;
    const pnl = optionType === 'CALL' ? delta : -delta;
    const payout = pnl < 0 ? 0n : pnl;

    return wrapAmount(payout, payoutAssetDecimals);
  }, [currentTick, tickSpacing, optionType, payoutAssetDecimals]);

  return {unrealizedPayout, displayPnl};
};
