import {useClient} from 'wagmi';
import {getTimelockLens, getUniswapMathLens} from '../lib/contracts';

export const useLens = () => {
  const client = useClient();
  const timelockLens = client ? getTimelockLens(client) : undefined;
  const uniswapLens = client ? getUniswapMathLens(client) : undefined;

  return {uniswapLens, timelockLens};
};
