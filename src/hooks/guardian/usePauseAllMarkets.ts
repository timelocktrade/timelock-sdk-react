import type {Address} from 'viem';
import {usePublicClient, useWriteContract} from 'wagmi';
import {useGlobalGuardianState} from './useGlobalGuardianState';
import {guardianAbi} from '~/abis/guardian';

export const usePauseAllMarkets = (guardianAddr: Address | undefined) => {
  const {data: {globalBurnPaused, globalMintPaused} = {}, refetch} =
    useGlobalGuardianState(guardianAddr);

  const publicClient = usePublicClient();
  const {mutateAsync, ...rest} = useWriteContract();

  const pauseAllMarkets = async (paused: boolean) => {
    if (!guardianAddr) {
      throw new Error('Could not load guardian address');
    }
    if (!globalMintPaused || !globalBurnPaused) {
      throw new Error('Could not load global mint or burn paused state');
    }
    if (!publicClient) {
      throw new Error('Could not load public client');
    }
    const hash = await mutateAsync({
      address: guardianAddr,
      abi: guardianAbi,
      functionName: 'pauseGlobal',
      args: [globalMintPaused.paused, globalBurnPaused.paused, paused],
    });
    await publicClient.waitForTransactionReceipt({hash});
    void refetch();

    return hash;
  };
  return {pauseAllMarkets, ...rest};
};
