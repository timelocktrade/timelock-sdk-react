export const statelessStateViewAbi = [
  {
    type: 'function',
    name: 'getFeeGrowthGlobals',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          {name: 'fee', type: 'uint24', internalType: 'uint24'},
          {name: 'tickSpacing', type: 'int24', internalType: 'int24'},
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
    ],
    outputs: [
      {
        name: 'feeGrowthGlobal0',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'feeGrowthGlobal1',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getFeeGrowthGlobals',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {name: 'poolId', type: 'bytes32', internalType: 'PoolId'},
    ],
    outputs: [
      {
        name: 'feeGrowthGlobal0',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'feeGrowthGlobal1',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getFeeGrowthInside',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {name: 'poolId', type: 'bytes32', internalType: 'PoolId'},
      {name: 'tickLower', type: 'int24', internalType: 'int24'},
      {name: 'tickUpper', type: 'int24', internalType: 'int24'},
    ],
    outputs: [
      {
        name: 'feeGrowthInside0X128',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'feeGrowthInside1X128',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getFeeGrowthInside',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          {name: 'fee', type: 'uint24', internalType: 'uint24'},
          {name: 'tickSpacing', type: 'int24', internalType: 'int24'},
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      {name: 'tickLower', type: 'int24', internalType: 'int24'},
      {name: 'tickUpper', type: 'int24', internalType: 'int24'},
    ],
    outputs: [
      {
        name: 'feeGrowthInside0X128',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'feeGrowthInside1X128',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getLiquidity',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {name: 'poolId', type: 'bytes32', internalType: 'PoolId'},
    ],
    outputs: [{name: 'liquidity', type: 'uint128', internalType: 'uint128'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getLiquidity',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          {name: 'fee', type: 'uint24', internalType: 'uint24'},
          {name: 'tickSpacing', type: 'int24', internalType: 'int24'},
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
    ],
    outputs: [{name: 'liquidity', type: 'uint128', internalType: 'uint128'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPositionInfo',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          {name: 'fee', type: 'uint24', internalType: 'uint24'},
          {name: 'tickSpacing', type: 'int24', internalType: 'int24'},
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      {name: 'positionId', type: 'bytes32', internalType: 'bytes32'},
    ],
    outputs: [
      {name: 'liquidity', type: 'uint128', internalType: 'uint128'},
      {
        name: 'feeGrowthInside0LastX128',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'feeGrowthInside1LastX128',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPositionInfo',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {name: 'poolId', type: 'bytes32', internalType: 'PoolId'},
      {name: 'positionId', type: 'bytes32', internalType: 'bytes32'},
    ],
    outputs: [
      {name: 'liquidity', type: 'uint128', internalType: 'uint128'},
      {
        name: 'feeGrowthInside0LastX128',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'feeGrowthInside1LastX128',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPositionInfo',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {name: 'poolId', type: 'bytes32', internalType: 'PoolId'},
      {name: 'owner', type: 'address', internalType: 'address'},
      {name: 'tickLower', type: 'int24', internalType: 'int24'},
      {name: 'tickUpper', type: 'int24', internalType: 'int24'},
      {name: 'salt', type: 'bytes32', internalType: 'bytes32'},
    ],
    outputs: [
      {name: 'liquidity', type: 'uint128', internalType: 'uint128'},
      {
        name: 'feeGrowthInside0LastX128',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'feeGrowthInside1LastX128',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPositionInfo',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          {name: 'fee', type: 'uint24', internalType: 'uint24'},
          {name: 'tickSpacing', type: 'int24', internalType: 'int24'},
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      {name: 'owner', type: 'address', internalType: 'address'},
      {name: 'tickLower', type: 'int24', internalType: 'int24'},
      {name: 'tickUpper', type: 'int24', internalType: 'int24'},
      {name: 'salt', type: 'bytes32', internalType: 'bytes32'},
    ],
    outputs: [
      {name: 'liquidity', type: 'uint128', internalType: 'uint128'},
      {
        name: 'feeGrowthInside0LastX128',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'feeGrowthInside1LastX128',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPositionLiquidity',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {name: 'poolId', type: 'bytes32', internalType: 'PoolId'},
      {name: 'positionId', type: 'bytes32', internalType: 'bytes32'},
    ],
    outputs: [{name: 'liquidity', type: 'uint128', internalType: 'uint128'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPositionLiquidity',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          {name: 'fee', type: 'uint24', internalType: 'uint24'},
          {name: 'tickSpacing', type: 'int24', internalType: 'int24'},
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      {name: 'positionId', type: 'bytes32', internalType: 'bytes32'},
    ],
    outputs: [{name: 'liquidity', type: 'uint128', internalType: 'uint128'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getSlot0',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          {name: 'fee', type: 'uint24', internalType: 'uint24'},
          {name: 'tickSpacing', type: 'int24', internalType: 'int24'},
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
    ],
    outputs: [
      {
        name: 'sqrtPriceX96',
        type: 'uint160',
        internalType: 'uint160',
      },
      {name: 'tick', type: 'int24', internalType: 'int24'},
      {name: 'protocolFee', type: 'uint24', internalType: 'uint24'},
      {name: 'lpFee', type: 'uint24', internalType: 'uint24'},
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getSlot0FromId',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {name: 'poolId', type: 'bytes32', internalType: 'PoolId'},
    ],
    outputs: [
      {
        name: 'sqrtPriceX96',
        type: 'uint160',
        internalType: 'uint160',
      },
      {name: 'tick', type: 'int24', internalType: 'int24'},
      {name: 'protocolFee', type: 'uint24', internalType: 'uint24'},
      {name: 'lpFee', type: 'uint24', internalType: 'uint24'},
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTickBitmap',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          {name: 'fee', type: 'uint24', internalType: 'uint24'},
          {name: 'tickSpacing', type: 'int24', internalType: 'int24'},
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      {name: 'tick', type: 'int16', internalType: 'int16'},
    ],
    outputs: [{name: 'tickBitmap', type: 'uint256', internalType: 'uint256'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTickBitmap',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {name: 'poolId', type: 'bytes32', internalType: 'PoolId'},
      {name: 'tick', type: 'int16', internalType: 'int16'},
    ],
    outputs: [{name: 'tickBitmap', type: 'uint256', internalType: 'uint256'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTickFeeGrowthOutside',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          {name: 'fee', type: 'uint24', internalType: 'uint24'},
          {name: 'tickSpacing', type: 'int24', internalType: 'int24'},
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      {name: 'tick', type: 'int24', internalType: 'int24'},
    ],
    outputs: [
      {
        name: 'feeGrowthOutside0X128',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'feeGrowthOutside1X128',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTickFeeGrowthOutside',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {name: 'poolId', type: 'bytes32', internalType: 'PoolId'},
      {name: 'tick', type: 'int24', internalType: 'int24'},
    ],
    outputs: [
      {
        name: 'feeGrowthOutside0X128',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'feeGrowthOutside1X128',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTickInfo',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {name: 'poolId', type: 'bytes32', internalType: 'PoolId'},
      {name: 'tick', type: 'int24', internalType: 'int24'},
    ],
    outputs: [
      {
        name: 'liquidityGross',
        type: 'uint128',
        internalType: 'uint128',
      },
      {name: 'liquidityNet', type: 'int128', internalType: 'int128'},
      {
        name: 'feeGrowthOutside0X128',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'feeGrowthOutside1X128',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTickInfo',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          {name: 'fee', type: 'uint24', internalType: 'uint24'},
          {name: 'tickSpacing', type: 'int24', internalType: 'int24'},
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      {name: 'tick', type: 'int24', internalType: 'int24'},
    ],
    outputs: [
      {
        name: 'liquidityGross',
        type: 'uint128',
        internalType: 'uint128',
      },
      {name: 'liquidityNet', type: 'int128', internalType: 'int128'},
      {
        name: 'feeGrowthOutside0X128',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'feeGrowthOutside1X128',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTickLiquidity',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          {name: 'fee', type: 'uint24', internalType: 'uint24'},
          {name: 'tickSpacing', type: 'int24', internalType: 'int24'},
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      {name: 'tick', type: 'int24', internalType: 'int24'},
    ],
    outputs: [
      {
        name: 'liquidityGross',
        type: 'uint128',
        internalType: 'uint128',
      },
      {name: 'liquidityNet', type: 'int128', internalType: 'int128'},
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTickLiquidity',
    inputs: [
      {
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {name: 'poolId', type: 'bytes32', internalType: 'PoolId'},
      {name: 'tick', type: 'int24', internalType: 'int24'},
    ],
    outputs: [
      {
        name: 'liquidityGross',
        type: 'uint128',
        internalType: 'uint128',
      },
      {name: 'liquidityNet', type: 'int128', internalType: 'int128'},
    ],
    stateMutability: 'view',
  },
] as const;
