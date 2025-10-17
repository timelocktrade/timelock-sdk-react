import {useMemo} from 'react';
import {useClient} from 'wagmi';
import {getTimelockLens, getUniswapMathLens} from '../lib/contracts';

export const useLens = () => {
  const client = useClient();

  return useMemo(
    () => ({
      timelockLens: client ? getTimelockLens(client) : undefined,
      uniswapLens: client ? getUniswapMathLens(client) : undefined,
    }),
    [client],
  );
};
