import {encodeAbiParameters, keccak256} from 'viem';
import type {PoolKey} from './liquidityUtils';

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const getPoolId = (poolKey: PoolKey) => {
  return keccak256(
    encodeAbiParameters(
      [
        {type: 'address', name: 'currency0'},
        {type: 'address', name: 'currency1'},
        {type: 'uint24', name: 'fee'},
        {type: 'int24', name: 'tickSpacing'},
        {type: 'address', name: 'hooks'},
      ],
      [
        poolKey.currency0,
        poolKey.currency1,
        poolKey.fee,
        poolKey.tickSpacing,
        poolKey.hooks,
      ],
    ),
  );
};
