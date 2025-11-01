import type {Address} from 'viem';
import {useQuery} from '@tanstack/react-query';
import {useTimelockConfig} from '~/providers/TimelockMarketProvider';
import {EMPTY_ARRAY} from '~/lib/numberUtils';

export type OptionTimelineData = ReturnType<typeof useOptionTimeline>['data'];

export const useOptionTimeline = (marketAddr?: Address, optionId?: bigint) => {
  const {graphqlClient} = useTimelockConfig();
  marketAddr = marketAddr?.toLowerCase() as Address | undefined;

  const {data, ...rest} = useQuery({
    queryKey: [
      'optionTimeline',
      marketAddr || '--',
      optionId?.toString() || '--',
    ],
    queryFn: async () => {
      if (!graphqlClient || !marketAddr || optionId === undefined) {
        return [];
      }
      const result = await graphqlClient.GetOptionEvents({
        marketAddr: marketAddr,
        optionId: optionId.toString(),
      });

      const mintEvents = result.MintOptionEvent.map(event => ({
        id: event.id,
        optionType: event.optionType as 0 | 1,
        strikeTick: event.strikeTick,
        currentTick: event.currentTick,
        expiresAt: new Date(Number(event.expiresAt) * 1000),
        premium: BigInt(event.premium),
        protocolFee: BigInt(event.protocolFee),
        liquidities: event.liquidities.map(l => BigInt(l)),
        timestamp: new Date(Number(event.timestamp) * 1000),
        blockNumber: BigInt(event.blockNumber),
        transactionHash: event.transactionHash,
      }));
      const exerciseEvents = result.ExerciseOptionEvent.map(event => ({
        id: event.id,
        liquidities: event.liquidities.map(l => BigInt(l)),
        currentTick: event.currentTick,
        payout: BigInt(event.payout),
        timestamp: new Date(Number(event.timestamp) * 1000),
        blockNumber: BigInt(event.blockNumber),
        transactionHash: event.transactionHash,
      }));
      const extendEvents = result.ExtendOptionEvent.map(event => ({
        id: event.id,
        premium: BigInt(event.premium),
        protocolFee: BigInt(event.protocolFee),
        currentTick: event.currentTick,
        addedDuration: BigInt(event.addedDuration),
        timestamp: new Date(Number(event.timestamp) * 1000),
        blockNumber: BigInt(event.blockNumber),
        transactionHash: event.transactionHash,
      }));

      type MintEvent = {type: 'mint'; data: (typeof mintEvents)[number]};
      type ExerciseEvent = {
        type: 'exercise';
        data: (typeof exerciseEvents)[number];
      };
      type ExtendEvent = {type: 'extend'; data: (typeof extendEvents)[number]};
      type OptionEvent = MintEvent | ExerciseEvent | ExtendEvent;

      const events: OptionEvent[] = [
        ...mintEvents.map(data => ({type: 'mint', data}) as const),
        ...exerciseEvents.map(data => ({type: 'exercise', data}) as const),
        ...extendEvents.map(data => ({type: 'extend', data}) as const),
      ];
      return events.sort(
        (a, b) => a.data.timestamp.getTime() - b.data.timestamp.getTime(),
      );
    },
    enabled: !!marketAddr && optionId !== undefined && !!graphqlClient,
  });
  return {data: data || EMPTY_ARRAY, ...rest};
};
