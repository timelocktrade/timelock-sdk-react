'use client';
import type {Address} from 'viem';
import React, {createContext, useContext, useMemo, type ReactNode} from 'react';
import {GraphQLClient} from 'graphql-request';

import {getSdk as getTimelockGraphqlSdk} from '~/generated/timelock';
import {getSdk as getUniV4GraphqlSdk} from '~/generated/univ4';

import {type TimelockMarketData} from '~/lib/contracts';
import {PerpsOperator} from '~/lib/perpsOperator';

type TimelockContextValue = {
  marketData: Partial<TimelockMarketData>;
  lensAddr?: Address;
  uniswapMathLensAddr?: Address;
  timelockGraphqlUrl?: string;
  timelockGraphqlClient?: ReturnType<typeof getTimelockGraphqlSdk>;
  uniV4GraphqlClient?: ReturnType<typeof getUniV4GraphqlSdk>;
  perpsOperator?: PerpsOperator;
  perpsOperatorUrl?: string;
};

const TimelockContext = createContext<TimelockContextValue | undefined>(
  undefined,
);

export const TimelockProvider = ({
  children,
  marketData,
  timelockGraphqlUrl,
  uniV4GraphqlUrl,
  perpsOperatorUrl,
}: {
  children: ReactNode;
  marketData?: Partial<TimelockMarketData>;
  timelockGraphqlUrl?: string;
  uniV4GraphqlUrl?: string;
  perpsOperatorUrl?: string;
}) => {
  const timelockGraphqlClient = useMemo(() => {
    if (timelockGraphqlUrl) {
      return getTimelockGraphqlSdk(new GraphQLClient(timelockGraphqlUrl));
    }
    return undefined;
  }, [timelockGraphqlUrl]);

  const uniV4GraphqlClient = useMemo(() => {
    if (uniV4GraphqlUrl) {
      return getUniV4GraphqlSdk(new GraphQLClient(uniV4GraphqlUrl));
    }
    return undefined;
  }, [uniV4GraphqlUrl]);

  const perpsOperator = useMemo(() => {
    if (perpsOperatorUrl) {
      return new PerpsOperator(perpsOperatorUrl);
    }
    return undefined;
  }, [perpsOperatorUrl]);

  const contextValue = useMemo(
    () => ({
      marketData: marketData || {},
      timelockGraphqlUrl,
      uniV4GraphqlUrl,
      perpsOperator,
      uniV4GraphqlClient,
      timelockGraphqlClient,
      perpsOperatorUrl,
    }),
    [
      marketData,
      timelockGraphqlUrl,
      uniV4GraphqlUrl,
      perpsOperator,
      timelockGraphqlClient,
      uniV4GraphqlClient,
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
