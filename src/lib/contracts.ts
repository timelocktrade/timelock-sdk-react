import type {Address, Client, PublicClient, GetContractReturnType} from 'viem';
import {getContract} from 'viem';
import {monadTestnet} from 'viem/chains';

import {erc20Abi} from '~/abis/erc20';
import {lensAbi} from '~/abis/lens';
import {uniswapMathLensAbi} from '~/abis/uniswapMathLens';
import {optionsMarketAbi} from '~/abis/optionsMarket';

export type TimelockMarket = GetContractReturnType<
  typeof optionsMarketAbi,
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

export type TimelockMarketData = Awaited<
  ReturnType<TimelockLens['read']['getMarketData']>
> & {address: Address};

export const getErc20 = (address: Address, client: Client) =>
  getContract({abi: erc20Abi, address, client});

export const getTimelockMarket = (
  address: Address,
  client: Client,
): TimelockMarket => {
  return getContract({abi: optionsMarketAbi, address, client});
};

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

export const swappers: Record<number, Address> = {
  [monadTestnet.id]: '0x877309663591ad974bE2c0C7fB453844c8D613D8',
};
export const timelockLenses: Record<number, Address> = {
  [monadTestnet.id]: '0xB637ED73B07e7fB656CD286d53b7957a64788C03',
};
export const uniswapMathLenses: Record<number, Address> = {
  [monadTestnet.id]: '0x4C8375D1F6D5F452e92e211C1D3E7a44F78dFc95',
};
