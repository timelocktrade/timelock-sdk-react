import {useReadContract} from 'wagmi';
import type {Address} from 'viem';
import {useMemo} from 'react';

import {useCurrentTick} from '../pool/useCurrentTick';
import {usePoolData} from '../pool/usePoolData';
import {useMarketData} from './useMarketData';

import {wrapAmount} from '~/lib/numberUtils';
import {optionsMarketAbi} from '~/abis/optionsMarket';
import {roundTickDown} from '~/lib/liquidityUtils';

export const useOptionPremium = (
  marketAddr: Address | undefined,
  optionType: 'CALL' | 'PUT',
  optionAmount: bigint,
  duration: number,
  strikeTick?: number,
) => {
  const {pool, payoutAssetDecimals, optionAssetIsToken0} =
    useMarketData(marketAddr);
  const {tickSpacing} = usePoolData(pool);
  const {exact: currentTick} = useCurrentTick(pool);

  const strikeTickRounded = useMemo(() => {
    if (!tickSpacing || currentTick === undefined) {
      return undefined;
    }
    let strikeTickRounded = roundTickDown(
      strikeTick ?? currentTick,
      tickSpacing,
    );
    if (
      (optionType === 'CALL' && optionAssetIsToken0) ||
      (optionType === 'PUT' && !optionAssetIsToken0)
    ) {
      strikeTickRounded += tickSpacing;
    }
    return strikeTickRounded;
  }, [currentTick, tickSpacing, optionType, optionAssetIsToken0, strikeTick]);

  const {data: premiumData} = useReadContract({
    address: marketAddr,
    abi: optionsMarketAbi,
    functionName: 'calculatePremium',
    args:
      strikeTickRounded !== undefined
        ? [
            optionType === 'CALL' ? 0 : 1,
            optionAmount,
            strikeTickRounded,
            BigInt(duration),
          ]
        : undefined,
    query: {enabled: strikeTickRounded !== undefined},
  });

  const premium = useMemo(() => {
    if (premiumData === undefined || payoutAssetDecimals === undefined) {
      return undefined;
    }
    return wrapAmount(premiumData, payoutAssetDecimals);
  }, [premiumData, payoutAssetDecimals]);

  return premium;
};
