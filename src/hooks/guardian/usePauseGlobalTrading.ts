import type {Address} from 'viem';
import {usePublicClient, useWriteContract} from 'wagmi';
import {useMarketData} from '~/hooks/market/useMarketData';
import {guardianAbi} from '~/abis/guardian';
import {useGuardianGlobalState} from './useGuardianGlobalState';

export const usePauseGlobalTrading = (marketAddr: Address | undefined) => {
  const {guardian} = useMarketData(marketAddr);
  const {data: {globalBurnPaused, globalMintPaused} = {}, refetch} =
    useGuardianGlobalState(guardian);

  const publicClient = usePublicClient();
  const {writeContractAsync, ...rest} = useWriteContract();

  const pauseGlobalTrading = async (paused: boolean) => {
    if (!marketAddr) {
      throw new Error('Market address is required');
    }
    if (!guardian) {
      throw new Error('Could not load guardian address');
    }
    if (!globalMintPaused || !globalBurnPaused) {
      throw new Error('Could not load global mint or burn paused state');
    }
    if (!publicClient) {
      throw new Error('Could not load public client');
    }
    const hash = await writeContractAsync({
      address: guardian,
      abi: guardianAbi,
      functionName: 'pauseGlobal',
      args: [globalMintPaused.paused, globalBurnPaused.paused, paused],
    });
    await publicClient.waitForTransactionReceipt({hash});
    void refetch();

    return hash;
  };
  return {pauseGlobalTrading, ...rest};
};
