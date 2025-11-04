import {useMemo} from 'react';
import type {OptionData} from './useUserOptions';
import {useMarketData} from './useMarketData';
import {useCurrentTick} from '~/hooks/pool/useCurrentTick';
import {token0ToToken1, token1ToToken0} from '~/lib/liquidityUtils';
import {wrapAmount} from '~/lib/numberUtils';
import {getPayoutAtTick} from '~/lib/optionUtils';

export const useOptionPnl = (option: OptionData) => {
  const {marketAddr, optionType, entryTick, positionSizeCurrent} = option;

  const {pool, optionAssetIsToken0, payoutAssetDecimals, tickSpacing} =
    useMarketData(marketAddr);
  const {exact: currentTick} = useCurrentTick(pool);

  const displayPnl = useMemo(() => {
    if (
      optionAssetIsToken0 === undefined ||
      currentTick === undefined ||
      !payoutAssetDecimals
    )
      return undefined;

    const entrySize = optionAssetIsToken0
      ? token0ToToken1(positionSizeCurrent, entryTick)
      : token1ToToken0(positionSizeCurrent, entryTick);

    const currentSize = optionAssetIsToken0
      ? token0ToToken1(positionSizeCurrent, currentTick)
      : token1ToToken0(positionSizeCurrent, currentTick);

    const delta = currentSize - entrySize;
    const pnl = optionType === 'CALL' ? delta : -delta;

    return wrapAmount(pnl, payoutAssetDecimals);
  }, [
    entryTick,
    optionType,
    optionAssetIsToken0,
    currentTick,
    positionSizeCurrent,
    payoutAssetDecimals,
  ]);

  const unrealizedPayout = useMemo(() => {
    if (
      !payoutAssetDecimals ||
      !currentTick ||
      !tickSpacing ||
      optionAssetIsToken0 === undefined
    )
      return undefined;

    const payout = getPayoutAtTick(
      option,
      option.liquiditiesCurrent,
      currentTick,
      tickSpacing,
      optionAssetIsToken0,
    );
    return wrapAmount(payout, payoutAssetDecimals);
  }, [
    currentTick,
    tickSpacing,
    optionType,
    payoutAssetDecimals,
    optionAssetIsToken0,
  ]);

  return {unrealizedPayout, displayPnl};
};
