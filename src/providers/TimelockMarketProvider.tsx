'use client';
import type {Address} from 'viem';
import React, {createContext, useContext, useMemo, type ReactNode} from 'react';
import {useChainId} from 'wagmi';
import {GraphQLClient} from 'graphql-request';

import {
  type TimelockMarketData,
  timelockLenses,
  uniswapMathLenses,
} from '~/lib/contracts';
import {getSdk} from '~/generated/graphql';

type TimelockMarketContextValue = {
  marketData: Partial<TimelockMarketData>;
  lensAddr?: Address;
  uniswapMathLensAddr?: Address;
  envioGraphqlUrl?: string;
};

const TimelockMarketContext = createContext<
  TimelockMarketContextValue | undefined
>(undefined);

export const TimelockMarketProvider = ({
  children,
  marketData,
  envioGraphqlUrl,
}: {
  children: ReactNode;
  marketData?: Partial<TimelockMarketData>;
  envioGraphqlUrl?: string;
}) => {
  const chainId = useChainId();

  const lensAddr = timelockLenses[chainId];
  const uniswapMathLensAddr = uniswapMathLenses[chainId];

  return (
    <TimelockMarketContext.Provider
      value={{
        marketData: marketData || {},
        lensAddr,
        uniswapMathLensAddr,
        envioGraphqlUrl,
      }}
    >
      {children}
    </TimelockMarketContext.Provider>
  );
};

export const useCurrentMarket = () => {
  const context = useContext(TimelockMarketContext);

  if (context === undefined) {
    throw new Error(
      'useCurrentMarket must be used within a TimelockMarketProvider',
    );
  }
  return context.marketData;
};

export const useTimelockConfig = () => {
  const context = useContext(TimelockMarketContext);

  if (context === undefined) {
    throw new Error('useConfig must be used within a TimelockMarketProvider');
  }
  const graphqlClient = useMemo(() => {
    if (context.envioGraphqlUrl) {
      return getSdk(new GraphQLClient(context.envioGraphqlUrl));
    }
    return undefined;
  }, [context.envioGraphqlUrl]);

  return {
    lensAddr: context.lensAddr,
    uniswapMathLensAddr: context.uniswapMathLensAddr,
    envioGraphqlUrl: context.envioGraphqlUrl,
    graphqlClient,
  };
};
