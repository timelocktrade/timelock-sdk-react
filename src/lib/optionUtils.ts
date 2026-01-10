import type {OptionData} from '~/package/client';
import {
  getPriceAtTick,
  liquiditiesToAmounts,
  token0ToToken1,
  token1ToToken0,
} from './liquidityUtils';

export const getPayoutAtTick = (
  option: OptionData,
  liquidities: bigint[],
  tick: number,
  tickSpacing: number,
  optionAssetIsToken0: boolean,
) => {
  return getPayoutAtPrice(
    option,
    liquidities,
    getPriceAtTick(tick),
    tickSpacing,
    optionAssetIsToken0,
  );
};

export const getPayoutAtPrice = (
  option: OptionData,
  liquidities: bigint[],
  price: bigint,
  tickSpacing: number,
  optionAssetIsToken0: boolean,
) => {
  const [borrowedAmount0, borrowedAmount1] = liquiditiesToAmounts(
    liquidities,
    option.startTick,
    option.entryPrice,
    tickSpacing,
  );
  const [repayAmount0, repayAmount1] = liquiditiesToAmounts(
    liquidities,
    option.startTick,
    price,
    tickSpacing,
  );
  const totalAmount = optionAssetIsToken0
    ? borrowedAmount1 + token0ToToken1(borrowedAmount0, price)
    : borrowedAmount0 + token1ToToken0(borrowedAmount1, price);

  const repayAmount = optionAssetIsToken0
    ? repayAmount1 + token0ToToken1(repayAmount0, price)
    : repayAmount0 + token1ToToken0(repayAmount1, price);

  const delta = totalAmount - repayAmount;
  const payout = delta < 0n ? 0n : delta;

  return payout;
};
