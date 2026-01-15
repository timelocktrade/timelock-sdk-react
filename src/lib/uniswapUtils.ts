export const MIN_TICK = -887272;
export const MAX_TICK = -MIN_TICK;

export const MIN_SQRT_RATIO = 4295128739n;
export const MAX_SQRT_RATIO =
  1461446703485210103287273052203988822378723970342n;

const Q32 = 1n << 32n;
const MaxUint256 = (1n << 256n) - 1n;

const mulShift = (val: bigint, mulBy: bigint): bigint => {
  return (val * mulBy) >> 128n;
};

export const getSqrtRatioAtTick = (tick: number): bigint => {
  if (!(tick >= MIN_TICK && tick <= MAX_TICK && Number.isInteger(tick))) {
    throw new Error('TICK');
  }
  const absTick: number = tick < 0 ? tick * -1 : tick;

  let ratio: bigint =
    (absTick & 0x1) !== 0
      ? 0xfffcb933bd6fad37aa2d162d1a594001n
      : 0x100000000000000000000000000000000n;
  if ((absTick & 0x2) !== 0)
    ratio = mulShift(ratio, 0xfff97272373d413259a46990580e213an);
  if ((absTick & 0x4) !== 0)
    ratio = mulShift(ratio, 0xfff2e50f5f656932ef12357cf3c7fdccn);
  if ((absTick & 0x8) !== 0)
    ratio = mulShift(ratio, 0xffe5caca7e10e4e61c3624eaa0941cd0n);
  if ((absTick & 0x10) !== 0)
    ratio = mulShift(ratio, 0xffcb9843d60f6159c9db58835c926644n);
  if ((absTick & 0x20) !== 0)
    ratio = mulShift(ratio, 0xff973b41fa98c081472e6896dfb254c0n);
  if ((absTick & 0x40) !== 0)
    ratio = mulShift(ratio, 0xff2ea16466c96a3843ec78b326b52861n);
  if ((absTick & 0x80) !== 0)
    ratio = mulShift(ratio, 0xfe5dee046a99a2a811c461f1969c3053n);
  if ((absTick & 0x100) !== 0)
    ratio = mulShift(ratio, 0xfcbe86c7900a88aedcffc83b479aa3a4n);
  if ((absTick & 0x200) !== 0)
    ratio = mulShift(ratio, 0xf987a7253ac413176f2b074cf7815e54n);
  if ((absTick & 0x400) !== 0)
    ratio = mulShift(ratio, 0xf3392b0822b70005940c7a398e4b70f3n);
  if ((absTick & 0x800) !== 0)
    ratio = mulShift(ratio, 0xe7159475a2c29b7443b29c7fa6e889d9n);
  if ((absTick & 0x1000) !== 0)
    ratio = mulShift(ratio, 0xd097f3bdfd2022b8845ad8f792aa5825n);
  if ((absTick & 0x2000) !== 0)
    ratio = mulShift(ratio, 0xa9f746462d870fdf8a65dc1f90e061e5n);
  if ((absTick & 0x4000) !== 0)
    ratio = mulShift(ratio, 0x70d869a156d2a1b890bb3df62baf32f7n);
  if ((absTick & 0x8000) !== 0)
    ratio = mulShift(ratio, 0x31be135f97d08fd981231505542fcfa6n);
  if ((absTick & 0x10000) !== 0)
    ratio = mulShift(ratio, 0x9aa508b5b7a84e1c677de54f3e99bc9n);
  if ((absTick & 0x20000) !== 0)
    ratio = mulShift(ratio, 0x5d6af8dedb81196699c329225ee604n);
  if ((absTick & 0x40000) !== 0)
    ratio = mulShift(ratio, 0x2216e584f5fa1ea926041bedfe98n);
  if ((absTick & 0x80000) !== 0)
    ratio = mulShift(ratio, 0x48a170391f7dc42444e8fa2n);

  if (tick > 0) ratio = MaxUint256 / ratio;

  // back to Q96
  return ratio % Q32 > 0n ? ratio / Q32 + 1n : ratio / Q32;
};

const mostSignificantBit = (x: bigint): number => {
  if (x <= 0n) {
    throw new Error('ZERO');
  }
  if (x > MaxUint256) {
    throw new Error('MAX');
  }
  let msb = 0;
  let value = x;
  for (let power = 128; power >= 1; power >>= 1) {
    const powerBigInt = BigInt(power);
    if (value >= 1n << powerBigInt) {
      value >>= powerBigInt;
      msb += power;
    }
  }
  return msb;
};

export const getTickAtSqrtRatio = (sqrtRatioX96: bigint): number => {
  if (!(sqrtRatioX96 >= MIN_SQRT_RATIO && sqrtRatioX96 < MAX_SQRT_RATIO)) {
    throw new Error('SQRT_RATIO');
  }
  const sqrtRatioX128 = sqrtRatioX96 << 32n;

  const msb = mostSignificantBit(sqrtRatioX128);

  let r: bigint;
  if (msb >= 128) {
    r = sqrtRatioX128 >> BigInt(msb - 127);
  } else {
    r = sqrtRatioX128 << BigInt(127 - msb);
  }

  let log_2: bigint = BigInt(msb - 128) << 64n;

  for (let i = 0; i < 14; i++) {
    r = (r * r) >> 127n;
    const f = r >> 128n;
    log_2 = log_2 | (f << BigInt(63 - i));
    r = r >> f;
  }
  const log_sqrt10001 = log_2 * 255738958999603826347141n;

  const tickLow = Number(
    (log_sqrt10001 - 3402992956809132418596140100660247210n) >> 128n,
  );
  const tickHigh = Number(
    (log_sqrt10001 + 291339464771989622907027621153398088495n) >> 128n,
  );

  return tickLow === tickHigh
    ? tickLow
    : getSqrtRatioAtTick(tickHigh) <= sqrtRatioX96
      ? tickHigh
      : tickLow;
};

const Q96 = 1n << 96n;

const mulDivRoundingUp = (
  a: bigint,
  b: bigint,
  denominator: bigint,
): bigint => {
  const result = (a * b) / denominator;
  if ((a * b) % denominator > 0n) {
    return result + 1n;
  }
  return result;
};

export const getAmount0Delta = (
  sqrtRatioAX96: bigint,
  sqrtRatioBX96: bigint,
  liquidity: bigint,
  roundUp: boolean,
): bigint => {
  if (sqrtRatioAX96 > sqrtRatioBX96) {
    [sqrtRatioAX96, sqrtRatioBX96] = [sqrtRatioBX96, sqrtRatioAX96];
  }

  const numerator1 = liquidity << 96n;
  const numerator2 = sqrtRatioBX96 - sqrtRatioAX96;

  return roundUp
    ? mulDivRoundingUp(
        mulDivRoundingUp(numerator1, numerator2, sqrtRatioBX96),
        1n,
        sqrtRatioAX96,
      )
    : (numerator1 * numerator2) / sqrtRatioBX96 / sqrtRatioAX96;
};

export const getAmount1Delta = (
  sqrtRatioAX96: bigint,
  sqrtRatioBX96: bigint,
  liquidity: bigint,
  roundUp: boolean,
): bigint => {
  if (sqrtRatioAX96 > sqrtRatioBX96) {
    [sqrtRatioAX96, sqrtRatioBX96] = [sqrtRatioBX96, sqrtRatioAX96];
  }

  return roundUp
    ? mulDivRoundingUp(liquidity, sqrtRatioBX96 - sqrtRatioAX96, Q96)
    : (liquidity * (sqrtRatioBX96 - sqrtRatioAX96)) / Q96;
};
