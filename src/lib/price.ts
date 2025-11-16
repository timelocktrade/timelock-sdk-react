import type {Address} from 'viem';

export interface PriceData {
  currentPrice: number;
  percentChange: number;
  poolAddress: string;
  timestamp: number;
}

export interface PriceDataPoint {
  timestamp: Date;
  price: number;
}

export type PriceResolution = '1m' | '5m' | '15m' | '1h' | '4h' | '1d';

const getResolutionConfig = (resolution: PriceResolution) => {
  const resolutionMap = {
    '1m': {timeframe: 'minute', aggregate: '1', seconds: 60},
    '5m': {timeframe: 'minute', aggregate: '5', seconds: 300},
    '15m': {timeframe: 'minute', aggregate: '15', seconds: 900},
    '1h': {timeframe: 'hour', aggregate: '1', seconds: 3600},
    '4h': {timeframe: 'hour', aggregate: '4', seconds: 14400},
    '1d': {timeframe: 'day', aggregate: '1', seconds: 86400},
  };
  return resolutionMap[resolution];
};

const fillGaps = (
  prices: PriceDataPoint[],
  start: Date,
  end: Date,
  intervalMs: number,
): PriceDataPoint[] => {
  if (prices.length === 0) return [];

  const priceMap = new Map<number, PriceDataPoint>();

  for (const point of prices) {
    const alignedTime =
      Math.floor(point.timestamp.getTime() / intervalMs) * intervalMs;
    priceMap.set(alignedTime, point);
  }
  const filled: PriceDataPoint[] = [];

  const actualStart =
    Math.floor(prices[0].timestamp.getTime() / intervalMs) * intervalMs;

  let currentTime = actualStart;
  let lastKnownPrice: PriceDataPoint | null = null;

  while (currentTime <= end.getTime()) {
    const existing = priceMap.get(currentTime);

    if (existing) {
      filled.push(existing);
      lastKnownPrice = existing;
    } else if (lastKnownPrice) {
      filled.push({
        timestamp: new Date(currentTime),
        price: lastKnownPrice.price,
      });
    }
    currentTime += intervalMs;
  }
  return filled;
};

export const getPriceHistory = async (
  pool: Address,
  token: 0 | 1,
  resolution: PriceResolution,
  start: Date,
  end: Date,
): Promise<PriceDataPoint[]> => {
  const network = 'monad-testnet';
  const {timeframe, aggregate, seconds} = getResolutionConfig(resolution);

  if (end.getTime() > Date.now()) {
    end = new Date(Date.now());
  }
  const startSecs = Math.floor(start.getTime() / 1000);
  const endSecs = Math.floor(end.getTime() / 1000);
  const diffSeconds = endSecs - startSecs;

  const limit = Math.min(Math.ceil(diffSeconds / seconds), 1000);

  const url =
    `https://api.geckoterminal.com/api/v2/networks/${network}/pools/${pool}/ohlcv/${timeframe}` +
    `?aggregate=${aggregate}` +
    `&limit=${limit}` +
    `&token=${token === 0 ? 'base' : 'quote'}` +
    '&currency=usd' +
    `&before_timestamp=${endSecs}`;

  const res = await fetch(url, {headers: {Accept: 'application/json'}});

  if (!res.ok) {
    throw new Error(`Failed to fetch price history: ${res.statusText}`);
  }
  const data = (await res.json()) as {
    data: {
      attributes: {
        ohlcv_list: [number, number, number, number, number, number][];
      };
    };
  };
  const prices: PriceDataPoint[] = data.data.attributes.ohlcv_list
    .map(([timestamp, , , , close]) => ({
      timestamp: new Date(timestamp * 1000),
      price: close,
    }))
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  return fillGaps(prices, start, end, seconds * 1000).filter(
    point =>
      point.timestamp.getTime() / 1000 >= startSecs &&
      point.timestamp.getTime() / 1000 <= endSecs,
  );
};

export const getCurrentPrice = async (
  poolAddress: string,
): Promise<PriceData> => {
  const network = 'monad-testnet';
  const geckoUrl = `https://api.geckoterminal.com/api/v2/networks/${network}/pools/${poolAddress.toLowerCase()}`;

  const response = await fetch(geckoUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'User-Agent': 'TimelockTrade/1.0',
    },
    cache: 'no-store', // Keep no-store for real-time data
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch price data for pool ${poolAddress}`);
  }
  const data = (await response.json()) as {
    data: {
      attributes: {
        quote_token_price_usd: string;
        price_change_percentage: {h24: string};
      };
    };
  };
  const pool = data.data.attributes;

  return {
    currentPrice: parseFloat(pool.quote_token_price_usd || '0'),
    percentChange: parseFloat(pool.price_change_percentage?.h24 || '0'),
    poolAddress: poolAddress,
    timestamp: Date.now(),
  };
};
