import Big from 'big.js';

export type Amount = {
  scaled: bigint;
  unscaled: Big;
  decimals: number;
  formatted: string;
};

export const zero: Amount = {
  scaled: 0n,
  unscaled: Big(0),
  decimals: 18,
  formatted: '0',
};

export const wrapAmount = (scaled: bigint, decimals: number): Amount => {
  const unscaled = unscaleAmount(scaled, decimals);
  const formatted = formatAmount(unscaled);
  return {scaled, unscaled, decimals, formatted};
};

export const wrapAmountUnscaled = (
  unscaled: Big | number | string,
  decimals: number,
): Amount => {
  unscaled = Big(unscaled);
  const scaled = scaleAmount(unscaled, decimals);
  const formatted = formatAmount(unscaled);
  return {scaled, unscaled, decimals, formatted};
};

export const wrapPrice = (
  scaled: bigint,
  decimals0: number,
  decimals1: number,
): Amount => {
  const unscaled = unscalePrice(scaled, decimals0, decimals1);
  const formatted = formatAmount(unscaled);
  return {scaled, unscaled, decimals: 36 + decimals1 - decimals0, formatted};
};

export const wrapPriceUnscaled = (
  unscaled: Big | number | string,
  decimals0: number,
  decimals1: number,
): Amount => {
  unscaled = Big(unscaled);
  const scaled = scalePrice(unscaled, decimals0, decimals1);
  const formatted = formatAmount(unscaled);
  return {scaled, unscaled, decimals: 36 + decimals1 - decimals0, formatted};
};

export const unscaleAmount = (scaled: bigint, decimals: number) => {
  return new Big(scaled.toString()).div(new Big(10).pow(decimals));
};

export const scaleAmount = (
  unscaled: Big | number | string,
  decimals: number,
) => {
  return BigInt(
    Big(unscaled).mul(new Big(10).pow(decimals)).round().toFixed(0),
  );
};

export const unscalePrice = (
  scaled: bigint,
  decimals0: number,
  decimals1: number,
  precision = 18,
) => {
  return new Big(scaled.toString())
    .mul(new Big(10).pow(decimals0))
    .div(new Big(10).pow(decimals1))
    .div(new Big(10).pow(precision));
};

export const scalePrice = (
  unscaled: Big | number | string,
  decimals0: number,
  decimals1: number,
  precision = 18,
) => {
  return BigInt(
    Big(unscaled)
      .mul(new Big(10).pow(precision))
      .mul(new Big(10).pow(decimals1))
      .div(new Big(10).pow(decimals0))
      .round()
      .toFixed(0),
  );
};

export const formatAmount = (value?: Big | number | string) => {
  if (!value) return '-';
  value = new Big(value);

  if (value.gte(1e8)) return formatVagueAmount(value, 2);
  return formatCondensed(Big(value).toFixed(100));
};

export const formatVagueAmount = (
  value: Big | number | bigint | string,
  fractionDigits = 2,
) => {
  value = Number(value);
  if (value === 0) return '0';

  const formatted = value.toExponential(fractionDigits);
  return formatted.replace(/\.?0+e/, 'e').replace(/e\+/, 'e');
};

export const formatCondensed = (
  input: string | number,
  decimals = 2,
): string => {
  const str = (typeof input === 'number' ? input.toFixed(20) : input)
    .replace(/(\.\d*?)0+$/, '$1')
    .replace(/\.$/, '');

  const [whole, decimal] = str.split('.');

  const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (!decimal) return formattedWhole;

  const leadingZeroMatch = decimal.match(/^(0{3,})/);

  if (leadingZeroMatch) {
    const zeroCount = leadingZeroMatch[1].length;
    const subscript = toSubscript(zeroCount.toString());
    const remaining = decimal.slice(zeroCount);

    const twoDigits = remaining.slice(0, decimals);
    return `${formattedWhole}.0${subscript}${twoDigits}`;
  } else {
    // No subscript needed, find first 2 significant digits
    const nonZeroStart = decimal.search(/[1-9]/); // Find first non-zero digit

    if (nonZeroStart === -1) {
      return formattedWhole; // All zeros
    }
    const significantPart = decimal.slice(nonZeroStart);
    const twoDigits = significantPart.slice(0, decimals);
    const leadingZeros = decimal.slice(0, nonZeroStart);

    return `${formattedWhole}.${leadingZeros}${twoDigits}`;
  }
};

const toSubscript = (input: string) => {
  return input.replace(/[0-9]/g, m => '₀₁₂₃₄₅₆₇₈₉'[+m]);
};

export const formatUSD = (value: Big | string | number): string => {
  return '$' + formatAmount(value);
};
