'use client';
import type {Address} from 'viem';
import React, {createContext, useContext, useMemo, type ReactNode} from 'react';

import {type TimelockMarketData} from '~/lib/contracts';
import {PerpsOperator} from '~/lib/perpsOperator';
import {getTimelockGraphqlClient, getUniv4GraphqlClient} from '~/graphql';

type TimelockContextValue = {
  marketData: Partial<TimelockMarketData>;
  lensAddr?: Address;
  uniswapMathLensAddr?: Address;
  timelockGraphqlUrl?: string;
  timelockGraphqlClient?: ReturnType<typeof getTimelockGraphqlClient>;
  univ4GraphqlClient?: ReturnType<typeof getUniv4GraphqlClient>;
  perpsOperator?: PerpsOperator;
  perpsOperatorReadUrl?: string;
  perpsOperatorWriteUrl?: string;
};

const TimelockContext = createContext<TimelockContextValue | undefined>(
  undefined,
);

export const TimelockProvider = ({
  children,
  marketData,
  timelockGraphqlUrl,
  univ4GraphqlUrl,
  perpsOperatorUrl,
}: {
  children: ReactNode;
  marketData?: Partial<TimelockMarketData>;
  timelockGraphqlUrl?: string;
  univ4GraphqlUrl?: string;
  perpsOperatorUrl?: string;
}) => {
  const timelockGraphqlClient = useMemo(() => {
    if (!timelockGraphqlUrl) return;
    return getTimelockGraphqlClient(timelockGraphqlUrl);
  }, [timelockGraphqlUrl]);

  const univ4GraphqlClient = useMemo(() => {
    if (!univ4GraphqlUrl) return;
    return getUniv4GraphqlClient(univ4GraphqlUrl);
  }, [univ4GraphqlUrl]);

  const perpsOperator = useMemo(() => {
    if (!perpsOperatorUrl) return;
    return new PerpsOperator(perpsOperatorUrl);
  }, [perpsOperatorUrl]);

  const contextValue = useMemo(
    () => ({
      marketData: marketData || {},
      timelockGraphqlUrl,
      univ4GraphqlUrl,
      perpsOperator,
      univ4GraphqlClient,
      timelockGraphqlClient,
      perpsOperatorUrl,
    }),
    [
      marketData,
      timelockGraphqlUrl,
      univ4GraphqlUrl,
      perpsOperator,
      timelockGraphqlClient,
      univ4GraphqlClient,
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
