import type {OptionData} from '~/package/client';
import {
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
  const [borrowedAmount0, borrowedAmount1] = liquiditiesToAmounts(
    liquidities,
    option.startTick,
    option.entryTick,
    tickSpacing,
  );
  const [repayAmount0, repayAmount1] = liquiditiesToAmounts(
    liquidities,
    option.startTick,
    tick,
    tickSpacing,
  );
  const positionSize = optionAssetIsToken0
    ? borrowedAmount1 + token0ToToken1(borrowedAmount0, tick)
    : borrowedAmount0 + token1ToToken0(borrowedAmount1, tick);

  const repaySize = optionAssetIsToken0
    ? repayAmount1 + token0ToToken1(repayAmount0, tick)
    : repayAmount0 + token1ToToken0(repayAmount1, tick);

  const delta = positionSize - repaySize;
  const payout = delta < 0n ? 0n : delta;

  return payout;
};
