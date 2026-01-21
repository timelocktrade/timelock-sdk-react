import {type Address, decodeEventLog, zeroAddress} from 'viem';
import {useChainId, useWriteContract, usePublicClient} from 'wagmi';
import {useQueryClient} from '@tanstack/react-query';
import {useMarketState} from '~/hooks/market/useMarketState';
import {useFeeRates} from './useFeeRates';
import {timelockFactories} from '~/lib/contracts';
import {factoryAbi} from '~/abis/factory';
import {optionsMarketAbi} from '~/abis/optionsMarket';

type FeeStrategyParams = {
  openingFeeRate: number;
  extensionFeeRate: number;
  minOpeningFee: bigint;
  minExtensionFee: bigint;
  feeRecipient: Address;
};

export const useUpdateMarketFees = (marketAddr: Address) => {
  const {mutateAsync: writeContractAsync, ...rest} = useWriteContract();
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const chainId = useChainId();

  const {
    data: {feeStrategy, optionPricing, priceFeed} = {},
    error: stateError,
  } = useMarketState(marketAddr);

  const {
    data: {
      openingFeeRate,
      extensionFeeRate,
      minOpeningFee,
      minExtensionFee,
      feeRecipient,
    } = {},
  } = useFeeRates(feeStrategy);

  const getOrDeployFeeStrategy = async (
    factoryAddr: Address,
    params: FeeStrategyParams,
  ) => {
    const args = [
      params.openingFeeRate,
      params.extensionFeeRate,
      params.minOpeningFee,
      params.minExtensionFee,
      params.feeRecipient,
    ] as const;

    const [existingFeeStrategy] = await publicClient!.readContract({
      address: factoryAddr,
      abi: factoryAbi,
      functionName: 'getFeeStrategy',
      args,
    });

    if (existingFeeStrategy !== zeroAddress) {
      return {feeStrategy: existingFeeStrategy};
    }
    const hash = await writeContractAsync({
      address: factoryAddr,
      abi: factoryAbi,
      functionName: 'deployFeeStrategy',
      args,
    });
    const receipt = await publicClient!.waitForTransactionReceipt({hash});

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
    if (decodedEvent.eventName !== 'DeployFeeStrategy') {
      throw new Error('Unexpected event');
    }
    return {feeStrategy: decodedEvent.args.feeStrategy, deployHash: hash};
  };

  const updateMarketFees = async (rates: Partial<FeeStrategyParams>) => {
    if (
      openingFeeRate === undefined ||
      extensionFeeRate === undefined ||
      minOpeningFee === undefined ||
      minExtensionFee === undefined ||
      feeRecipient === undefined
    ) {
      throw new Error('Missing current fee rates');
    }
    if (!optionPricing || !priceFeed) {
      throw new Error('Market state not available: ' + stateError?.message);
    }
    if (!publicClient) {
      throw new Error('Public client not available');
    }
    const factoryAddr = timelockFactories[chainId].toLowerCase() as Address;

    const {feeStrategy: newFeeStrategy, deployHash} =
      await getOrDeployFeeStrategy(factoryAddr, {
        openingFeeRate: rates.openingFeeRate ?? openingFeeRate,
        extensionFeeRate: rates.extensionFeeRate ?? extensionFeeRate,
        minOpeningFee: rates.minOpeningFee ?? minOpeningFee,
        minExtensionFee: rates.minExtensionFee ?? minExtensionFee,
        feeRecipient: rates.feeRecipient ?? feeRecipient,
      });

    const updateHash = await writeContractAsync({
      address: marketAddr,
      abi: optionsMarketAbi,
      functionName: 'updateAddresses',
      args: [optionPricing, newFeeStrategy, priceFeed],
    });
    void queryClient.invalidateQueries({queryKey: ['readContract']});
    return {deployHash, updateHash, newFeeStrategy};
  };

  return {updateMarketFees, ...rest};
};
