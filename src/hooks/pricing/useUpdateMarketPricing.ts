import {type Address, decodeEventLog} from 'viem';
import {useChainId, useWriteContract, usePublicClient} from 'wagmi';
import {useQueryClient} from '@tanstack/react-query';
import {useMarketState} from '~/hooks/market/useMarketState';
import {
  usePricingParams,
  type OptionPricingParams,
  type StaticPricingParams,
} from './usePricingParams';
import {timelockFactories} from '~/lib/contracts';
import {factoryAbi} from '~/abis/factory';
import {optionsMarketAbi} from '~/abis/optionsMarket';

export const useUpdateMarketPricing = (marketAddr: Address | undefined) => {
  const {writeContractAsync, ...rest} = useWriteContract();
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const chainId = useChainId();

  const {data: {feeStrategy, optionPricing} = {}, error: stateError} =
    useMarketState(marketAddr);

  const {data: pricingData, error: pricingError} =
    usePricingParams(optionPricing);

  const updateMarketPricing = async <T extends 'static' | 'bsm'>(
    data: T extends 'static'
      ? Partial<StaticPricingParams> & {model: 'static'}
      : Partial<OptionPricingParams> & {model: 'bsm'},
  ) => {
    if (!marketAddr) {
      throw new Error('Market address not found');
    }
    if (!pricingData) {
      throw new Error(
        'Market pricing data not available: ' + pricingError?.message,
      );
    }
    if (!publicClient) {
      throw new Error('Public client not available');
    }
    if (!feeStrategy) {
      throw new Error('Fee strategy not available: ' + stateError?.message);
    }
    const factoryAddr = timelockFactories[chainId].toLowerCase() as Address;

    if (data.model === 'static' && pricingData.model === 'static') {
      data.dailyFundingRate ??= pricingData.dailyFundingRate;
      data.minFundingAmount ??= pricingData.minFundingAmount;
    }
    if (data.model === 'bsm' && pricingData.model === 'bsm') {
      data.logicContract ??= pricingData.logicContract;
      data.iv ??= pricingData.iv;
      data.riskFreeRate ??= pricingData.riskFreeRate;
      data.minPremiumDailyRate ??= pricingData.minPremiumDailyRate;
      data.minPremiumAmount ??= pricingData.minPremiumAmount;
    }
    if (data.model !== pricingData.model) {
      if (data.model === 'static') {
        if (data.dailyFundingRate === undefined) {
          throw new Error(
            'dailyFundingRate is required when switching to static model',
          );
        }
        if (data.minFundingAmount === undefined) {
          throw new Error(
            'minFundingAmount is required when switching to static model',
          );
        }
      } else {
        if (data.logicContract === undefined) {
          throw new Error(
            'logicContract is required when switching to option model',
          );
        }
        if (data.iv === undefined) {
          throw new Error('iv is required when switching to option model');
        }
        if (data.riskFreeRate === undefined) {
          throw new Error(
            'riskFreeRate is required when switching to option model',
          );
        }
        if (data.minPremiumDailyRate === undefined) {
          throw new Error(
            'minPremiumDailyRate is required when switching to option model',
          );
        }
        if (data.minPremiumAmount === undefined) {
          throw new Error(
            'minPremiumAmount is required when switching to option model',
          );
        }
      }
    }

    const hash =
      data.model === 'static'
        ? await writeContractAsync({
            address: factoryAddr,
            abi: factoryAbi,
            functionName: 'deployStaticPerpsPricing',
            args: [data.dailyFundingRate!, data.minFundingAmount!],
          })
        : await writeContractAsync({
            address: factoryAddr,
            abi: factoryAbi,
            functionName: 'deployOptionPricing',
            args: [
              data.logicContract!,
              data.iv!,
              data.riskFreeRate!,
              data.minPremiumDailyRate!,
              data.minPremiumAmount!,
            ],
          });
    const receipt = await publicClient.waitForTransactionReceipt({hash});

    const deployEvent = receipt.logs.find(
      log => log.address.toLowerCase() === factoryAddr,
    );
    if (!deployEvent) {
      throw new Error('DeployFeeStrategy event not found');
    }

    const decodedEvent = decodeEventLog({
      abi: factoryAbi,
      data: deployEvent.data,
      topics: deployEvent.topics,
    });

    if (
      decodedEvent.eventName !== 'DeployStaticPerpsPricing' &&
      decodedEvent.eventName !== 'DeployOptionPricing'
    ) {
      throw new Error('Unexpected event');
    }
    const pricingAddr = decodedEvent.args.pricing;

    const hash2 = await writeContractAsync({
      address: marketAddr,
      abi: optionsMarketAbi,
      functionName: 'updateAddresses',
      args: [pricingAddr, feeStrategy],
    });
    void queryClient.invalidateQueries({queryKey: ['readContract']});
    return {deployHash: hash, updateHash: hash2, newPricingAddr: pricingAddr};
  };

  return {updateMarketPricing, ...rest};
};
