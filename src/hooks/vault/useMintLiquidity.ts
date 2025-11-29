import {encodeFunctionData, type Address} from 'viem';
import {waitForTransactionReceipt} from 'viem/actions';
import {useWriteContract, useClient} from 'wagmi';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {useVaultData} from './useVaultData';
import {useCurrentTick} from '~/hooks/pool/useCurrentTick';
import {usePoolData} from '~/hooks/pool/usePoolData';
import {useApproval} from '~/hooks/tokens/useApproval';
import {useLens} from '~/hooks/useLens';

import {getAmountsFromLiquidity} from '~/lib/liquidityUtils';
import {singleOwnerVaultAbi} from '~/abis/singleOwnerVault';

export const batchGetAmountsFromLiquidity = (
  tickLowers: number[],
  tickUppers: number[],
  liquidities: bigint[],
  currentTick: number,
) => {
  let totalAmount0 = 0n;
  let totalAmount1 = 0n;

  const amounts0: bigint[] = [];
  const amounts1: bigint[] = [];

  for (const [i, tickLower] of tickLowers.entries()) {
    const [amount0, amount1] = getAmountsFromLiquidity(
      tickLower,
      tickUppers[i],
      liquidities[i],
      currentTick,
    );
    totalAmount0 += amount0;
    totalAmount1 += amount1;
    amounts0.push(amount0);
    amounts1.push(amount1);
  }
  return {totalAmount0, totalAmount1, amounts0, amounts1};
};

interface MintPositionParams {
  tickLower: number;
  tickUpper: number;
  liquidity: bigint;
}

export const useMintLiquidity = (vaultAddr: Address | undefined) => {
  const queryClient = useQueryClient();
  const client = useClient();
  const {poolManager, poolKey} = useVaultData(vaultAddr);
  const {timelockLens} = useLens();

  const {data: {currentTick} = {}} = useCurrentTick(poolManager, poolKey);
  const {token0, token1} = usePoolData(poolManager, poolKey);

  const {askForApproval} = useApproval();
  const {writeContractAsync} = useWriteContract();

  const processApproval = async (params: MintPositionParams[]) => {
    if (currentTick === undefined || !token0 || !token1 || !vaultAddr) {
      throw new Error('Current tick not available');
    }
    const {totalAmount0, totalAmount1} = batchGetAmountsFromLiquidity(
      params.map(p => p.tickLower),
      params.map(p => p.tickUpper),
      params.map(p => p.liquidity),
      currentTick,
    );
    await askForApproval(token0, vaultAddr, totalAmount0);
    await askForApproval(token1, vaultAddr, totalAmount1);
  };

  return useMutation({
    mutationFn: async (params: MintPositionParams | MintPositionParams[]) => {
      if (!client) throw new Error('Wallet not connected');
      if (currentTick === undefined) {
        throw new Error('Current tick not available');
      }
      if (!timelockLens || !vaultAddr) {
        throw new Error('Vault/lens not available');
      }
      if (!Array.isArray(params)) {
        params = [params];
      }
      if (params.length === 0) {
        throw new Error('No positions to mint');
      }
      await processApproval(params);

      const refTicks = await timelockLens.read.batchGetRefTick([
        vaultAddr,
        params.map(position => position.tickLower),
      ]);
      const multicallData = params.map((p, i) =>
        encodeFunctionData({
          abi: singleOwnerVaultAbi,
          functionName: 'mint',
          args: [p.tickLower, p.tickUpper, p.liquidity, refTicks[i]],
        }),
      );
      const hash = await writeContractAsync({
        address: vaultAddr,
        abi: singleOwnerVaultAbi,
        functionName: 'multicall',
        args: [multicallData],
      });
      await waitForTransactionReceipt(client, {hash});
      void queryClient.invalidateQueries({queryKey: ['readContract']});
    },
  });
};
