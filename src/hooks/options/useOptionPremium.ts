import type {Address} from 'viem';
import {useReadContract} from 'wagmi';
import {useMemo} from 'react';

import {useCurrentTick} from '~/hooks/pool/useCurrentTick';
import {usePoolData} from '~/hooks/pool/usePoolData';
import {useMarketData} from '~/hooks/market/useMarketData';

import {wrapAmount} from '~/lib/numberUtils';
import {roundTick} from '~/lib/liquidityUtils';
import {optionsMarketAbi} from '~/abis/optionsMarket';

export const useOptionPremium = (
  marketAddr: Address | undefined,
  optionType: 'CALL' | 'PUT',
  optionAmount?: bigint,
  addedDuration?: number,
  remainingDuration = 0,
  strikeTick?: number,
) => {
  const {poolManager, poolKey, payoutAssetDecimals, optionAssetIsToken0} =
    useMarketData(marketAddr);

  const {tickSpacing} = usePoolData(poolManager, poolKey);
  const {data: {currentTick} = {}} = useCurrentTick(poolManager, poolKey);

  const strikeTickRounded = useMemo(() => {
    if (!tickSpacing || currentTick === undefined) {
      return undefined;
    }
    let strikeTickRounded = roundTick(strikeTick ?? currentTick, tickSpacing);

    if (
      (optionType === 'CALL' && optionAssetIsToken0) ||
      (optionType === 'PUT' && !optionAssetIsToken0)
    ) {
      strikeTickRounded += tickSpacing;
    }
    return strikeTickRounded;
  }, [currentTick, tickSpacing, optionType, optionAssetIsToken0, strikeTick]);

  const {data: [premium, protocolFee] = []} = useReadContract({
    address: marketAddr,
    abi: optionsMarketAbi,
    functionName: 'calculatePremium',
    args:
      strikeTickRounded !== undefined &&
      optionAmount !== undefined &&
      addedDuration !== undefined
        ? [
            optionType === 'CALL' ? 0 : 1,
            optionAmount,
            strikeTickRounded,
            addedDuration,
            remainingDuration,
          ]
        : undefined,
  });

  return useMemo(() => {
    if (
      premium === undefined ||
      protocolFee === undefined ||
      payoutAssetDecimals === undefined
    ) {
      return {};
    }
    return {
      premium: wrapAmount(premium, payoutAssetDecimals),
      protocolFee: wrapAmount(protocolFee, payoutAssetDecimals),
      totalPremium: wrapAmount(premium + protocolFee, payoutAssetDecimals),
    };
  }, [premium, protocolFee, payoutAssetDecimals]);
};
