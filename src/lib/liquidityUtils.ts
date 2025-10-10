import {SqrtPriceMath, TickMath} from '@uniswap/v3-sdk';
import JSBI from 'jsbi';

const PRICE_PRECISION = BigInt(1e18);

export const getPriceAtTick = (tick: number) => {
  const sqrtRatioX96 = BigInt(TickMath.getSqrtRatioAtTick(tick).toString());

  const priceX192 = sqrtRatioX96 * sqrtRatioX96;
  const price = (priceX192 * PRICE_PRECISION) / BigInt(2 ** 192);

  return price;
};

export const token0ToToken1 = (amount0: bigint, tick: number) => {
  const price = getPriceAtTick(tick);
  return (amount0 * price) / PRICE_PRECISION;
};

export const token1ToToken0 = (amount1: bigint, tick: number) => {
  const price = getPriceAtTick(tick);
  return (amount1 * PRICE_PRECISION) / price;
};

export const liquiditiesToAmount0 = (
  liquidities: bigint[],
  startTick: number,
  tickSpacing: number,
) => {
  let amount0 = BigInt(0);

  for (let i = 0; i < liquidities.length; i++) {
    const liquidity = liquidities[i];
    if (liquidity === BigInt(0)) continue;

    const tickLower = startTick + tickSpacing * i;
    const tickUpper = tickLower + tickSpacing;

    const sqrtRatioAX96 = TickMath.getSqrtRatioAtTick(tickLower);
    const sqrtRatioBX96 = TickMath.getSqrtRatioAtTick(tickUpper);
    const liquidityJSBI = JSBI.BigInt(liquidity.toString());

    const amount0Delta = SqrtPriceMath.getAmount0Delta(
      sqrtRatioAX96,
      sqrtRatioBX96,
      liquidityJSBI,
      false,
    );
    amount0 += BigInt(amount0Delta.toString());
  }
  return amount0;
};

export const liquiditiesToAmount1 = (
  liquidities: bigint[],
  startTick: number,
  tickSpacing: number,
) => {
  let amount1 = BigInt(0);

  for (let i = 0; i < liquidities.length; i++) {
    const liquidity = liquidities[i];
    if (liquidity === BigInt(0)) continue;

    const tickLower = startTick + tickSpacing * i;
    const tickUpper = tickLower + tickSpacing;

    const sqrtRatioAX96 = TickMath.getSqrtRatioAtTick(tickLower);
    const sqrtRatioBX96 = TickMath.getSqrtRatioAtTick(tickUpper);
    const liquidityJSBI = JSBI.BigInt(liquidity.toString());

    const amount1Delta = SqrtPriceMath.getAmount1Delta(
      sqrtRatioAX96,
      sqrtRatioBX96,
      liquidityJSBI,
      false,
    );
    amount1 += BigInt(amount1Delta.toString());
  }
  return amount1;
};

export const liquiditiesToAmounts = (
  liquidities: bigint[],
  startTick: number,
  currentTick: number,
  tickSpacing: number,
) => {
  let amount0 = 0n;
  let amount1 = 0n;

  const sqrtRatioX96 = TickMath.getSqrtRatioAtTick(currentTick);

  for (let i = 0; i < liquidities.length; i++) {
    const liquidity = liquidities[i];
    if (liquidity === BigInt(0)) continue;

    const tickLower = startTick + tickSpacing * i;
    const tickUpper = tickLower + tickSpacing;

    const sqrtRatioAX96 = TickMath.getSqrtRatioAtTick(tickLower);
    const sqrtRatioBX96 = TickMath.getSqrtRatioAtTick(tickUpper);
    const liquidityJSBI = JSBI.BigInt(liquidity.toString());

    if (currentTick < tickLower) {
      const delta0 = SqrtPriceMath.getAmount0Delta(
        sqrtRatioAX96,
        sqrtRatioBX96,
        liquidityJSBI,
        false,
      );
      amount0 += BigInt(delta0.toString());
    } else if (currentTick >= tickUpper) {
      const delta1 = SqrtPriceMath.getAmount1Delta(
        sqrtRatioAX96,
        sqrtRatioBX96,
        liquidityJSBI,
        false,
      );
      amount1 += BigInt(delta1.toString());
    } else {
      const delta0 = SqrtPriceMath.getAmount0Delta(
        sqrtRatioX96,
        sqrtRatioBX96,
        liquidityJSBI,
        false,
      );
      const delta1 = SqrtPriceMath.getAmount1Delta(
        sqrtRatioAX96,
        sqrtRatioX96,
        liquidityJSBI,
        false,
      );
      amount0 += BigInt(delta0.toString());
      amount1 += BigInt(delta1.toString());
    }
  }
  return [amount0, amount1];
};

export const liquiditiesToAmountsOption = (
  optionType: 'CALL' | 'PUT',
  liquidities: bigint[],
  strikeTick: number,
  entryTick: number,
  currentTick: number,
  tickSpacing: number,
  optionAssetIsToken0: boolean,
) => {
  const leftTick =
    optionType === 'CALL'
      ? strikeTick
      : strikeTick - tickSpacing * liquidities.length;

  const [repayAmount0, repayAmount1] = liquiditiesToAmounts(
    liquidities,
    leftTick,
    currentTick,
    tickSpacing,
  );
  const borrowedAmount0 = liquiditiesToAmount0(
    liquidities,
    leftTick,
    tickSpacing,
  );
  const borrowedAmount1 = liquiditiesToAmount1(
    liquidities,
    leftTick,
    tickSpacing,
  );

  const [optionAssetToRepay, payoutAssetToRepay] = optionAssetIsToken0
    ? [repayAmount0, repayAmount1]
    : [repayAmount1, repayAmount0];

  let optionAssetBorrowed = 0n;
  let payoutAssetBorrowed = 0n;
  let positionSize = 0n;

  if (optionType === 'CALL') {
    optionAssetBorrowed = optionAssetIsToken0
      ? borrowedAmount0
      : borrowedAmount1;
    positionSize = optionAssetBorrowed;
  } else {
    payoutAssetBorrowed = optionAssetIsToken0
      ? borrowedAmount1
      : borrowedAmount0;
    positionSize = optionAssetIsToken0
      ? token1ToToken0(payoutAssetBorrowed, entryTick)
      : token0ToToken1(payoutAssetBorrowed, entryTick);
  }

  const displayPnl =
    optionType === 'CALL'
      ? optionAssetIsToken0
        ? token0ToToken1(positionSize, currentTick) -
          token0ToToken1(positionSize, entryTick)
        : token1ToToken0(positionSize, currentTick) -
          token1ToToken0(positionSize, entryTick)
      : optionAssetIsToken0
        ? token0ToToken1(positionSize, entryTick) -
          token0ToToken1(positionSize, currentTick)
        : token1ToToken0(positionSize, entryTick) -
          token1ToToken0(positionSize, currentTick);

  const strikePrice = optionAssetIsToken0
    ? getPriceAtTick(strikeTick)
    : (PRICE_PRECISION * PRICE_PRECISION) / getPriceAtTick(strikeTick);

  return {
    optionAssetToRepay,
    payoutAssetToRepay,
    optionAssetBorrowed,
    payoutAssetBorrowed,
    positionSize,
    displayPnl,
    strikePrice,
  };
};
