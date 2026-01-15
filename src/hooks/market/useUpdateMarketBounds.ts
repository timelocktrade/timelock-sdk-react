import type {Address} from 'viem';
import {useWriteContract} from 'wagmi';
import {useMarketState} from './useMarketState';
import {optionsMarketAbi} from '~/abis/optionsMarket';

export const useUpdateMarketBounds = (marketAddr: Address | undefined) => {
  const {
    data: {minDuration, maxDuration, minPositionSize, maxPositionSize} = {},
    error,
  } = useMarketState(marketAddr);

  const {mutateAsync, ...rest} = useWriteContract();

  const updateBounds = ({
    minDuration: newMinDuration,
    maxDuration: newMaxDuration,
    minPositionSize: newMinPositionSize,
    maxPositionSize: newMaxPositionSize,
  }: {
    minDuration?: number;
    maxDuration?: number;
    minPositionSize?: bigint;
    maxPositionSize?: bigint;
  }) => {
    if (!marketAddr) {
      throw new Error('Market address not provided');
    }
    if (
      minDuration === undefined ||
      maxDuration === undefined ||
      minPositionSize === undefined ||
      maxPositionSize === undefined
    ) {
      throw new Error('Market state not loaded: ' + error?.message);
    }
    return mutateAsync({
      address: marketAddr,
      abi: optionsMarketAbi,
      functionName: 'updatePositionBounds',
      args: [
        newMinDuration || minDuration,
        newMaxDuration || maxDuration,
        newMinPositionSize || minPositionSize,
        newMaxPositionSize || maxPositionSize,
      ],
    });
  };

  return {updateBounds, ...rest};
};
