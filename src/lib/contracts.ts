import type {Address, Client, PublicClient, GetContractReturnType} from 'viem';
import {getContract} from 'viem';
import {monadTestnet, unichainSepolia} from 'viem/chains';

import {erc20Abi} from '~/abis/erc20';
import {lensAbi} from '~/abis/lens';
import {optionsMarketAbi} from '~/abis/optionsMarket';
import {statelessStateViewAbi} from '~/abis/statelessStateView';

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
  return getContract({abi: statelessStateViewAbi, address, client});
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
  [monadTestnet.id]: '0x877309663591ad974bE2c0C7fB453844c8D613D8',
  [unichainSepolia.id]: '0xa145eb0CAdB5F3c5e42931e60ee609DE74FDEA0b',
};
export const timelockLenses: Record<number, Address> = {
  [monadTestnet.id]: '0x22745deD5F51A2F33D98c5682048f5d10baE3b92',
  [unichainSepolia.id]: '0xDA4E5a75d5c867B6eB777006f37d0Bb07000Fd35',
};
export const timelockFactories: Record<number, Address> = {
  [unichainSepolia.id]: '0x8790e55d165591C082D3CBb811b36c9C893530DF',
};
export const swapRouters: Record<number, Address> = {
  [monadTestnet.id]: '0xEd8a7Ca09c6Db6F4b9FAcB8De7e9A5449B1D21a4',
  [unichainSepolia.id]: '0x7C9fBd739cb0e09657B7c6aB4eFc37bEe80820B0',
};
export const stateViews: Record<number, Address> = {
  [monadTestnet.id]: '0xB85e32Ff9b08Be61cD888e5D997E51951BCA1A69',
  [unichainSepolia.id]: '0x1B69d7338F027deB8Cc78a4085BC7087B251C049',
};
