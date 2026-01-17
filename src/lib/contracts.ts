import type {Address, Client, PublicClient, GetContractReturnType} from 'viem';
import {erc20Abi, getContract} from 'viem';
import {baseSepolia} from 'viem/chains';

import {lensAbi} from '~/abis/lens';
import {optionsMarketAbi} from '~/abis/optionsMarket';
import {quoterAbi} from '~/abis/quoterV4';
import {stateViewAbi} from '~/abis/stateView';

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

export const getStateView = async (client: PublicClient, address?: Address) => {
  if (!address) {
    const chainId = await client.getChainId();
    address = stateViews[chainId];
    if (!address) throw new Error(`No state view found for ${chainId}`);
  }
  return getContract({abi: stateViewAbi, address, client});
};

export const getQuoter = async (client: PublicClient, address?: Address) => {
  if (!address) {
    const chainId = await client.getChainId();
    address = quoters[chainId];
    if (!address) throw new Error(`No quoter found for ${chainId}`);
  }
  return getContract({abi: quoterAbi, address, client});
};

export const getTimelockLens = async (
  client: PublicClient,
  address?: Address,
) => {
  if (!address) {
    const chainId = await client.getChainId();
    address = timelockLenses[chainId];
    if (!address) throw new Error(`No timelock lens found for ${chainId}`);
  }
  return getContract({abi: lensAbi, address, client});
};

export const swappers: Record<number, Address> = {
  [baseSepolia.id]: '0xBFbC719F902B27A8E29da42Fa2214710Db9Fab17',
};
export const timelockLenses: Record<number, Address> = {
  [baseSepolia.id]: '0x9C6E5BeAe9549219056bb79dbe1B32E1BE9965D8',
};
export const timelockFactories: Record<number, Address> = {
  [baseSepolia.id]: '0x07e4E1829794745b03476CC9401de8dbC862899a',
};
export const swapRouters: Record<number, Address> = {
  [baseSepolia.id]: '0x1a005FE3C05F076983F0d66a5F80CB9C61561a5b',
};
export const stateViews: Record<number, Address> = {
  [baseSepolia.id]: '0x06AF24d39b8cb2100958EAAF279707Bec11160C8',
};
export const quoters: Record<number, Address> = {
  [baseSepolia.id]: '0xD478003Dd94A76F3dC6D09412f5C60D2e060B49A',
};
