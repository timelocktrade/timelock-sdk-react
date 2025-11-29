import {type Address, decodeEventLog} from 'viem';
import {useChainId, useWriteContract, usePublicClient} from 'wagmi';
import {useQueryClient} from '@tanstack/react-query';
import {useMarketState} from '~/hooks/market/useMarketState';
import {useFeeRates} from './useFeeRates';
import {timelockFactories} from '~/lib/contracts';
import {factoryAbi} from '~/abis/factory';
import {optionsMarketAbi} from '~/abis/optionsMarket';

export const useUpdateMarketFees = (marketAddr: Address) => {
  const {writeContractAsync, ...rest} = useWriteContract();
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const chainId = useChainId();

  const {data: {feeStrategy, optionPricing} = {}} = useMarketState(marketAddr);

  const {openingFeeRate, baseFeeRate, minOpeningFee, minBaseFee, feeRecipient} =
    useFeeRates(feeStrategy);

  const updateMarketFees = async (rates: {
    openingFeeRate?: number;
    baseFeeRate?: number;
    minOpeningFee?: bigint;
    minBaseFee?: bigint;
    feeRecipient?: Address;
  }) => {
    if (
      openingFeeRate === undefined ||
      baseFeeRate === undefined ||
      minOpeningFee === undefined ||
      minBaseFee === undefined ||
      feeRecipient === undefined
    ) {
      throw new Error('Missing current fee rates');
    }
    if (!optionPricing) {
      throw new Error('Could not load market state');
    }
    if (!publicClient) {
      throw new Error('Public client not available');
    }
    const factoryAddr = timelockFactories[chainId].toLowerCase() as Address;

    const hash = await writeContractAsync({
      address: factoryAddr,
      abi: factoryAbi,
      functionName: 'deployFeeStrategy',
      args: [
        rates.openingFeeRate ?? openingFeeRate,
        rates.baseFeeRate ?? baseFeeRate,
        rates.minOpeningFee ?? minOpeningFee,
        rates.minBaseFee ?? minBaseFee,
        rates.feeRecipient ?? feeRecipient,
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
    if (decodedEvent.eventName !== 'DeployFeeStrategy') {
      throw new Error('Unexpected event');
    }
    const newFeeStrategy = decodedEvent.args.feeStrategy;

    const hash2 = await writeContractAsync({
      address: marketAddr,
      abi: optionsMarketAbi,
      functionName: 'updateAddresses',
      args: [optionPricing, newFeeStrategy],
    });
    void queryClient.invalidateQueries({queryKey: ['readContract']});
    return {deployHash: hash, updateHash: hash2, newFeeStrategy};
  };

  return {updateMarketFees, ...rest};
};
