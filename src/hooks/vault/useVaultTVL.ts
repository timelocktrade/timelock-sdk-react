import {useReadContract} from 'wagmi';
import type {Address} from 'viem';

import {useLens} from '../useLens';
import {useVaultData} from './useVaultData';
import {usePoolData} from '../pool/usePoolData';

import type {TimelockVault} from '../../lib/contracts';
import {wrapAmount} from '../../lib/numberUtils';
import {lensAbi} from '../../abis/lens';
import {useCurrentPrice} from '../pool/useCurrentPrice';

export const useVaultTVL = (vault?: Address | TimelockVault) => {
  const {timelockLens} = useLens();
  const {pool} = useVaultData(vault);
  const {currentPrice} = useCurrentPrice(pool);
  const {token0Decimals, token1Decimals} = usePoolData(pool);

  const vaultAddr = typeof vault === 'string' ? vault : vault?.address;

  const {data, refetch} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getVaultTVL',
    args: [vaultAddr!, 100],
    query: {enabled: !!vaultAddr && !!timelockLens},
  });

  const [
    totalAmount0,
    totalAmount1,
    borrowedAmount0,
    borrowedAmount1,
    tvl0,
    tvl1,
    borrowable0,
    borrowable1,
  ] = data || [];

  const maxLongSize = borrowable0;
  const maxShortSize =
    currentPrice && borrowable1 !== undefined
      ? (borrowable1 * BigInt(1e18)) / currentPrice?.scaled
      : undefined;

  return {
    tvl0: tvl0 && token0Decimals ? wrapAmount(tvl0, token0Decimals) : undefined,
    tvl1: tvl1 && token1Decimals ? wrapAmount(tvl1, token1Decimals) : undefined,
    totalAmount0:
      totalAmount0 && token0Decimals
        ? wrapAmount(totalAmount0, token0Decimals)
        : undefined,
    totalAmount1:
      totalAmount1 && token1Decimals
        ? wrapAmount(totalAmount1, token1Decimals)
        : undefined,
    borrowedAmount0:
      borrowedAmount0 && token0Decimals
        ? wrapAmount(borrowedAmount0, token0Decimals)
        : undefined,
    borrowedAmount1:
      borrowedAmount1 && token1Decimals
        ? wrapAmount(borrowedAmount1, token1Decimals)
        : undefined,
    maxLongSize:
      maxLongSize && token0Decimals
        ? wrapAmount(maxLongSize, token0Decimals)
        : undefined,
    maxShortSize:
      maxShortSize && token0Decimals
        ? wrapAmount(maxShortSize, token0Decimals)
        : undefined,
    refetch,
  };
};
