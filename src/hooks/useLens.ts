import {useQuery} from '@tanstack/react-query';
import {usePublicClient} from 'wagmi';
import {getTimelockLens, getStateView} from '../lib/contracts';

export const useLens = () => {
  const client = usePublicClient();

  const {data: timelockLens} = useQuery({
    queryKey: ['timelockLens', client?.uid],
    queryFn: () => (client ? getTimelockLens(client) : undefined),
    enabled: !!client,
  });
  const {data: stateView} = useQuery({
    queryKey: ['stateView', client?.uid],
    queryFn: () => (client ? getStateView(client) : undefined),
    enabled: !!client,
  });
  return {timelockLens, stateView};
};
