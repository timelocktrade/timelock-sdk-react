import {useQuery} from '@tanstack/react-query';
import type {Address} from 'viem';
import {useChainId} from 'wagmi';
import {useMarketData} from '~/hooks/market/useMarketData';
import {getPriceHistory, type PriceResolution} from '~/lib/price';

export const usePriceHistory = (
  pool: Address | undefined,
  token: 0 | 1,
  resolution: PriceResolution,
  startTimestamp: Date,
  endTimestamp: Date,
) => {
  const chainId = useChainId();

  return useQuery({
    queryKey: [
      'priceHistory',
      pool,
      chainId,
      token,
      resolution,
      startTimestamp,
      endTimestamp,
    ],
    queryFn: () =>
      getPriceHistory(pool!, token, resolution, startTimestamp, endTimestamp),
    enabled: !!pool && startTimestamp < endTimestamp,
    staleTime: 60 * 1000, // Consider data stale after 1 minute
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    retry: 2,
  });
};

export const useMarketPriceHistory = (
  marketAddr: Address | undefined,
  resolution: PriceResolution,
  startTimestamp: Date,
  endTimestamp: Date,
) => {
  const {pool, optionAssetIsToken0} = useMarketData(marketAddr);

  return usePriceHistory(
    pool!,
    optionAssetIsToken0 ? 0 : 1,
    resolution,
    startTimestamp,
    endTimestamp,
  );
};
