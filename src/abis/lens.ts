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
        internalType: 'contract TimelockSingleOwnerVault',
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
            name: 'reservedLiquidity',
            type: 'uint128',
            internalType: 'uint128',
          },
          {
            name: 'availableLiquidity',
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
      {name: 'endId', type: 'uint256', internalType: 'uint256'},
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
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getFeeRates',
    inputs: [
      {
        name: 'feeStrategy',
        type: 'address',
        internalType: 'contract FeeStrategy',
      },
    ],
    outputs: [
      {
        name: 'rates',
        type: 'tuple',
        internalType: 'struct TimelockLens.FeeStrategyRates',
        components: [
          {
            name: 'openingFeeRate',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'baseFeeRate',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'minOpeningFee',
            type: 'uint128',
            internalType: 'uint128',
          },
          {
            name: 'minBaseFee',
            type: 'uint128',
            internalType: 'uint128',
          },
          {
            name: 'feeRecipient',
            type: 'address',
            internalType: 'address',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getGlobalGuardianState',
    inputs: [
      {
        name: 'guardian',
        type: 'address',
        internalType: 'contract TimelockGuardian',
      },
    ],
    outputs: [
      {
        name: 'guardianState',
        type: 'tuple',
        internalType: 'struct TimelockLens.GuardianGlobalState',
        components: [
          {
            name: 'globalMintPaused',
            type: 'tuple',
            internalType: 'struct TimelockGuardian.PauseState',
            components: [
              {name: 'paused', type: 'bool', internalType: 'bool'},
              {
                name: 'updatedAt',
                type: 'uint64',
                internalType: 'uint64',
              },
            ],
          },
          {
            name: 'globalBurnPaused',
            type: 'tuple',
            internalType: 'struct TimelockGuardian.PauseState',
            components: [
              {name: 'paused', type: 'bool', internalType: 'bool'},
              {
                name: 'updatedAt',
                type: 'uint64',
                internalType: 'uint64',
              },
            ],
          },
          {
            name: 'globalTradingPaused',
            type: 'tuple',
            internalType: 'struct TimelockGuardian.PauseState',
            components: [
              {name: 'paused', type: 'bool', internalType: 'bool'},
              {
                name: 'updatedAt',
                type: 'uint64',
                internalType: 'uint64',
              },
            ],
          },
          {
            name: 'minWithdrawalInterval',
            type: 'uint256',
            internalType: 'uint256',
          },
          {name: 'senderIsAdmin', type: 'bool', internalType: 'bool'},
          {name: 'senderIsPauser', type: 'bool', internalType: 'bool'},
        ],
      },
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
            name: 'guardian',
            type: 'address',
            internalType: 'contract TimelockGuardian',
          },
          {
            name: 'vault',
            type: 'address',
            internalType: 'contract ITimelockVault',
          },
          {
            name: 'poolManager',
            type: 'address',
            internalType: 'contract IPoolManager',
          },
          {
            name: 'poolKey',
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
              {
                name: 'tickSpacing',
                type: 'int24',
                internalType: 'int24',
              },
              {
                name: 'hooks',
                type: 'address',
                internalType: 'contract IHooks',
              },
            ],
          },
          {
            name: 'optionAssetIsToken0',
            type: 'bool',
            internalType: 'bool',
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
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getMarketState',
    inputs: [
      {
        name: 'market',
        type: 'address',
        internalType: 'contract TimelockOptionsMarket',
      },
    ],
    outputs: [
      {
        name: 'marketState',
        type: 'tuple',
        internalType: 'struct TimelockLens.TimelockMarketState',
        components: [
          {
            name: 'optionsCount',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'optionPricing',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'feeStrategy',
            type: 'address',
            internalType: 'contract IFeeStrategy',
          },
          {name: 'owner', type: 'address', internalType: 'address'},
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getMaxATMPositionSizes',
    inputs: [
      {
        name: 'market',
        type: 'address',
        internalType: 'contract TimelockOptionsMarket',
      },
      {name: 'maxSteps', type: 'int24', internalType: 'int24'},
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
      {name: 'maxSteps', type: 'int24', internalType: 'int24'},
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
      {name: 'maxSteps', type: 'int24', internalType: 'int24'},
    ],
    outputs: [{name: 'borrowable1', type: 'uint256', internalType: 'uint256'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getMaxPositionSizes',
    inputs: [
      {
        name: 'market',
        type: 'address',
        internalType: 'contract TimelockOptionsMarket',
      },
      {name: 'strikeTick', type: 'int24', internalType: 'int24'},
      {name: 'maxSteps', type: 'int24', internalType: 'int24'},
    ],
    outputs: [
      {name: 'maxCallSize', type: 'uint256', internalType: 'uint256'},
      {name: 'maxPutSize', type: 'uint256', internalType: 'uint256'},
    ],
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
    name: 'getOptionPricingParams',
    inputs: [
      {
        name: 'pricing',
        type: 'address',
        internalType: 'contract OptionPricing',
      },
    ],
    outputs: [
      {
        name: 'params',
        type: 'tuple',
        internalType: 'struct TimelockLens.OptionPricingParams',
        components: [
          {
            name: 'logicContract',
            type: 'address',
            internalType: 'contract StatelessOptionPricing',
          },
          {name: 'iv', type: 'uint32', internalType: 'uint32'},
          {
            name: 'riskFreeRate',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'minPremiumDailyRate',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'minPremiumAmount',
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
        name: 'poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {
        name: 'poolKey',
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
    name: 'getPricingParams',
    inputs: [{name: 'pricing', type: 'address', internalType: 'address'}],
    outputs: [
      {name: 'pricingModel', type: 'uint8', internalType: 'uint8'},
      {name: 'data', type: 'bytes', internalType: 'bytes'},
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
    name: 'getStaticPricingParams',
    inputs: [
      {
        name: 'pricing',
        type: 'address',
        internalType: 'contract StaticPerpsPricing',
      },
    ],
    outputs: [
      {
        name: 'params',
        type: 'tuple',
        internalType: 'struct TimelockLens.StaticPerpsPricingParams',
        components: [
          {
            name: 'dailyFundingRate',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'minFundingAmount',
            type: 'uint128',
            internalType: 'uint128',
          },
        ],
      },
    ],
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
    name: 'getVaultData',
    inputs: [
      {
        name: 'vault',
        type: 'address',
        internalType: 'contract TimelockSingleOwnerVault',
      },
    ],
    outputs: [
      {
        name: 'vaultData',
        type: 'tuple',
        internalType: 'struct TimelockLens.TimelockVaultData',
        components: [
          {
            name: 'poolManager',
            type: 'address',
            internalType: 'contract IPoolManager',
          },
          {
            name: 'poolKey',
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
              {
                name: 'tickSpacing',
                type: 'int24',
                internalType: 'int24',
              },
              {
                name: 'hooks',
                type: 'address',
                internalType: 'contract IHooks',
              },
            ],
          },
          {name: 'owner', type: 'address', internalType: 'address'},
        ],
      },
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
        internalType: 'contract TimelockSingleOwnerVault',
      },
    ],
    outputs: [
      {name: 'total0', type: 'uint256', internalType: 'uint256'},
      {name: 'total1', type: 'uint256', internalType: 'uint256'},
      {name: 'borrowed0', type: 'uint256', internalType: 'uint256'},
      {name: 'borrowed1', type: 'uint256', internalType: 'uint256'},
      {name: 'tvlAs0', type: 'uint256', internalType: 'uint256'},
      {name: 'tvlAs1', type: 'uint256', internalType: 'uint256'},
      {name: 'blocksCount', type: 'uint256', internalType: 'uint256'},
    ],
    stateMutability: 'view',
  },
] as const;
