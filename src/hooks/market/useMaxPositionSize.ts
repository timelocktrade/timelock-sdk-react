import {useMemo} from 'react';
import {useReadContract} from 'wagmi';
import type {Address} from 'viem';

import {useLens} from '../useLens';
import {useMarketData} from './useMarketData';

import type {TimelockMarket} from '../../lib/contracts';
import {wrapAmount} from '../../lib/numberUtils';
import {lensAbi} from '../../abis/lens';

export const useMaxPositionSize = (
  market: Address | TimelockMarket | undefined,
  strikeTick?: number,
  maxBorrowableRange = 100,
) => {
  const {timelockLens} = useLens();
  const {optionAssetDecimals} = useMarketData(market);

  const marketAddr = typeof market === 'string' ? market : market?.address;

  const {data: data0, refetch: refetch0} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getMaxPositionSizeAtCurrentTick',
    args: [marketAddr!, maxBorrowableRange],
    query: {enabled: !!marketAddr && !!timelockLens},
  });

  const {data: data1, refetch: refetch1} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getMaxPositionSize',
    args: [marketAddr!, strikeTick!, maxBorrowableRange],
    query: {
      enabled: !!marketAddr && !!timelockLens && strikeTick !== undefined,
    },
  });
  const data = strikeTick !== undefined ? data1 : data0;

  const {maxCallSize, maxPutSize} = useMemo(
    () =>
      data && optionAssetDecimals
        ? {
            maxCallSize: wrapAmount(data[0], optionAssetDecimals),
            maxPutSize: wrapAmount(data[1], optionAssetDecimals),
          }
        : {},
    [data, optionAssetDecimals],
  );

  const refetch = () => {
    void refetch0();
    void refetch1();
  };
  return {maxCallSize, maxPutSize, refetch};
};
