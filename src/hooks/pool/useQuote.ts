import {useMemo} from 'react';
import type {Address, Hex} from 'viem';
import {useSimulateContract} from 'wagmi';
import type {PoolKey} from '~/lib/liquidityUtils';
import {useLens} from '../useLens';
import {quoterAbi} from '~/abis/quoterV4';

export type QuoteExactSingleParams = {
  poolKey: PoolKey;
  zeroForOne: boolean;
  exactAmount: bigint;
  hookData: Hex;
};

export type PathKey = {
  intermediateCurrency: Address;
  fee: number;
  tickSpacing: number;
  hooks: Address;
  hookData: Hex;
};

export type QuoteExactParams = {
  exactCurrency: Address;
  path: PathKey[];
  exactAmount: bigint;
};

export type UseQuoteOptions = {
  enabled?: boolean;
};

/**
 * Hook to get a quote for an exact input single-hop swap
 */
export const useQuoteExactInputSingle = (
  poolManager: Address | undefined,
  params: QuoteExactSingleParams | undefined,
  options: UseQuoteOptions = {},
) => {
  const {quoter} = useLens();
  const {enabled = true} = options;

  const result = useSimulateContract({
    address: quoter?.address,
    abi: quoterAbi,
    functionName: 'quoteExactInputSingle',
    args: poolManager && params ? [poolManager, params] : undefined,
    query: {
      enabled: enabled && !!quoter?.address && !!poolManager && !!params,
    },
  });

  return useMemo(
    () => ({
      ...result,
      amountOut: result.data?.result?.[0],
      gasEstimate: result.data?.result?.[1],
    }),
    [result],
  );
};

/**
 * Hook to get a quote for an exact output single-hop swap
 */
export const useQuoteExactOutputSingle = (
  poolManager: Address | undefined,
  params: QuoteExactSingleParams | undefined,
  options: UseQuoteOptions = {},
) => {
  const {quoter} = useLens();
  const {enabled = true} = options;

  const result = useSimulateContract({
    address: quoter?.address,
    abi: quoterAbi,
    functionName: 'quoteExactOutputSingle',
    args: poolManager && params ? [poolManager, params] : undefined,
    query: {
      enabled: enabled && !!quoter?.address && !!poolManager && !!params,
    },
  });

  return useMemo(
    () => ({
      ...result,
      amountIn: result.data?.result?.[0],
      gasEstimate: result.data?.result?.[1],
    }),
    [result],
  );
};

/**
 * Hook to get a quote for an exact input multi-hop swap
 */
export const useQuoteExactInput = (
  poolManager: Address | undefined,
  params: QuoteExactParams | undefined,
  options: UseQuoteOptions = {},
) => {
  const {quoter} = useLens();
  const {enabled = true} = options;

  const result = useSimulateContract({
    address: quoter?.address,
    abi: quoterAbi,
    functionName: 'quoteExactInput',
    args: poolManager && params ? [poolManager, params] : undefined,
    query: {
      enabled: enabled && !!quoter?.address && !!poolManager && !!params,
    },
  });

  return useMemo(
    () => ({
      ...result,
      amountOut: result.data?.result?.[0],
      gasEstimate: result.data?.result?.[1],
    }),
    [result],
  );
};

/**
 * Hook to get a quote for an exact output multi-hop swap
 */
export const useQuoteExactOutput = (
  poolManager: Address | undefined,
  params: QuoteExactParams | undefined,
  options: UseQuoteOptions = {},
) => {
  const {quoter} = useLens();
  const {enabled = true} = options;

  const result = useSimulateContract({
    address: quoter?.address,
    abi: quoterAbi,
    functionName: 'quoteExactOutput',
    args: poolManager && params ? [poolManager, params] : undefined,
    query: {
      enabled: enabled && !!quoter?.address && !!poolManager && !!params,
    },
  });

  return useMemo(
    () => ({
      ...result,
      amountIn: result.data?.result?.[0],
      gasEstimate: result.data?.result?.[1],
    }),
    [result],
  );
};

/**
 * Convenience hook for simple single-hop swaps
 * Automatically builds the params from common inputs
 */
export const useQuote = (
  poolManager: Address | undefined,
  poolKey: PoolKey | undefined,
  {
    exactAmount,
    zeroForOne,
    exactInput = true,
    hookData = '0x' as Hex,
    enabled = true,
  }: {
    exactAmount: bigint | undefined;
    zeroForOne: boolean;
    exactInput?: boolean;
    hookData?: Hex;
    enabled?: boolean;
  },
) => {
  const params = useMemo(() => {
    if (!poolKey || exactAmount === undefined) return undefined;
    return {
      poolKey,
      zeroForOne,
      exactAmount,
      hookData,
    } satisfies QuoteExactSingleParams;
  }, [poolKey, zeroForOne, exactAmount, hookData]);

  const inputResult = useQuoteExactInputSingle(poolManager, params, {
    enabled: enabled && exactInput,
  });
  const outputResult = useQuoteExactOutputSingle(poolManager, params, {
    enabled: enabled && !exactInput,
  });

  return exactInput ? inputResult : outputResult;
};
