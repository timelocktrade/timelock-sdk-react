import type {Address} from 'viem';
import {createContext, useContext, useState, type ReactNode} from 'react';
import {useChainId} from 'wagmi';

import {timelockLenses, uniswapMathLenses} from '../lib/contracts';

interface TimelockMarketContextValue {
  marketAddr?: Address;
  lensAddr?: Address;
  uniswapMathLensAddr?: Address;
  setMarketAddr: (address: Address) => void;
}

const TimelockMarketContext = createContext<
  TimelockMarketContextValue | undefined
>(undefined);

export const TimelockMarketProvider = ({children}: {children: ReactNode}) => {
  const chainId = useChainId();
  const [marketAddr, setMarketAddr] = useState<Address | undefined>();

  const lensAddr = timelockLenses[chainId];
  const uniswapMathLensAddr = uniswapMathLenses[chainId];

  return (
    <TimelockMarketContext.Provider
      value={{
        marketAddr,
        setMarketAddr,
        lensAddr,
        uniswapMathLensAddr,
      }}
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
