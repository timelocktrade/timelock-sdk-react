import {useReadContract} from 'wagmi';
import type {Address} from 'viem';
import {useMemo} from 'react';

import {useCurrentTick} from '../pool/useCurrentTick';
import {usePoolData} from '../pool/usePoolData';
import {useMarketData} from './useMarketData';

import {wrapAmount} from '~/lib/numberUtils';
import {optionsMarketAbi} from '~/abis/optionsMarket';

export const useOptionPremium = (
  marketAddr: Address | undefined,
  optionType: 'CALL' | 'PUT',
  optionAmount: bigint,
  duration: number,
) => {
  const {pool, payoutAssetDecimals} = useMarketData(marketAddr);
  const {tickSpacing} = usePoolData(pool);
  const currentTick = useCurrentTick(pool);

  const strikeTick = useMemo(() => {
    if (currentTick.rounded === undefined || tickSpacing === undefined) {
      return undefined;
    }
    return optionType === 'CALL'
      ? currentTick.rounded + tickSpacing
      : currentTick.rounded;
  }, [currentTick.rounded, tickSpacing, optionType]);

  const {data: premiumData} = useReadContract({
    address: marketAddr,
    abi: optionsMarketAbi,
    functionName: 'calculatePremium',
    args:
      strikeTick !== undefined
        ? [
            optionType === 'CALL' ? 0 : 1,
            optionAmount,
            strikeTick,
            BigInt(duration),
          ]
        : undefined,
    query: {
      enabled:
        currentTick.rounded !== undefined &&
        payoutAssetDecimals !== undefined &&
        tickSpacing !== undefined &&
        strikeTick !== undefined,
    },
  });

  const premium = useMemo(() => {
    if (premiumData === undefined || payoutAssetDecimals === undefined) {
      return undefined;
    }
    return wrapAmount(premiumData, payoutAssetDecimals);
  }, [premiumData, payoutAssetDecimals]);

  return premium;
};
