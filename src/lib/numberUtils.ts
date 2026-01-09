import Big from 'big.js';
import {PRICE_PRECISION} from './liquidityUtils';

export type Amount = {
  scaled: bigint;
  unscaled: Big;
  scalingFactor: Big;
  formatted: string;
};

export const zero: Amount = {
  scaled: 0n,
  unscaled: Big(0),
  scalingFactor: Big(1e18),
  formatted: '0',
};

const scale = (amount: Big | number | string, scalingFactor: Big): bigint => {
  return BigInt(Big(amount).mul(scalingFactor).toFixed(0));
};
const unscale = (amount: bigint, scalingFactor: Big): Big => {
  return Big(amount.toString()).div(scalingFactor);
};

export const wrapAmount = (scaled: bigint, decimals: number): Amount => {
  const scalingFactor = Big(10).pow(decimals);
  const unscaled = unscale(scaled, scalingFactor);
  const formatted = formatAmount(unscaled);
  return {scaled, unscaled, scalingFactor, formatted};
};

export const wrapAmountUnscaled = (
  unscaled: Big | number | string,
  decimals: number,
): Amount => {
  unscaled = Big(unscaled);
  const scalingFactor = Big(10).pow(decimals);
  const scaled = scale(unscaled, scalingFactor);
  const formatted = formatAmount(unscaled);
  return {scaled, unscaled, scalingFactor, formatted};
};

export const wrapPrice = (
  scaled: bigint,
  decimals0: number,
  decimals1: number,
): Amount => {
  const scalingFactor = Big(PRICE_PRECISION.toString())
    .mul(Big(10).pow(decimals1))
    .div(Big(10).pow(decimals0));

  const unscaled = unscale(scaled, scalingFactor);
  const formatted = formatAmount(unscaled);
  return {scaled, unscaled, scalingFactor, formatted};
};

export const wrapPriceUnscaled = (
  unscaled: Big | number | string,
  decimals0: number,
  decimals1: number,
): Amount => {
  unscaled = Big(unscaled);

  const scalingFactor = Big(PRICE_PRECISION.toString())
    .mul(Big(10).pow(decimals1))
    .div(Big(10).pow(decimals0));

  const scaled = scale(unscaled, scalingFactor);
  const formatted = formatAmount(unscaled);

  return {scaled, unscaled, scalingFactor, formatted};
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
