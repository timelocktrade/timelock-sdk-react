import type {NonUndefinedGuard} from '@tanstack/react-query';
import type {Address} from 'viem';
import {useReadContract} from 'wagmi';
import {useLens} from '~/hooks/useLens';
import {lensAbi} from '~/abis/lens';

export const useStaticPricingParams = (pricingAddr: Address | undefined) => {
  const {timelockLens} = useLens();

  const {data} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    args: pricingAddr ? [pricingAddr] : undefined,
    functionName: 'getStaticPricingParams',
  });
  return (data || {}) as Partial<NonUndefinedGuard<typeof data>>;
};
