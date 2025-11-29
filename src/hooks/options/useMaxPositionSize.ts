import type {Address} from 'viem';
import {useReadContract} from 'wagmi';

import {useMarketData} from '~/hooks/market/useMarketData';
import {useLens} from '~/hooks/useLens';
import {wrapAmount} from '~/lib/numberUtils';
import {lensAbi} from '~/abis/lens';

export const useMaxPositionSize = (
  marketAddr: Address | undefined,
  strikeTick?: number,
  maxSteps = 100,
) => {
  const {timelockLens} = useLens();
  const {optionAssetDecimals} = useMarketData(marketAddr);

  const {data, ...rest} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: strikeTick ? 'getMaxPositionSizes' : 'getMaxATMPositionSizes',
    args: marketAddr
      ? strikeTick
        ? [marketAddr, strikeTick, maxSteps]
        : [marketAddr, maxSteps]
      : undefined,
    query: {enabled: !!marketAddr && !!timelockLens},
    // @ts-ignore
    gas: 100_000_000n,
  });

  const maxCallSize =
    data && optionAssetDecimals
      ? wrapAmount(data[0], optionAssetDecimals)
      : undefined;
  const maxPutSize =
    data && optionAssetDecimals
      ? wrapAmount(data[1], optionAssetDecimals)
      : undefined;

  return {maxCallSize, maxPutSize, ...rest};
};
