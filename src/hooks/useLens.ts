import {useQuery} from '@tanstack/react-query';
import {usePublicClient} from 'wagmi';
import {getTimelockLens, getStateView, getQuoter} from '~/lib/contracts';

export const useLens = (): {
  timelockLens: Awaited<ReturnType<typeof getTimelockLens>> | undefined;
  stateView: Awaited<ReturnType<typeof getStateView>> | undefined;
  quoter: Awaited<ReturnType<typeof getQuoter>> | undefined;
} => {
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
  const {data: quoter} = useQuery({
    queryKey: ['quoter', client?.uid],
    queryFn: () => (client ? getQuoter(client) : undefined),
    enabled: !!client,
  });
  return {timelockLens, stateView, quoter};
};
