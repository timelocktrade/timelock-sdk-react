import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import type {Address} from 'viem';

import {usePoolData} from '../pool/usePoolData';
import {useCurrentPrice} from '../pool/useCurrentPrice';
import {useLens} from '../useLens';
import {useVaultData} from './useVaultData';

import type {TimelockVault} from '../../lib/contracts';
import {wrapAmount} from '../../lib/numberUtils';

export type LiquidityBlockData = ReturnType<
  typeof useLiquidityBlocks
>['blocks'][0];

export const useLiquidityBlocks = (vault?: Address | TimelockVault) => {
  const {timelockLens} = useLens();
  const {pool} = useVaultData(vault);
  const {token0Decimals, token1Decimals} = usePoolData(pool);
  const {currentPrice} = useCurrentPrice(pool);

  const vaultAddr = typeof vault === 'string' ? vault : vault?.address;

  const {data: blocks = [], refetch} = useQuery({
    queryKey: ['liquidityBlocks', vaultAddr],
    queryFn: () => timelockLens!.read.getAllBlocks([vaultAddr!]),
    enabled: !!vaultAddr && !!timelockLens,
  });

  const {totalAmount0, totalAmount1, borrowedAmount0, borrowedAmount1} =
    useMemo(
      () => ({
        totalAmount0: token0Decimals
          ? wrapAmount(
              blocks.reduce((sum, block) => sum + block.totalAmount0, 0n),
              token0Decimals,
            )
          : undefined,
        totalAmount1: token1Decimals
          ? wrapAmount(
              blocks.reduce((sum, block) => sum + block.totalAmount1, 0n),
              token1Decimals,
            )
          : undefined,
        borrowedAmount0: token0Decimals
          ? wrapAmount(
              blocks.reduce((sum, block) => sum + block.borrowedAmount0, 0n),
              token0Decimals,
            )
          : undefined,
        borrowedAmount1: token1Decimals
          ? wrapAmount(
              blocks.reduce((sum, block) => sum + block.borrowedAmount1, 0n),
              token1Decimals,
            )
          : undefined,
      }),
      [blocks, token0Decimals, token1Decimals],
    );

  const tvl1 = useMemo(() => {
    if (!totalAmount0 || !totalAmount1 || !currentPrice || !token1Decimals)
      return undefined;

    const tvl0as1 = (totalAmount0.scaled * currentPrice.scaled) / 10n ** 18n;
    const tvl1 = totalAmount1.scaled;

    return wrapAmount(tvl0as1 + tvl1, token1Decimals);
  }, [totalAmount0, totalAmount1, currentPrice, token1Decimals]);

  return {
    tvl1,
    blocks,
    totalAmount0,
    totalAmount1,
    borrowedAmount0,
    borrowedAmount1,
    refetch,
  };
};
