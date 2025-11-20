import {useMemo} from 'react';
import {useReadContract} from 'wagmi';
import type {Address} from 'viem';

import {useLens} from '../useLens';
import {useMarketData} from './useMarketData';

import {wrapAmount} from '~/lib/numberUtils';
import {lensAbi} from '~/abis/lens';

export const useMaxPositionSize = (
  marketAddr: Address | undefined,
  maxBorrowableRange = 100,
) => {
  const {timelockLens} = useLens();
  const {optionAssetDecimals} = useMarketData(marketAddr);

  const {data, ...rest} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getMaxATMSizes',
    args: [marketAddr!, maxBorrowableRange],
    query: {enabled: !!marketAddr && !!timelockLens},
    // @ts-ignore
    gas: 100_000_000n,
  });

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
  return {maxCallSize, maxPutSize, ...rest};
};
