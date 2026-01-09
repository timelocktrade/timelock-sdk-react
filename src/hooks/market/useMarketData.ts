import type {NonUndefinedGuard} from '@tanstack/react-query';
import {useMemo} from 'react';
import type {Address} from 'viem';
import {useReadContract, useReadContracts} from 'wagmi';

import {useLens} from '../useLens';
import type {getTimelockLens} from '~/lib/contracts';
import {lensAbi} from '~/abis/lens';

export type MarketData = Awaited<
  ReturnType<
    Awaited<ReturnType<typeof getTimelockLens>>['read']['getMarketData']
  >
>;

export const useMarketData = (marketAddr: Address | undefined) => {
  const {timelockLens} = useLens();

  const {data} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getMarketData',
    args: marketAddr ? [marketAddr] : undefined,
  });
  return (data || {}) as Partial<NonUndefinedGuard<typeof data>>;
};

export const useMarketsData = (marketAddrs: Address[]) => {
  const {timelockLens} = useLens();

  // Get unique addresses and create index mapping
  const {uniqueAddrs, indexMap} = useMemo(() => {
    const seen = new Map<Address, number>();
    const unique: Address[] = [];
    const mapping: number[] = [];

    for (const addr of marketAddrs) {
      if (!seen.has(addr)) {
        seen.set(addr, unique.length);
        unique.push(addr);
      }
      mapping.push(seen.get(addr)!);
    }
    return {uniqueAddrs: unique, indexMap: mapping};
  }, [marketAddrs]);

  // Build contracts array for unique addresses only
  const contracts = useMemo(() => {
    if (!timelockLens) return [];

    return uniqueAddrs.map(addr => ({
      address: timelockLens.address,
      abi: lensAbi,
      functionName: 'getMarketData' as const,
      args: [addr] as const,
    }));
  }, [timelockLens, uniqueAddrs]);

  const result = useReadContracts({
    contracts,
    query: {
      enabled: !!timelockLens && marketAddrs.length > 0,
      staleTime: 30_000,
    },
  });

  // Map unique results back to original array order (with duplicates)
  const data = useMemo(() => {
    if (!result.data) return undefined;

    return indexMap.map(idx => {
      const marketData = result.data[idx]?.result;

      if (!marketData) {
        throw new Error(`Failed to fetch data for market at index ${idx}`);
      }
      return marketData;
    });
  }, [result.data, indexMap]);

  return {...result, data};
};
