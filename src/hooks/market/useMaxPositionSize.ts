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

  const {data, refetch} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getMaxPositionSize',
    args: strikeTick
      ? [marketAddr!, strikeTick, maxBorrowableRange]
      : [marketAddr!, maxBorrowableRange],
    query: {enabled: !!marketAddr && !!timelockLens},
  });

  const maxCallSize =
    data && optionAssetDecimals
      ? wrapAmount(data[0], optionAssetDecimals)
      : undefined;
  const maxPutSize =
    data && optionAssetDecimals
      ? wrapAmount(data[1], optionAssetDecimals)
      : undefined;

  return {maxCallSize, maxPutSize, refetch};
};
