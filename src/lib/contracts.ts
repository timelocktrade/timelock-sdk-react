import {
  type Address,
  type Client,
  getContract,
  type PublicClient,
  type GetContractReturnType,
} from 'viem';
import {monadTestnet} from 'viem/chains';

import {erc20Abi} from '../abis/erc20';
import {uniswapV3PoolAbi} from '../abis/uniswapV3Pool';
import {uniswapMathLensAbi} from '../abis/uniswapMathLens';
import {lensAbi} from '../abis/lens';
import {singleOwnerVaultAbi} from '../abis/singleOwnerVault';
import {optionsMarketAbi} from '../abis/optionsMarket';

export type UniswapPool = GetContractReturnType<
  typeof uniswapV3PoolAbi,
  Client,
  Address
>;
export type TimelockMarket = GetContractReturnType<
  typeof optionsMarketAbi,
  Client,
  Address
>;
export type TimelockVault = GetContractReturnType<
  typeof singleOwnerVaultAbi,
  Client,
  Address
>;
export type TimelockLens = GetContractReturnType<
  typeof lensAbi,
  Client,
  Address
>;
export type UniswapMathLens = GetContractReturnType<
  typeof uniswapMathLensAbi,
  Client,
  Address
>;

export const getErc20 = (address: Address, client: Client) =>
  getContract({abi: erc20Abi, address, client});

export const getTimelockVault = (
  address: Address,
  client: Client,
): TimelockVault => {
  return getContract({
    abi: singleOwnerVaultAbi,
    address,
    client,
  });
};

export const getTimelockMarket = (
  address: Address,
  client: Client,
): TimelockMarket => {
  return getContract({abi: optionsMarketAbi, address, client});
};

export const getUniswapPool = (
  address: Address,
  client: Client,
): UniswapPool => {
  return getContract({abi: uniswapV3PoolAbi, address, client});
};

export const getUniswapMathLens = (client: Client | PublicClient) =>
  getContract({
    abi: uniswapMathLensAbi,
    address: uniswapMathLenses[client.chain!.id],
    client,
  });

export type TimelockMarketData = Awaited<
  ReturnType<ReturnType<typeof getTimelockLens>['read']['getMarketData']>
> & {address: Address};

export const getTimelockLens = (client: Client | PublicClient) =>
  getContract({
    abi: lensAbi,
    address: timelockLenses[client.chain!.id],
    client,
  });

export const timelockLenses: Record<number, Address> = {
  [monadTestnet.id]: '0x97558b2ccb55F88118989BC19FCEa7AFa13F71b9',
};
export const uniswapMathLenses: Record<number, Address> = {
  [monadTestnet.id]: '0x4C8375D1F6D5F452e92e211C1D3E7a44F78dFc95',
};
