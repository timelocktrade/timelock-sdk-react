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

type QuoteResult = {
  deltaAmount: bigint;
  gasEstimate: bigint;
};

const selectQuoteResult = (data: {
  result: readonly [bigint, bigint];
}): QuoteResult => ({
  deltaAmount: data.result[0],
  gasEstimate: data.result[1],
});

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

  return useSimulateContract({
    address: quoter?.address,
    abi: quoterAbi,
    functionName: 'quoteExactInputSingle',
    args: poolManager && params ? [poolManager, params] : undefined,
    query: {
      enabled: enabled && !!quoter?.address && !!poolManager && !!params,
      select: selectQuoteResult,
    },
  });
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

  return useSimulateContract({
    address: quoter?.address,
    abi: quoterAbi,
    functionName: 'quoteExactOutputSingle',
    args: poolManager && params ? [poolManager, params] : undefined,
    query: {
      enabled: enabled && !!quoter?.address && !!poolManager && !!params,
      select: selectQuoteResult,
    },
  });
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

  return useSimulateContract({
    address: quoter?.address,
    abi: quoterAbi,
    functionName: 'quoteExactInput',
    args: poolManager && params ? [poolManager, params] : undefined,
    query: {
      enabled: enabled && !!quoter?.address && !!poolManager && !!params,
      select: selectQuoteResult,
    },
  });
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

  return useSimulateContract({
    address: quoter?.address,
    abi: quoterAbi,
    functionName: 'quoteExactOutput',
    args: poolManager && params ? [poolManager, params] : undefined,
    query: {
      enabled: enabled && !!quoter?.address && !!poolManager && !!params,
      select: selectQuoteResult,
    },
  });
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
  const {quoter} = useLens();

  const params =
    poolKey && exactAmount !== undefined
      ? {
          poolKey,
          zeroForOne,
          exactAmount,
          hookData,
        }
      : undefined;

  const isEnabled = enabled && !!quoter?.address && !!poolManager && !!params;

  const inputResult = useSimulateContract({
    address: quoter?.address,
    abi: quoterAbi,
    functionName: 'quoteExactInputSingle',
    args: poolManager && params ? [poolManager, params] : undefined,
    query: {
      enabled: isEnabled && exactInput,
      select: selectQuoteResult,
    },
  });

  const outputResult = useSimulateContract({
    address: quoter?.address,
    abi: quoterAbi,
    functionName: 'quoteExactOutputSingle',
    args: poolManager && params ? [poolManager, params] : undefined,
    query: {
      enabled: isEnabled && !exactInput,
      select: selectQuoteResult,
    },
  });

  return exactInput ? inputResult : outputResult;
};
