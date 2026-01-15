import type {Address} from 'viem';
import {useTokenBalance} from '../tokens/useTokenBalance';

export const useCollectedPremium = (
  vault: Address | undefined,
  payoutAsset: Address | undefined,
) => {
  return useTokenBalance(payoutAsset, vault);
};
