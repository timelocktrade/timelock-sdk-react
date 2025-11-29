import {useReadContract} from 'wagmi';
import type {Address} from 'viem';

import {useLens} from '../useLens';
import {useVaultData} from './useVaultData';
import {usePoolData} from '../pool/usePoolData';

import {wrapAmount} from '~/lib/numberUtils';
import {lensAbi} from '~/abis/lens';
import {useMemo} from 'react';

export const useVaultTVL = (vaultAddr: Address | undefined) => {
  const {timelockLens} = useLens();

  const {poolManager, poolKey} = useVaultData(vaultAddr);
  const {token0Decimals, token1Decimals} = usePoolData(poolManager, poolKey);

  const {data, refetch} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getVaultTVL',
    args: [vaultAddr!],
    query: {enabled: !!vaultAddr && !!timelockLens},
  });

  return useMemo(() => {
    if (!token0Decimals || !token1Decimals || !data) return {};

    const total0 = wrapAmount(data[0], token0Decimals);
    const total1 = wrapAmount(data[1], token1Decimals);
    const borrowed0 = wrapAmount(data[2], token0Decimals);
    const borrowed1 = wrapAmount(data[3], token1Decimals);
    const tvlAs0 = wrapAmount(data[4], token0Decimals);
    const tvlAs1 = wrapAmount(data[5], token1Decimals);
    const blocksCount = data[6];

    return {
      tvlAs0,
      tvlAs1,
      total0,
      total1,
      borrowed0,
      borrowed1,
      blocksCount,
      refetch,
    };
  }, [data, token0Decimals, token1Decimals, refetch]);
};
