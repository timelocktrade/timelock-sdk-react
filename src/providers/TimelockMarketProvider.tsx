'use client';
import type {Address} from 'viem';
import {createContext, useContext, type ReactNode} from 'react';
import {useChainId} from 'wagmi';

import type {TimelockMarketData} from '../hooks/market/useMarketData';
import {timelockLenses, uniswapMathLenses} from '../lib/contracts';

type TimelockMarketContextValue = Partial<TimelockMarketData> & {
  lensAddr?: Address;
  uniswapMathLensAddr?: Address;
};

const TimelockMarketContext = createContext<
  TimelockMarketContextValue | undefined
>(undefined);

export const TimelockMarketProvider = ({
  children,
  marketData,
}: {
  children: ReactNode;
  marketData: Partial<TimelockMarketData>;
}) => {
  const chainId = useChainId();

  const lensAddr = timelockLenses[chainId];
  const uniswapMathLensAddr = uniswapMathLenses[chainId];

  return (
    <TimelockMarketContext.Provider
      value={{...marketData, lensAddr, uniswapMathLensAddr}}
    >
      {children}
    </TimelockMarketContext.Provider>
  );
};

export const useCurrentMarket = (): TimelockMarketContextValue => {
  const context = useContext(TimelockMarketContext);

  if (context === undefined) {
    throw new Error(
      'useCurrentMarket must be used within a TimelockMarketProvider',
    );
  }
  return context;
};
