import {useQuery} from '@tanstack/react-query';
import type {Address} from 'viem';
import {useChainId} from 'wagmi';
import {getPriceHistory, type PriceResolution} from '~/lib/price';

export const usePriceHistory = (
  pool: Address | undefined,
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
      resolution,
      startTimestamp,
      endTimestamp,
    ],
    queryFn: () =>
      getPriceHistory(pool!, resolution, startTimestamp, endTimestamp),
    enabled: !!pool && startTimestamp < endTimestamp,
    staleTime: 60 * 1000, // Consider data stale after 1 minute
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    retry: 2,
  });
};
