import {useReadContract} from 'wagmi';
import type {Address} from 'viem';

import {useLens} from '../useLens';
import {useVaultData} from './useVaultData';
import {usePoolData} from '../pool/usePoolData';

import type {TimelockVault} from '../../lib/contracts';
import {wrapAmount} from '../../lib/numberUtils';
import {lensAbi} from '../../abis/lens';

export const useVaultTVL = (vault?: Address | TimelockVault) => {
  const {timelockLens} = useLens();
  const {pool} = useVaultData(vault);
  const {token0Decimals, token1Decimals} = usePoolData(pool);

  const vaultAddr = typeof vault === 'string' ? vault : vault?.address;

  const {data, refetch} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getVaultTVL',
    args: [vaultAddr!],
    query: {enabled: !!vaultAddr && !!timelockLens},
  });

  const totalAmount0 =
    data && token0Decimals ? wrapAmount(data[0], token0Decimals) : undefined;
  const totalAmount1 =
    data && token1Decimals ? wrapAmount(data[1], token1Decimals) : undefined;
  const borrowedAmount0 =
    data && token0Decimals ? wrapAmount(data[2], token0Decimals) : undefined;
  const borrowedAmount1 =
    data && token1Decimals ? wrapAmount(data[3], token1Decimals) : undefined;
  const tvl0 =
    data && token0Decimals ? wrapAmount(data[4], token0Decimals) : undefined;
  const tvl1 =
    data && token1Decimals ? wrapAmount(data[5], token1Decimals) : undefined;

  return {
    tvl0,
    tvl1,
    totalAmount0,
    totalAmount1,
    borrowedAmount0,
    borrowedAmount1,
    refetch,
  };
};
