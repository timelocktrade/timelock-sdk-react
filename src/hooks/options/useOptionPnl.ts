import {useMemo} from 'react';
import {
  useSimulateContract,
  useChainId,
  useReadContract,
  useConnection,
} from 'wagmi';
import {encodeAbiParameters, maxUint160} from 'viem';

import type {OptionData} from './useUserOptions';
import {useMarketData} from '~/hooks/market/useMarketData';
import {useCurrentPrice} from '~/hooks/pool/useCurrentPrice';
import {useLens} from '~/hooks/useLens';
import {
  token0ToToken1,
  token0ToToken1AtTick,
  token1ToToken0,
  token1ToToken0AtTick,
} from '~/lib/liquidityUtils';
import {type Amount, wrapAmount} from '~/lib/numberUtils';
import {swappers} from '~/lib/contracts';
import {MAX_SQRT_RATIO, MIN_SQRT_RATIO} from '~/lib/uniswapUtils';

import {optionsMarketAbi} from '~/abis/optionsMarket';
import {lensAbi} from '~/abis/lens';

const calculateDisplayPnl = (
  option: OptionData,
  poolPrice: bigint,
  optionAssetIsToken0: boolean,
  payoutAssetDecimals: number,
): Amount => {
  const strikeSize = optionAssetIsToken0
    ? token0ToToken1AtTick(option.positionSizeCurrent, option.strikeTick)
    : token1ToToken0AtTick(option.positionSizeCurrent, option.strikeTick);

  const currentSize = optionAssetIsToken0
    ? token0ToToken1(option.positionSizeCurrent, poolPrice)
    : token1ToToken0(option.positionSizeCurrent, poolPrice);

  const delta = currentSize - strikeSize;
  const pnl = option.optionType === 'CALL' ? delta : -delta;

  return wrapAmount(pnl, payoutAssetDecimals);
};

const swapperData = encodeAbiParameters(
  [{type: 'uint160'}, {type: 'uint160'}, {type: 'uint256'}],
  [
    MIN_SQRT_RATIO + 1n,
    MAX_SQRT_RATIO - 1n,
    BigInt(Math.floor(Date.now() / 1000) + 60 * 10),
  ],
);

export const useOptionPnl = (option?: OptionData) => {
  const chainId = useChainId();
  const {address: account} = useConnection();
  const {timelockLens} = useLens();

  const {
    vault,
    poolManager,
    poolKey,
    optionAssetIsToken0,
    payoutAssetDecimals,
  } = useMarketData(option?.marketAddr);

  const {currentPrice: poolPrice} = useCurrentPrice(poolManager, poolKey);

  // Simple theoretical PnL (no slippage)
  const displayPnl = useMemo(() => {
    if (
      !option ||
      !poolPrice ||
      !payoutAssetDecimals ||
      optionAssetIsToken0 === undefined
    )
      return undefined;

    return calculateDisplayPnl(
      option,
      poolPrice.scaled,
      optionAssetIsToken0,
      payoutAssetDecimals,
    );
  }, [option, optionAssetIsToken0, poolPrice, payoutAssetDecimals]);

  const {data: refTick} = useReadContract({
    address: timelockLens?.address,
    abi: lensAbi,
    functionName: 'getRefTick',
    args: vault && option?.startTick ? [vault, option.startTick] : undefined,
  });

  const swapper = swappers[chainId];

  // Actual payout accounting for slippage via simulate call to exerciseOption
  const {data: unrealizedPayout, ...rest} = useSimulateContract({
    address: option?.marketAddr,
    abi: optionsMarketAbi,
    functionName: 'exerciseOption',
    account,
    args:
      option && refTick
        ? [
            option.optionId,
            option.liquiditiesCurrent,
            0n,
            swapper,
            swapperData,
            refTick,
          ]
        : undefined,
    query: {
      enabled:
        !!option &&
        !!swapperData &&
        !!swapper &&
        refTick !== undefined &&
        !!account,
      staleTime: 10_000, // Cache for 10s to avoid excessive calls
      select: data => {
        if (!payoutAssetDecimals) return undefined;
        return wrapAmount(data.result, payoutAssetDecimals);
      },
    },
  });

  return {...rest, data: {displayPnl, unrealizedPayout}};
};
