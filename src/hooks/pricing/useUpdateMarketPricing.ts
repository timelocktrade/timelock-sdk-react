import {type Address, decodeEventLog, zeroAddress} from 'viem';
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
  const {mutateAsync: writeContractAsync, ...rest} = useWriteContract();
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const chainId = useChainId();

  const {
    data: {feeStrategy, optionPricing, priceFeed} = {},
    error: stateError,
  } = useMarketState(marketAddr);

  const {data: pricingData, error: pricingError} =
    usePricingParams(optionPricing);

  const getOrDeployStaticPricing = async (
    factoryAddr: Address,
    params: Required<StaticPricingParams>,
  ) => {
    const args = [
      params.openingRate,
      params.dailyFundingRate,
      params.minOpeningAmount,
      params.minFundingAmount,
    ] as const;

    const [existingPricing] = await publicClient!.readContract({
      address: factoryAddr,
      abi: factoryAbi,
      functionName: 'getStaticPerpsPricing',
      args,
    });

    if (existingPricing !== zeroAddress) {
      return {pricingAddr: existingPricing};
    }
    const hash = await writeContractAsync({
      address: factoryAddr,
      abi: factoryAbi,
      functionName: 'deployStaticPerpsPricing',
      args,
    });
    const receipt = await publicClient!.waitForTransactionReceipt({hash});

    const deployEvent = receipt.logs.find(
      log => log.address.toLowerCase() === factoryAddr,
    );
    if (!deployEvent) {
      console.error(receipt);
      throw new Error(`Deploy event not found in tx: ${hash}`);
    }
    const decodedEvent = decodeEventLog({
      abi: factoryAbi,
      data: deployEvent.data,
      topics: deployEvent.topics,
    });
    if (decodedEvent.eventName !== 'DeployStaticPerpsPricing') {
      console.error(receipt);
      throw new Error(
        `Unexpected event ${decodedEvent.eventName} in tx ${hash}`,
      );
    }
    return {pricingAddr: decodedEvent.args.pricing, deployHash: hash};
  };

  const getOrDeployOptionPricing = async (
    factoryAddr: Address,
    params: Required<OptionPricingParams>,
  ) => {
    const args = [
      params.logicContract,
      params.iv,
      params.riskFreeRate,
      params.minPremiumDailyRate,
      params.minPremiumAmount,
    ] as const;

    const [existingPricing] = await publicClient!.readContract({
      address: factoryAddr,
      abi: factoryAbi,
      functionName: 'getOptionPricing',
      args,
    });

    if (existingPricing !== zeroAddress) {
      return {pricingAddr: existingPricing};
    }
    const hash = await writeContractAsync({
      address: factoryAddr,
      abi: factoryAbi,
      functionName: 'deployOptionPricing',
      args,
    });
    const receipt = await publicClient!.waitForTransactionReceipt({hash});

    const deployEvent = receipt.logs.find(
      log => log.address.toLowerCase() === factoryAddr,
    );
    if (!deployEvent) {
      console.error(receipt);
      throw new Error(`Deploy event not found in tx: ${hash}`);
    }
    const decodedEvent = decodeEventLog({
      abi: factoryAbi,
      data: deployEvent.data,
      topics: deployEvent.topics,
    });

    if (decodedEvent.eventName !== 'DeployOptionPricing') {
      console.error(receipt);
      throw new Error(
        `Unexpected event ${decodedEvent.eventName} in tx ${hash}`,
      );
    }
    return {pricingAddr: decodedEvent.args.pricing, deployHash: hash};
  };

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
    if (!feeStrategy || !priceFeed) {
      throw new Error('Market state not available: ' + stateError?.message);
    }
    const factoryAddr = timelockFactories[chainId].toLowerCase() as Address;

    if (data.model === 'static' && pricingData.model === 'static') {
      data.openingRate ??= pricingData.openingRate;
      data.dailyFundingRate ??= pricingData.dailyFundingRate;
      data.minOpeningAmount ??= pricingData.minOpeningAmount;
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
        if (data.openingRate === undefined) {
          throw new Error(
            'openingRate is required when switching to static model',
          );
        }
        if (data.dailyFundingRate === undefined) {
          throw new Error(
            'dailyFundingRate is required when switching to static model',
          );
        }
        if (data.minOpeningAmount === undefined) {
          throw new Error(
            'minOpeningAmount is required when switching to static model',
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

    const {pricingAddr, deployHash} =
      data.model === 'static'
        ? await getOrDeployStaticPricing(
            factoryAddr,
            data as Required<StaticPricingParams>,
          )
        : await getOrDeployOptionPricing(
            factoryAddr,
            data as Required<OptionPricingParams>,
          );

    const updateHash = await writeContractAsync({
      address: marketAddr,
      abi: optionsMarketAbi,
      functionName: 'updateAddresses',
      args: [pricingAddr, feeStrategy, priceFeed],
    });
    void queryClient.invalidateQueries({queryKey: ['readContract']});

    return {deployHash, updateHash, newPricingAddr: pricingAddr};
  };

  return {updateMarketPricing, ...rest};
};
