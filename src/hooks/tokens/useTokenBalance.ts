import type {Address} from 'viem';
import {useReadContract} from 'wagmi';
import {useMemo} from 'react';
import {useTokenData} from './useTokenData';
import {wrapAmount} from '~/lib/numberUtils';
import {erc20Abi} from '~/abis/erc20';

export const useTokenBalance = (token?: Address, user?: Address) => {
  const {decimals} = useTokenData(token);

  const {data: raw, ...rest} = useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: user ? [user] : undefined,
    query: {enabled: !!token && !!user},
  });
  const balance = useMemo(
    () =>
      raw !== undefined && decimals !== undefined
        ? wrapAmount(raw, decimals)
        : undefined,
    [raw, decimals],
  );

  return {data: balance, ...rest};
};
