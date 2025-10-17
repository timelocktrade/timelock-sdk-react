import {useReadContract} from 'wagmi';
import type {Address} from 'viem';

import {useLens} from '../useLens';
import {useVaultData} from './useVaultData';
import {usePoolData} from '../pool/usePoolData';

import {wrapAmount} from '~/lib/numberUtils';
import {lensAbi} from '~/abis/lens';
import {useMemo} from 'react';

export const useVaultTVL = (vaultAddr?: Address) => {
  const {timelockLens} = useLens();
  const {pool} = useVaultData(vaultAddr);
  const {token0Decimals, token1Decimals} = usePoolData(pool);

  const {data, refetch} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getVaultTVL',
    args: [vaultAddr!],
    query: {enabled: !!vaultAddr && !!timelockLens},
  });

  return useMemo(() => {
    if (!token0Decimals || !token1Decimals || !data) return {};

    const totalAmount0 = wrapAmount(data[0], token0Decimals);
    const totalAmount1 = wrapAmount(data[1], token1Decimals);
    const borrowedAmount0 = wrapAmount(data[2], token0Decimals);
    const borrowedAmount1 = wrapAmount(data[3], token1Decimals);
    const tvl0 = wrapAmount(data[4], token0Decimals);
    const tvl1 = wrapAmount(data[5], token1Decimals);
    const blocksCount = data[6];

    return {
      tvl0,
      tvl1,
      totalAmount0,
      totalAmount1,
      borrowedAmount0,
      borrowedAmount1,
      blocksCount,
      refetch,
    };
  }, [data, token0Decimals, token1Decimals, refetch]);
};
