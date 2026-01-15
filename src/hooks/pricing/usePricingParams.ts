import {type Address, decodeAbiParameters, type Hex} from 'viem';
import {useReadContract} from 'wagmi';
import {useLens} from '../useLens';
import {lensAbi} from '~/abis/lens';

export type StaticPricingParams = {
  model: 'static';
  dailyFundingRate: number;
  minFundingAmount: bigint;
};

export type OptionPricingParams = {
  model: 'bsm';
  logicContract: Address;
  iv: number;
  riskFreeRate: number;
  minPremiumDailyRate: number;
  minPremiumAmount: bigint;
};
export type PricingParams = StaticPricingParams | OptionPricingParams;

export const usePricingParams = (pricingAddr: Address | undefined) => {
  const {timelockLens} = useLens();

  return useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getPricingParams',
    args: pricingAddr ? [pricingAddr] : undefined,
    query: {
      select: ([pricingModel, rawData]): PricingParams => {
        if (pricingModel === 0) {
          // OptionPricing: (uint8, address, uint32, uint32, uint32, uint256)
          const [
            logicContract,
            iv,
            riskFreeRate,
            minPremiumDailyRate,
            minPremiumAmount,
          ] = decodeAbiParameters(
            [
              {name: 'logicContract', type: 'address'},
              {name: 'iv', type: 'uint32'},
              {name: 'riskFreeRate', type: 'uint32'},
              {name: 'minPremiumDailyRate', type: 'uint32'},
              {name: 'minPremiumAmount', type: 'uint256'},
            ],
            rawData as Hex,
          );

          return {
            model: 'bsm',
            logicContract,
            iv,
            riskFreeRate,
            minPremiumDailyRate,
            minPremiumAmount,
          };
        } else if (pricingModel === 1) {
          const [dailyFundingRate, minFundingAmount] = decodeAbiParameters(
            [
              {name: 'dailyFundingRate', type: 'uint32'},
              {name: 'minFundingAmount', type: 'uint128'},
            ],
            rawData as Hex,
          );
          return {model: 'static', dailyFundingRate, minFundingAmount};
        }
        throw new Error('Unknown pricing model');
      },
    },
  });
};
