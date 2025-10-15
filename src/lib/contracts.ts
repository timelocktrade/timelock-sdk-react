import {type Address, type Client, getContract, type PublicClient} from 'viem';
import {monadTestnet} from 'viem/chains';

import {erc20Abi} from '../abis/erc20';
import {swapRouterAbi} from '../abis/swapRouter';
import {uniswapV3PoolAbi} from '../abis/uniswapV3Pool';
import {uniswapMathLensAbi} from '../abis/uniswapMathLens';
import {lensAbi} from '../abis/lens';
import {singleOwnerVaultAbi} from '../abis/singleOwnerVault';
import {optionsMarketAbi} from '../abis/optionsMarket';

export type UniswapPool = ReturnType<typeof getUniswapPool>;
export type TimelockMarket = ReturnType<typeof getTimelockMarket>;
export type TimelockVault = ReturnType<typeof getTimelockVault>;
export type TimelockLens = ReturnType<typeof getTimelockLens>;
export type UniswapMathLens = ReturnType<typeof getUniswapMathLens>;
export type SwapRouter = ReturnType<typeof getSwapRouter>;

export const getErc20 = (address: Address, client: Client) =>
  getContract({abi: erc20Abi, address, client});

export const getTimelockVault = (address: Address, client: Client) =>
  getContract({
    abi: singleOwnerVaultAbi,
    address,
    client,
  });

export const getTimelockMarket = (address: Address, client: Client) =>
  getContract({abi: optionsMarketAbi, address, client});

export const getUniswapPool = (address: Address, client: Client) =>
  getContract({abi: uniswapV3PoolAbi, address, client});

export const getUniswapMathLens = (client: Client | PublicClient) =>
  getContract({
    abi: uniswapMathLensAbi,
    address: uniswapMathLenses[client.chain!.id],
    client,
  });

export const getTimelockLens = (client: Client | PublicClient) =>
  getContract({
    abi: lensAbi,
    address: timelockLenses[client.chain!.id],
    client,
  });

export const getSwapRouter = (client: Client | PublicClient) =>
  getContract({
    abi: swapRouterAbi,
    address: swapRouters[client.chain!.id],
    client,
  });

export const timelockLenses: Record<number, Address> = {
  [monadTestnet.id]: '0x10a07a928fFf99EC08a61617816Aaf71dA8098aB',
};
export const uniswapMathLenses: Record<number, Address> = {
  [monadTestnet.id]: '0x4C8375D1F6D5F452e92e211C1D3E7a44F78dFc95',
};
export const swapRouters: Record<number, Address> = {
  [monadTestnet.id]: '0x',
};
