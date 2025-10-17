import {encodeFunctionData, erc20Abi, maxUint256, type Address} from 'viem';
import {waitForTransactionReceipt} from 'viem/actions';
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useClient,
  useAccount,
} from 'wagmi';

import {useVaultData} from './useVaultData';
import {useCurrentTick} from '../pool/useCurrentTick';
import {usePoolData} from '../pool/usePoolData';
import {useLens} from '../useLens';

import {getErc20, type UniswapMathLens} from '~/lib/contracts';
import {singleOwnerVaultAbi} from '~/abis/singleOwnerVault';

export const batchGetAmountsFromLiquidity = async (
  lens: UniswapMathLens,
  tickLower: number[],
  tickUpper: number[],
  liquidity: bigint[],
  currentTick: number,
) => {
  const currentTicksArray = new Array(tickLower.length).fill(currentTick);

  const amounts = await lens.read.batchGetAmountsForLiquidityTicks([
    currentTicksArray,
    tickLower,
    tickUpper,
    liquidity,
  ]);

  let totalAmount0 = 0n;
  let totalAmount1 = 0n;

  const amounts0: bigint[] = [];
  const amounts1: bigint[] = [];

  for (const scaled of amounts[0]) {
    totalAmount0 += scaled;
    amounts0.push(scaled);
  }
  for (const scaled of amounts[1]) {
    totalAmount1 += scaled;
    amounts1.push(scaled);
  }
  return {totalAmount0, totalAmount1, amounts0, amounts1};
};

interface MintPositionParams {
  tickLower: number;
  tickUpper: number;
  liquidity: bigint;
}

export const useMintLiquidity = (vaultAddr?: Address) => {
  const client = useClient();
  const {address} = useAccount();
  const {pool} = useVaultData(vaultAddr);
  const {timelockLens, uniswapLens} = useLens();

  const currentTick = useCurrentTick(pool);
  const {token0, token1} = usePoolData(pool);

  const {writeContractAsync, data: hash, isPending, error} = useWriteContract();

  const {isLoading: isConfirming, isSuccess} = useWaitForTransactionReceipt({
    hash,
  });

  const askForApproval = async (params: MintPositionParams[]) => {
    if (!address || !client) throw new Error('Wallet not connected');

    if (
      currentTick.exact === undefined ||
      !token0 ||
      !token1 ||
      !vaultAddr ||
      !uniswapLens
    ) {
      throw new Error('Current tick not available');
    }
    const {totalAmount0, totalAmount1} = await batchGetAmountsFromLiquidity(
      uniswapLens,
      params.map(p => p.tickLower),
      params.map(p => p.tickUpper),
      params.map(p => p.liquidity),
      currentTick.exact,
    );

    const [allowance0, allowance1] = await Promise.all([
      getErc20(token0, client).read.allowance([address, vaultAddr]),
      getErc20(token1, client).read.allowance([address, vaultAddr]),
    ]);
    const approvalPromises = [];

    if (allowance0 <= totalAmount0) {
      const approvalHash = await writeContractAsync({
        address: token0,
        abi: erc20Abi,
        functionName: 'approve',
        args: [vaultAddr, maxUint256],
      });
      approvalPromises.push(
        waitForTransactionReceipt(client, {hash: approvalHash}),
      );
    }
    if (allowance1 <= totalAmount1) {
      const approvalHash1 = await writeContractAsync({
        address: token1,
        abi: erc20Abi,
        functionName: 'approve',
        args: [vaultAddr, maxUint256],
      });
      approvalPromises.push(
        waitForTransactionReceipt(client, {hash: approvalHash1}),
      );
    }
    if (approvalPromises.length > 0) {
      await Promise.all(approvalPromises);
    }
  };

  const mint = async (
    tickLower: number,
    tickUpper: number,
    liquidity: bigint,
  ) => {
    if (!client) throw new Error('Wallet not connected');

    if (!vaultAddr || !timelockLens) {
      throw new Error('Vault/lens not available');
    }
    await askForApproval([{tickLower, tickUpper, liquidity}]);
    const refTick = await timelockLens.read.getRefTick([vaultAddr, tickLower]);

    const hash = await writeContractAsync({
      address: vaultAddr,
      abi: singleOwnerVaultAbi,
      functionName: 'mint',
      args: [tickLower, tickUpper, liquidity, refTick],
    });
    await waitForTransactionReceipt(client, {hash});
    return hash;
  };

  const mintMultiple = async (positions: MintPositionParams[]) => {
    if (!client) throw new Error('Wallet not connected');
    if (!currentTick.exact) {
      throw new Error('Current tick not available');
    }
    if (positions.length === 0) {
      throw new Error('No positions to mint');
    }
    if (!timelockLens || !vaultAddr) {
      throw new Error('Vault/lens not available');
    }
    if (positions.length === 1) {
      await mint(
        positions[0].tickLower,
        positions[0].tickUpper,
        positions[0].liquidity,
      );
    } else {
      await askForApproval(positions);

      const refTicks = await timelockLens.read.batchGetRefTick([
        vaultAddr,
        positions.map(position => position.tickLower),
      ]);
      const multicallData = positions.map((p, i) =>
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
    }
  };

  return {
    mintMultiple,
    mint,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
    isLoading: isPending || isConfirming,
  };
};
