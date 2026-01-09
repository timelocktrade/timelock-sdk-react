import type {Address, PublicClient} from 'viem';
import type {OptionData} from '~/package/client';
import {getQuoter} from './contracts';
import {
  getPriceAtTick,
  liquiditiesToAmounts,
  PRICE_PRECISION,
  type PoolKey,
} from './liquidityUtils';

export const getPayoutAtTick = async (
  client: PublicClient,
  poolManager: Address,
  poolKey: PoolKey,
  option: OptionData,
  liquidities: bigint[],
  tick: number,
  optionAssetIsToken0: boolean,
) => {
  return getPayoutAtPrice(
    client,
    poolManager,
    poolKey,
    option,
    liquidities,
    getPriceAtTick(tick),
    optionAssetIsToken0,
  );
};

export const getPayoutAtPrice = async (
  client: PublicClient,
  poolManager: Address,
  poolKey: PoolKey,
  option: OptionData,
  liquidities: bigint[],
  price: bigint,
  optionAssetIsToken0: boolean,
) => {
  // convert from payoutAsset/optionAsset to token1/token0
  const entryPrice = optionAssetIsToken0
    ? option.entryPrice
    : PRICE_PRECISION ** 2n / option.entryPrice;

  const [borrowed0, borrowed1] = liquiditiesToAmounts(
    liquidities,
    option.startTick,
    entryPrice,
    poolKey.tickSpacing,
  );
  const [repay0, repay1] = liquiditiesToAmounts(
    liquidities,
    option.startTick,
    price,
    poolKey.tickSpacing,
  );

  // Determine if we're long token0 or token1
  const isLong0 =
    (optionAssetIsToken0 && option.optionType === 'CALL') ||
    (!optionAssetIsToken0 && option.optionType === 'PUT');

  // Get borrowed amount (only one will be non-zero)
  const borrowedLong = isLong0 ? borrowed0 : borrowed1;
  const repayLong = isLong0 ? repay0 : repay1;

  // Calculate excess borrowed amount after repay
  const excessLong = borrowedLong > repayLong ? borrowedLong - repayLong : 0n;
  const neededShort = isLong0 ? repay1 : repay0;

  // If no conversion needed, return immediately
  if (neededShort === 0n || excessLong === 0n) return 0n;

  // Check if output asset is same as borrowed asset
  const output0 = !optionAssetIsToken0;

  const quoter = await getQuoter(client);

  if ((isLong0 && output0) || (!isLong0 && !output0)) {
    // Output asset same as borrowed asset
    // Convert minimum required amount, excess is payout

    // Use quoteExactOutputSingle to find how much input needed for exact output
    const result = await quoter.simulate.quoteExactOutputSingle([
      poolManager,
      {
        poolKey,
        zeroForOne: isLong0, // swapping long asset for short
        exactAmount: neededShort,
        hookData: '0x',
      },
    ]);
    const amountIn = result.result[0];

    return excessLong > amountIn ? excessLong - amountIn : 0n;
  } else {
    // Output asset is not same as borrowed asset
    // Convert all of borrowed asset, excess non-borrowed asset is payout

    // Use quoteExactInputSingle to find how much output from swapping all excess
    const result = await quoter.simulate.quoteExactInputSingle([
      poolManager,
      {
        poolKey,
        zeroForOne: isLong0,
        exactAmount: excessLong,
        hookData: '0x',
      },
    ]);
    const amountOut = result.result[0];

    return amountOut > neededShort ? amountOut - neededShort : 0n;
  }
};
