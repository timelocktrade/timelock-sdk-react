export const lensAbi = [
  {
    type: 'function',
    name: 'batchGetRefTick',
    inputs: [
      {
        name: 'vault',
        type: 'address',
        internalType: 'contract TimelockSingleOwnerVault',
      },
      {name: 'tickLower', type: 'int24[]', internalType: 'int24[]'},
    ],
    outputs: [{name: 'refTicks', type: 'int24[]', internalType: 'int24[]'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAllBlocks',
    inputs: [
      {
        name: 'vault',
        type: 'address',
        internalType: 'contract TimelockVaultCore',
      },
    ],
    outputs: [
      {
        name: 'blocks',
        type: 'tuple[]',
        internalType: 'struct TimelockLens.LiquidityBlockData[]',
        components: [
          {name: 'tickLower', type: 'int24', internalType: 'int24'},
          {name: 'tickUpper', type: 'int24', internalType: 'int24'},
          {
            name: 'prevTickLower',
            type: 'int24',
            internalType: 'int24',
          },
          {
            name: 'totalLiquidity',
            type: 'uint128',
            internalType: 'uint128',
          },
          {
            name: 'borrowedLiquidity',
            type: 'uint128',
            internalType: 'uint128',
          },
          {
            name: 'totalAmount0',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'totalAmount1',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'borrowedAmount0',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'borrowedAmount1',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getExpiredOptions',
    inputs: [
      {
        name: 'market',
        type: 'address',
        internalType: 'contract TimelockOptionsMarket',
      },
      {name: 'startId', type: 'uint256', internalType: 'uint256'},
      {name: 'limit', type: 'uint256', internalType: 'uint256'},
    ],
    outputs: [
      {
        name: 'expiredOptions',
        type: 'tuple[]',
        internalType: 'struct TimelockLens.OptionData[]',
        components: [
          {
            name: 'optionId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {name: 'owner', type: 'address', internalType: 'address'},
          {name: 'optionType', type: 'uint8', internalType: 'uint8'},
          {name: 'startTick', type: 'int24', internalType: 'int24'},
          {name: 'strikeTick', type: 'int24', internalType: 'int24'},
          {
            name: 'strikePrice',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'positionSize',
            type: 'uint256',
            internalType: 'uint256',
          },
          {name: 'expiresAt', type: 'uint32', internalType: 'uint32'},
          {
            name: 'liquidities',
            type: 'uint128[]',
            internalType: 'uint128[]',
          },
        ],
      },
      {name: 'nextStartId', type: 'uint256', internalType: 'uint256'},
      {name: 'hasMore', type: 'bool', internalType: 'bool'},
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getLiquidityAtTick',
    inputs: [
      {
        name: 'vault',
        type: 'address',
        internalType: 'contract TimelockSingleOwnerVault',
      },
      {name: 'tickLower', type: 'int24', internalType: 'int24'},
    ],
    outputs: [
      {
        name: 'totalLiquidity',
        type: 'uint128',
        internalType: 'uint128',
      },
      {
        name: 'borrowedLiquidity',
        type: 'uint128',
        internalType: 'uint128',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getMarketData',
    inputs: [
      {
        name: 'market',
        type: 'address',
        internalType: 'contract TimelockOptionsMarket',
      },
    ],
    outputs: [
      {
        name: 'marketData',
        type: 'tuple',
        internalType: 'struct TimelockLens.TimelockMarketData',
        components: [
          {
            name: 'optionAssetIsToken0',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'vault',
            type: 'address',
            internalType: 'contract ITimelockVault',
          },
          {
            name: 'pool',
            type: 'address',
            internalType: 'contract IUniswapV3Pool',
          },
          {
            name: 'optionAsset',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'payoutAsset',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'optionAssetDecimals',
            type: 'uint8',
            internalType: 'uint8',
          },
          {
            name: 'payoutAssetDecimals',
            type: 'uint8',
            internalType: 'uint8',
          },
          {
            name: 'optionAssetSymbol',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'payoutAssetSymbol',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'optionAssetName',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'payoutAssetName',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'optionsCount',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getMaxATMSizes',
    inputs: [
      {
        name: 'market',
        type: 'address',
        internalType: 'contract TimelockOptionsMarket',
      },
      {name: 'maxRange', type: 'int24', internalType: 'int24'},
    ],
    outputs: [
      {name: 'maxCallSize', type: 'uint256', internalType: 'uint256'},
      {name: 'maxPutSize', type: 'uint256', internalType: 'uint256'},
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getMaxBorrowable0',
    inputs: [
      {
        name: 'vault',
        type: 'address',
        internalType: 'contract TimelockSingleOwnerVault',
      },
      {name: 'strikeTick', type: 'int24', internalType: 'int24'},
      {name: 'maxRange', type: 'int24', internalType: 'int24'},
    ],
    outputs: [{name: 'borrowable0', type: 'uint256', internalType: 'uint256'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getMaxBorrowable1',
    inputs: [
      {
        name: 'vault',
        type: 'address',
        internalType: 'contract TimelockSingleOwnerVault',
      },
      {name: 'strikeTick', type: 'int24', internalType: 'int24'},
      {name: 'maxRange', type: 'int24', internalType: 'int24'},
    ],
    outputs: [{name: 'borrowable1', type: 'uint256', internalType: 'uint256'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getOptionData',
    inputs: [
      {
        name: 'market',
        type: 'address',
        internalType: 'contract TimelockOptionsMarket',
      },
      {name: 'optionId', type: 'uint256', internalType: 'uint256'},
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct TimelockLens.OptionData',
        components: [
          {
            name: 'optionId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {name: 'owner', type: 'address', internalType: 'address'},
          {name: 'optionType', type: 'uint8', internalType: 'uint8'},
          {name: 'startTick', type: 'int24', internalType: 'int24'},
          {name: 'strikeTick', type: 'int24', internalType: 'int24'},
          {
            name: 'strikePrice',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'positionSize',
            type: 'uint256',
            internalType: 'uint256',
          },
          {name: 'expiresAt', type: 'uint32', internalType: 'uint32'},
          {
            name: 'liquidities',
            type: 'uint128[]',
            internalType: 'uint128[]',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getOptionsData',
    inputs: [
      {
        name: 'market',
        type: 'address',
        internalType: 'contract TimelockOptionsMarket',
      },
      {
        name: 'optionIds',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    outputs: [
      {
        name: 'optionsData',
        type: 'tuple[]',
        internalType: 'struct TimelockLens.OptionData[]',
        components: [
          {
            name: 'optionId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {name: 'owner', type: 'address', internalType: 'address'},
          {name: 'optionType', type: 'uint8', internalType: 'uint8'},
          {name: 'startTick', type: 'int24', internalType: 'int24'},
          {name: 'strikeTick', type: 'int24', internalType: 'int24'},
          {
            name: 'strikePrice',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'positionSize',
            type: 'uint256',
            internalType: 'uint256',
          },
          {name: 'expiresAt', type: 'uint32', internalType: 'uint32'},
          {
            name: 'liquidities',
            type: 'uint128[]',
            internalType: 'uint128[]',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPoolData',
    inputs: [
      {
        name: 'pool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool',
      },
    ],
    outputs: [
      {
        name: 'poolData',
        type: 'tuple',
        internalType: 'struct TimelockLens.UniswapPoolData',
        components: [
          {name: 'token0', type: 'address', internalType: 'address'},
          {name: 'token1', type: 'address', internalType: 'address'},
          {
            name: 'token0Decimals',
            type: 'uint8',
            internalType: 'uint8',
          },
          {
            name: 'token1Decimals',
            type: 'uint8',
            internalType: 'uint8',
          },
          {
            name: 'token0Symbol',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'token1Symbol',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'token0Name',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'token1Name',
            type: 'string',
            internalType: 'string',
          },
          {name: 'tickSpacing', type: 'int24', internalType: 'int24'},
          {name: 'fee', type: 'uint24', internalType: 'uint24'},
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRefTick',
    inputs: [
      {
        name: 'vault',
        type: 'address',
        internalType: 'contract TimelockSingleOwnerVault',
      },
      {name: 'tickLower', type: 'int24', internalType: 'int24'},
    ],
    outputs: [{name: 'refTick', type: 'int24', internalType: 'int24'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTokenData',
    inputs: [{name: 'token', type: 'address', internalType: 'address'}],
    outputs: [
      {
        name: 'tokenData',
        type: 'tuple',
        internalType: 'struct TimelockLens.TokenData',
        components: [
          {name: 'decimals', type: 'uint8', internalType: 'uint8'},
          {name: 'symbol', type: 'string', internalType: 'string'},
          {name: 'name', type: 'string', internalType: 'string'},
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getUserOptions',
    inputs: [
      {
        name: 'market',
        type: 'address',
        internalType: 'contract TimelockOptionsMarket',
      },
      {name: 'user', type: 'address', internalType: 'address'},
      {name: 'startId', type: 'uint256', internalType: 'uint256'},
      {name: 'limit', type: 'uint256', internalType: 'uint256'},
    ],
    outputs: [
      {
        name: 'userOptions',
        type: 'tuple[]',
        internalType: 'struct TimelockLens.OptionData[]',
        components: [
          {
            name: 'optionId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {name: 'owner', type: 'address', internalType: 'address'},
          {name: 'optionType', type: 'uint8', internalType: 'uint8'},
          {name: 'startTick', type: 'int24', internalType: 'int24'},
          {name: 'strikeTick', type: 'int24', internalType: 'int24'},
          {
            name: 'strikePrice',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'positionSize',
            type: 'uint256',
            internalType: 'uint256',
          },
          {name: 'expiresAt', type: 'uint32', internalType: 'uint32'},
          {
            name: 'liquidities',
            type: 'uint128[]',
            internalType: 'uint128[]',
          },
        ],
      },
      {name: 'nextStartId', type: 'uint256', internalType: 'uint256'},
      {name: 'hasMore', type: 'bool', internalType: 'bool'},
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getVaultTVL',
    inputs: [
      {
        name: 'vault',
        type: 'address',
        internalType: 'contract TimelockVaultCore',
      },
    ],
    outputs: [
      {
        name: 'totalAmount0',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalAmount1',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'borrowedAmount0',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'borrowedAmount1',
        type: 'uint256',
        internalType: 'uint256',
      },
      {name: 'tvl0', type: 'uint256', internalType: 'uint256'},
      {name: 'tvl1', type: 'uint256', internalType: 'uint256'},
      {name: 'blocksCount', type: 'uint256', internalType: 'uint256'},
    ],
    stateMutability: 'view',
  },
] as const;
