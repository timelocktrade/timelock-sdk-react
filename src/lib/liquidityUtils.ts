import type {Address} from 'viem';
import Big from 'big.js';
import type {Amount} from './numberUtils';
import {
  getAmount0Delta,
  getAmount1Delta,
  getSqrtRatioAtTick,
  getTickAtSqrtRatio,
} from './uniswapUtils';

export type PoolKey = {
  currency0: Address;
  currency1: Address;
  fee: number;
  tickSpacing: number;
  hooks: Address;
};

// Set Big.js precision to handle 512-bit arithmetic
// 155 decimal places provides ~515 bits of precision (log2(10^155) ≈ 515)
Big.DP = 155; // Decimal places for division and sqrt operations
Big.RM = Big.roundDown; // Round down to match Solidity's integer division behavior

export const PRICE_PRECISION = BigInt(2) ** BigInt(128);

export const getPriceAtSqrtPriceX96 = (
  sqrtPriceX96: bigint,
  token0For1 = true,
) => {
  const priceX192 = sqrtPriceX96 * sqrtPriceX96;
  const price = (priceX192 * PRICE_PRECISION) / BigInt(2 ** 192);

  if (!token0For1) {
    return PRICE_PRECISION ** 2n / price;
  }
  return price;
};

export const getSqrtPriceX96AtPrice = (price: bigint) => {
  const sqrtPriceX96 = BigInt(
    new Big(price.toString())
      .mul(2 ** 192)
      .div(PRICE_PRECISION.toString())
      .sqrt()
      .toFixed(0),
  );
  return sqrtPriceX96;
};

export const getPriceAtTick = (tick: number, token0For1 = true) => {
  const sqrtRatioX96 = BigInt(getSqrtRatioAtTick(tick).toString());
  return getPriceAtSqrtPriceX96(sqrtRatioX96, token0For1);
};

export const getTickAtPrice = (price: bigint) => {
  const sqrtPriceX96 = getSqrtPriceX96AtPrice(price);
  return getTickAtSqrtRatio(sqrtPriceX96);
};

export const getNearestValidStrikeTick = (
  optionType: 'CALL' | 'PUT',
  optionAssetIsToken0: boolean,
  tickSpacing: number,
  currentTick: number,
  strikeTick?: number,
) => {
  strikeTick = roundTick(strikeTick ?? currentTick, tickSpacing);

  if (
    (optionType === 'CALL' && optionAssetIsToken0) ||
    (optionType === 'PUT' && !optionAssetIsToken0)
  ) {
    strikeTick += tickSpacing;
  }
  return strikeTick;
};

export const roundTick = (tick: number, spacing: number) => {
  const rem = tick % spacing;
  if (rem >= 0) return tick - rem;
  return tick - rem - spacing;
};

export const token0ToToken1 = (amount0: bigint, price: bigint | Amount) => {
  price = typeof price === 'bigint' ? price : price.scaled;
  return (amount0 * price) / PRICE_PRECISION;
};
export const token1ToToken0 = (amount1: bigint, price: bigint | Amount) => {
  price = typeof price === 'bigint' ? price : price.scaled;
  return (amount1 * PRICE_PRECISION) / price;
};

export const token0ToToken1AtTick = (amount0: bigint, tick: number) => {
  const price = getPriceAtTick(tick);
  return (amount0 * price) / PRICE_PRECISION;
};
export const token1ToToken0AtTick = (amount1: bigint, tick: number) => {
  const price = getPriceAtTick(tick);
  return (amount1 * PRICE_PRECISION) / price;
};

export const getAmountsFromLiquidity = (
  tickLower: number,
  tickUpper: number,
  liquidity: bigint,
  currentTick: number,
): [bigint, bigint] => {
  const sqrtRatioX96 = getSqrtRatioAtTick(currentTick);
  const sqrtRatioAX96 = getSqrtRatioAtTick(tickLower);
  const sqrtRatioBX96 = getSqrtRatioAtTick(tickUpper);

  let delta0 = 0n;
  let delta1 = 0n;

  if (currentTick < tickLower) {
    delta0 = getAmount0Delta(sqrtRatioAX96, sqrtRatioBX96, liquidity, false);
  } else if (currentTick >= tickUpper) {
    delta1 = getAmount1Delta(sqrtRatioAX96, sqrtRatioBX96, liquidity, false);
  } else {
    delta0 = getAmount0Delta(sqrtRatioX96, sqrtRatioBX96, liquidity, false);
    delta1 = getAmount1Delta(sqrtRatioAX96, sqrtRatioX96, liquidity, false);
  }
  return [BigInt(delta0.toString()), BigInt(delta1.toString())];
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

    const sqrtRatioAX96 = getSqrtRatioAtTick(tickLower);
    const sqrtRatioBX96 = getSqrtRatioAtTick(tickUpper);

    const amount0Delta = getAmount0Delta(
      sqrtRatioAX96,
      sqrtRatioBX96,
      liquidity,
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

    const sqrtRatioAX96 = getSqrtRatioAtTick(tickLower);
    const sqrtRatioBX96 = getSqrtRatioAtTick(tickUpper);

    const amount1Delta = getAmount1Delta(
      sqrtRatioAX96,
      sqrtRatioBX96,
      liquidity,
      false,
    );
    amount1 += BigInt(amount1Delta.toString());
  }
  return amount1;
};

export const liquiditiesToAmounts = (
  liquidities: bigint[],
  startTick: number,
  price: bigint,
  tickSpacing: number,
) => {
  let amount0 = 0n;
  let amount1 = 0n;

  const sqrtRatioX96 = getSqrtPriceX96AtPrice(price);

  for (let i = 0; i < liquidities.length; i++) {
    const liquidity = liquidities[i];
    if (liquidity === BigInt(0)) continue;

    const tickLower = startTick + tickSpacing * i;
    const tickUpper = tickLower + tickSpacing;

    const sqrtRatioAX96 = getSqrtRatioAtTick(tickLower);
    const sqrtRatioBX96 = getSqrtRatioAtTick(tickUpper);

    if (sqrtRatioX96 <= sqrtRatioAX96) {
      const delta0 = getAmount0Delta(
        sqrtRatioAX96,
        sqrtRatioBX96,
        liquidity,
        false,
      );
      amount0 += BigInt(delta0.toString());
    } else if (sqrtRatioX96 < sqrtRatioBX96) {
      const delta0 = getAmount0Delta(
        sqrtRatioX96,
        sqrtRatioBX96,
        liquidity,
        false,
      );
      const delta1 = getAmount1Delta(
        sqrtRatioAX96,
        sqrtRatioX96,
        liquidity,
        false,
      );
      amount0 += BigInt(delta0.toString());
      amount1 += BigInt(delta1.toString());
    } else {
      const delta1 = getAmount1Delta(
        sqrtRatioAX96,
        sqrtRatioBX96,
        liquidity,
        false,
      );
      amount1 += BigInt(delta1.toString());
    }
  }
  return [amount0, amount1];
};
