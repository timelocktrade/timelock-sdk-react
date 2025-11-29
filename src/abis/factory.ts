export const factoryAbi = [
  {
    type: 'function',
    name: 'deployFeeStrategy',
    inputs: [
      {
        name: '_openingFeeRate',
        type: 'uint32',
        internalType: 'uint32',
      },
      {name: '_baseFeeRate', type: 'uint32', internalType: 'uint32'},
      {
        name: '_minOpeningFee',
        type: 'uint128',
        internalType: 'uint128',
      },
      {name: '_minBaseFee', type: 'uint128', internalType: 'uint128'},
      {
        name: '_feeRecipient',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract FeeStrategy',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'deployOptionPricing',
    inputs: [
      {
        name: '_logicContract',
        type: 'address',
        internalType: 'contract StatelessOptionPricing',
      },
      {name: '_iv', type: 'uint32', internalType: 'uint32'},
      {name: '_riskFreeRate', type: 'uint32', internalType: 'uint32'},
      {
        name: '_minPremiumDailyRate',
        type: 'uint32',
        internalType: 'uint32',
      },
      {
        name: '_minPremiumAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract OptionPricing',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'deployStaticPerpsPricing',
    inputs: [
      {
        name: '_dailyFundingRate',
        type: 'uint32',
        internalType: 'uint32',
      },
      {
        name: '_minFundingAmount',
        type: 'uint128',
        internalType: 'uint128',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract StaticPerpsPricing',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'feeStrategies',
    inputs: [{name: '', type: 'bytes32', internalType: 'bytes32'}],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract FeeStrategy',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'optionPricings',
    inputs: [{name: '', type: 'bytes32', internalType: 'bytes32'}],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract OptionPricing',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'staticPerpsPricings',
    inputs: [{name: '', type: 'bytes32', internalType: 'bytes32'}],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract StaticPerpsPricing',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'DeployFeeStrategy',
    inputs: [
      {
        name: 'feeStrategy',
        type: 'address',
        indexed: true,
        internalType: 'contract FeeStrategy',
      },
      {
        name: 'openingFeeRate',
        type: 'uint32',
        indexed: false,
        internalType: 'uint32',
      },
      {
        name: 'baseFeeRate',
        type: 'uint32',
        indexed: false,
        internalType: 'uint32',
      },
      {
        name: 'minOpeningFee',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128',
      },
      {
        name: 'minBaseFee',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128',
      },
      {
        name: 'feeRecipient',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DeployOptionPricing',
    inputs: [
      {
        name: 'pricing',
        type: 'address',
        indexed: true,
        internalType: 'contract OptionPricing',
      },
      {
        name: 'statelessPricing',
        type: 'address',
        indexed: false,
        internalType: 'contract StatelessOptionPricing',
      },
      {
        name: 'iv',
        type: 'uint32',
        indexed: false,
        internalType: 'uint32',
      },
      {
        name: 'riskFreeRate',
        type: 'uint32',
        indexed: false,
        internalType: 'uint32',
      },
      {
        name: 'minPremiumDailyRate',
        type: 'uint32',
        indexed: false,
        internalType: 'uint32',
      },
      {
        name: 'minPremiumAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DeployStaticPerpsPricing',
    inputs: [
      {
        name: 'pricing',
        type: 'address',
        indexed: true,
        internalType: 'contract StaticPerpsPricing',
      },
      {
        name: 'dailyFundingRate',
        type: 'uint32',
        indexed: false,
        internalType: 'uint32',
      },
      {
        name: 'minFundingAmount',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128',
      },
    ],
    anonymous: false,
  },
] as const;
