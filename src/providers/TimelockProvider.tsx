'use client';
import type {Address} from 'viem';
import React, {createContext, useContext, useMemo, type ReactNode} from 'react';
import {useChainId} from 'wagmi';
import {GraphQLClient} from 'graphql-request';

import {getSdk} from '~/generated/graphql';
import {
  type TimelockMarketData,
  timelockLenses,
  uniswapMathLenses,
} from '~/lib/contracts';

type TimelockContextValue = {
  marketData: Partial<TimelockMarketData>;
  lensAddr?: Address;
  uniswapMathLensAddr?: Address;
  envioGraphqlUrl?: string;
  graphqlClient?: ReturnType<typeof getSdk>;
  perpsOperatorUrl?: string;
};

const TimelockContext = createContext<TimelockContextValue | undefined>(
  undefined,
);

export const TimelockProvider = ({
  children,
  marketData,
  envioGraphqlUrl,
  perpsOperatorUrl,
}: {
  children: ReactNode;
  marketData?: Partial<TimelockMarketData>;
  envioGraphqlUrl?: string;
  perpsOperatorUrl?: string;
}) => {
  const chainId = useChainId();

  const lensAddr = timelockLenses[chainId];
  const uniswapMathLensAddr = uniswapMathLenses[chainId];

  const graphqlClient = useMemo(() => {
    if (envioGraphqlUrl) {
      return getSdk(new GraphQLClient(envioGraphqlUrl));
    }
    return undefined;
  }, [envioGraphqlUrl]);

  const contextValue = useMemo(
    () => ({
      marketData: marketData || {},
      lensAddr,
      uniswapMathLensAddr,
      envioGraphqlUrl,
      graphqlClient,
      perpsOperatorUrl,
    }),
    [
      marketData,
      lensAddr,
      uniswapMathLensAddr,
      envioGraphqlUrl,
      graphqlClient,
      perpsOperatorUrl,
    ],
  );

  return (
    <TimelockContext.Provider value={contextValue}>
      {children}
    </TimelockContext.Provider>
  );
};

export const useCurrentMarket = () => {
  const context = useContext(TimelockContext);

  if (context === undefined) {
    throw new Error('useCurrentMarket must be used within a TimelockProvider');
  }
  return context.marketData;
};

export const useTimelockConfig = () => {
  const context = useContext(TimelockContext);

  if (context === undefined) {
    throw new Error('useConfig must be used within a TimelockProvider');
  }
  return context;
};
