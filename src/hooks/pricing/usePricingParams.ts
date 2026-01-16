import {type Address, decodeAbiParameters, type Hex} from 'viem';
import {useReadContract} from 'wagmi';
import {useLens} from '../useLens';
import {lensAbi} from '~/abis/lens';

export type StaticPricingParams = {
  model: 'static';
  openingRate: number;
  dailyFundingRate: number;
  minOpeningAmount: bigint;
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
          const [
            openingRate,
            dailyFundingRate,
            minOpeningAmount,
            minFundingAmount,
          ] = decodeAbiParameters(
            [
              {name: 'openingRate', type: 'uint32'},
              {name: 'dailyFundingRate', type: 'uint32'},
              {name: 'minOpeningAmount', type: 'uint128'},
              {name: 'minFundingAmount', type: 'uint128'},
            ],
            rawData as Hex,
          );
          return {
            model: 'static',
            openingRate,
            dailyFundingRate,
            minOpeningAmount,
            minFundingAmount,
          };
        }
        throw new Error('Unknown pricing model');
      },
    },
  });
};
