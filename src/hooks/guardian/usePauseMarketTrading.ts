import type {Address} from 'viem';
import {useWriteContract} from 'wagmi';
import {useMarketData} from '~/hooks/market/useMarketData';
import {guardianAbi} from '~/abis/guardian';

export const usePauseMarketTrading = (marketAddr: Address | undefined) => {
  const {guardian} = useMarketData(marketAddr);
  const {writeContractAsync, ...rest} = useWriteContract();

  const pauseMarketTrading = async (paused: boolean) => {
    if (!marketAddr) {
      throw new Error('Market address is required');
    }
    if (!guardian) {
      throw new Error('Could not load guardian address');
    }
    return await writeContractAsync({
      address: guardian,
      abi: guardianAbi,
      functionName: 'pauseMarket',
      args: [marketAddr, paused],
    });
  };
  return {pauseMarketTrading, ...rest};
};
