import {GraphQLClient, RequestOptions} from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {[key: string]: unknown}, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | {[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never};
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: {input: string; output: string};
  String: {input: string; output: string};
  Boolean: {input: boolean; output: boolean};
  Int: {input: number; output: number};
  Float: {input: number; output: number};
  jsonb: {input: any; output: any};
  numeric: {input: any; output: any};
  timestamptz: {input: any; output: any};
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** columns and relationships of "HookStats" */
export type HookStats = {
  __typename: 'HookStats';
  fees0: Scalars['numeric']['output'];
  fees1: Scalars['numeric']['output'];
  firstPoolCreatedAt: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  poolCount: Scalars['numeric']['output'];
  swapCount: Scalars['numeric']['output'];
  tvl0: Scalars['numeric']['output'];
  tvl1: Scalars['numeric']['output'];
  volume0: Scalars['numeric']['output'];
  volume1: Scalars['numeric']['output'];
};

/** Boolean expression to filter rows from the table "HookStats". All fields are combined with a logical 'AND'. */
export type HookStatsBoolExp = {
  _and?: InputMaybe<Array<HookStatsBoolExp>>;
  _not?: InputMaybe<HookStatsBoolExp>;
  _or?: InputMaybe<Array<HookStatsBoolExp>>;
  fees0?: InputMaybe<NumericComparisonExp>;
  fees1?: InputMaybe<NumericComparisonExp>;
  firstPoolCreatedAt?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  poolCount?: InputMaybe<NumericComparisonExp>;
  swapCount?: InputMaybe<NumericComparisonExp>;
  tvl0?: InputMaybe<NumericComparisonExp>;
  tvl1?: InputMaybe<NumericComparisonExp>;
  volume0?: InputMaybe<NumericComparisonExp>;
  volume1?: InputMaybe<NumericComparisonExp>;
};

/** Ordering options when selecting data from "HookStats". */
export type HookStatsOrderBy = {
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  firstPoolCreatedAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  poolCount?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tvl0?: InputMaybe<OrderBy>;
  tvl1?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** select columns of table "HookStats" */
export type HookStatsSelectColumn =
  /** column name */
  | 'fees0'
  /** column name */
  | 'fees1'
  /** column name */
  | 'firstPoolCreatedAt'
  /** column name */
  | 'id'
  /** column name */
  | 'poolCount'
  /** column name */
  | 'swapCount'
  /** column name */
  | 'tvl0'
  /** column name */
  | 'tvl1'
  /** column name */
  | 'volume0'
  /** column name */
  | 'volume1';

/** Streaming cursor of the table "HookStats" */
export type HookStatsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: HookStatsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HookStatsStreamCursorValueInput = {
  fees0?: InputMaybe<Scalars['numeric']['input']>;
  fees1?: InputMaybe<Scalars['numeric']['input']>;
  firstPoolCreatedAt?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  poolCount?: InputMaybe<Scalars['numeric']['input']>;
  swapCount?: InputMaybe<Scalars['numeric']['input']>;
  tvl0?: InputMaybe<Scalars['numeric']['input']>;
  tvl1?: InputMaybe<Scalars['numeric']['input']>;
  volume0?: InputMaybe<Scalars['numeric']['input']>;
  volume1?: InputMaybe<Scalars['numeric']['input']>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** columns and relationships of "LiquidityProvider" */
export type LiquidityProvider = {
  __typename: 'LiquidityProvider';
  address: Scalars['String']['output'];
  createdAtBlockNumber: Scalars['numeric']['output'];
  createdAtTimestamp: Scalars['numeric']['output'];
  deposited0: Scalars['numeric']['output'];
  deposited1: Scalars['numeric']['output'];
  fees0: Scalars['numeric']['output'];
  fees1: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  modifyLiquidityCount: Scalars['numeric']['output'];
  positionCount: Scalars['numeric']['output'];
  /** An array relationship */
  positions: Array<Position>;
  withdrawn0: Scalars['numeric']['output'];
  withdrawn1: Scalars['numeric']['output'];
};

/** columns and relationships of "LiquidityProvider" */
export type LiquidityProviderPositionsArgs = {
  distinct_on?: InputMaybe<Array<PositionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PositionOrderBy>>;
  where?: InputMaybe<PositionBoolExp>;
};

/** Boolean expression to filter rows from the table "LiquidityProvider". All fields are combined with a logical 'AND'. */
export type LiquidityProviderBoolExp = {
  _and?: InputMaybe<Array<LiquidityProviderBoolExp>>;
  _not?: InputMaybe<LiquidityProviderBoolExp>;
  _or?: InputMaybe<Array<LiquidityProviderBoolExp>>;
  address?: InputMaybe<StringComparisonExp>;
  createdAtBlockNumber?: InputMaybe<NumericComparisonExp>;
  createdAtTimestamp?: InputMaybe<NumericComparisonExp>;
  deposited0?: InputMaybe<NumericComparisonExp>;
  deposited1?: InputMaybe<NumericComparisonExp>;
  fees0?: InputMaybe<NumericComparisonExp>;
  fees1?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  modifyLiquidityCount?: InputMaybe<NumericComparisonExp>;
  positionCount?: InputMaybe<NumericComparisonExp>;
  positions?: InputMaybe<PositionBoolExp>;
  withdrawn0?: InputMaybe<NumericComparisonExp>;
  withdrawn1?: InputMaybe<NumericComparisonExp>;
};

/** Ordering options when selecting data from "LiquidityProvider". */
export type LiquidityProviderOrderBy = {
  address?: InputMaybe<OrderBy>;
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  deposited0?: InputMaybe<OrderBy>;
  deposited1?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  positionCount?: InputMaybe<OrderBy>;
  positions_aggregate?: InputMaybe<PositionAggregateOrderBy>;
  withdrawn0?: InputMaybe<OrderBy>;
  withdrawn1?: InputMaybe<OrderBy>;
};

/** select columns of table "LiquidityProvider" */
export type LiquidityProviderSelectColumn =
  /** column name */
  | 'address'
  /** column name */
  | 'createdAtBlockNumber'
  /** column name */
  | 'createdAtTimestamp'
  /** column name */
  | 'deposited0'
  /** column name */
  | 'deposited1'
  /** column name */
  | 'fees0'
  /** column name */
  | 'fees1'
  /** column name */
  | 'id'
  /** column name */
  | 'modifyLiquidityCount'
  /** column name */
  | 'positionCount'
  /** column name */
  | 'withdrawn0'
  /** column name */
  | 'withdrawn1';

/** Streaming cursor of the table "LiquidityProvider" */
export type LiquidityProviderStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: LiquidityProviderStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type LiquidityProviderStreamCursorValueInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  createdAtBlockNumber?: InputMaybe<Scalars['numeric']['input']>;
  createdAtTimestamp?: InputMaybe<Scalars['numeric']['input']>;
  deposited0?: InputMaybe<Scalars['numeric']['input']>;
  deposited1?: InputMaybe<Scalars['numeric']['input']>;
  fees0?: InputMaybe<Scalars['numeric']['input']>;
  fees1?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  modifyLiquidityCount?: InputMaybe<Scalars['numeric']['input']>;
  positionCount?: InputMaybe<Scalars['numeric']['input']>;
  withdrawn0?: InputMaybe<Scalars['numeric']['input']>;
  withdrawn1?: InputMaybe<Scalars['numeric']['input']>;
};

/** columns and relationships of "ModifyLiquidity" */
export type ModifyLiquidity = {
  __typename: 'ModifyLiquidity';
  amount: Scalars['numeric']['output'];
  amount0: Scalars['numeric']['output'];
  amount1: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  logIndex: Scalars['numeric']['output'];
  origin: Scalars['String']['output'];
  /** An object relationship */
  pool?: Maybe<Pool>;
  pool_id: Scalars['String']['output'];
  sender: Scalars['String']['output'];
  tickLower: Scalars['numeric']['output'];
  tickUpper: Scalars['numeric']['output'];
  timestamp: Scalars['numeric']['output'];
  /** An object relationship */
  token0?: Maybe<Token>;
  token0_id: Scalars['String']['output'];
  /** An object relationship */
  token1?: Maybe<Token>;
  token1_id: Scalars['String']['output'];
  /** An object relationship */
  transaction?: Maybe<Transaction>;
  transaction_id: Scalars['String']['output'];
};

/** order by aggregate values of table "ModifyLiquidity" */
export type ModifyLiquidityAggregateOrderBy = {
  avg?: InputMaybe<ModifyLiquidityAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<ModifyLiquidityMaxOrderBy>;
  min?: InputMaybe<ModifyLiquidityMinOrderBy>;
  stddev?: InputMaybe<ModifyLiquidityStddevOrderBy>;
  stddev_pop?: InputMaybe<ModifyLiquidityStddevPopOrderBy>;
  stddev_samp?: InputMaybe<ModifyLiquidityStddevSampOrderBy>;
  sum?: InputMaybe<ModifyLiquiditySumOrderBy>;
  var_pop?: InputMaybe<ModifyLiquidityVarPopOrderBy>;
  var_samp?: InputMaybe<ModifyLiquidityVarSampOrderBy>;
  variance?: InputMaybe<ModifyLiquidityVarianceOrderBy>;
};

/** order by avg() on columns of table "ModifyLiquidity" */
export type ModifyLiquidityAvgOrderBy = {
  amount?: InputMaybe<OrderBy>;
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "ModifyLiquidity". All fields are combined with a logical 'AND'. */
export type ModifyLiquidityBoolExp = {
  _and?: InputMaybe<Array<ModifyLiquidityBoolExp>>;
  _not?: InputMaybe<ModifyLiquidityBoolExp>;
  _or?: InputMaybe<Array<ModifyLiquidityBoolExp>>;
  amount?: InputMaybe<NumericComparisonExp>;
  amount0?: InputMaybe<NumericComparisonExp>;
  amount1?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  logIndex?: InputMaybe<NumericComparisonExp>;
  origin?: InputMaybe<StringComparisonExp>;
  pool?: InputMaybe<PoolBoolExp>;
  pool_id?: InputMaybe<StringComparisonExp>;
  sender?: InputMaybe<StringComparisonExp>;
  tickLower?: InputMaybe<NumericComparisonExp>;
  tickUpper?: InputMaybe<NumericComparisonExp>;
  timestamp?: InputMaybe<NumericComparisonExp>;
  token0?: InputMaybe<TokenBoolExp>;
  token0_id?: InputMaybe<StringComparisonExp>;
  token1?: InputMaybe<TokenBoolExp>;
  token1_id?: InputMaybe<StringComparisonExp>;
  transaction?: InputMaybe<TransactionBoolExp>;
  transaction_id?: InputMaybe<StringComparisonExp>;
};

/** order by max() on columns of table "ModifyLiquidity" */
export type ModifyLiquidityMaxOrderBy = {
  amount?: InputMaybe<OrderBy>;
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  origin?: InputMaybe<OrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  sender?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  token0_id?: InputMaybe<OrderBy>;
  token1_id?: InputMaybe<OrderBy>;
  transaction_id?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "ModifyLiquidity" */
export type ModifyLiquidityMinOrderBy = {
  amount?: InputMaybe<OrderBy>;
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  origin?: InputMaybe<OrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  sender?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  token0_id?: InputMaybe<OrderBy>;
  token1_id?: InputMaybe<OrderBy>;
  transaction_id?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "ModifyLiquidity". */
export type ModifyLiquidityOrderBy = {
  amount?: InputMaybe<OrderBy>;
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  origin?: InputMaybe<OrderBy>;
  pool?: InputMaybe<PoolOrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  sender?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  token0?: InputMaybe<TokenOrderBy>;
  token0_id?: InputMaybe<OrderBy>;
  token1?: InputMaybe<TokenOrderBy>;
  token1_id?: InputMaybe<OrderBy>;
  transaction?: InputMaybe<TransactionOrderBy>;
  transaction_id?: InputMaybe<OrderBy>;
};

/** select columns of table "ModifyLiquidity" */
export type ModifyLiquiditySelectColumn =
  /** column name */
  | 'amount'
  /** column name */
  | 'amount0'
  /** column name */
  | 'amount1'
  /** column name */
  | 'id'
  /** column name */
  | 'logIndex'
  /** column name */
  | 'origin'
  /** column name */
  | 'pool_id'
  /** column name */
  | 'sender'
  /** column name */
  | 'tickLower'
  /** column name */
  | 'tickUpper'
  /** column name */
  | 'timestamp'
  /** column name */
  | 'token0_id'
  /** column name */
  | 'token1_id'
  /** column name */
  | 'transaction_id';

/** order by stddev() on columns of table "ModifyLiquidity" */
export type ModifyLiquidityStddevOrderBy = {
  amount?: InputMaybe<OrderBy>;
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "ModifyLiquidity" */
export type ModifyLiquidityStddevPopOrderBy = {
  amount?: InputMaybe<OrderBy>;
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "ModifyLiquidity" */
export type ModifyLiquidityStddevSampOrderBy = {
  amount?: InputMaybe<OrderBy>;
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "ModifyLiquidity" */
export type ModifyLiquidityStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: ModifyLiquidityStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ModifyLiquidityStreamCursorValueInput = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  amount0?: InputMaybe<Scalars['numeric']['input']>;
  amount1?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  logIndex?: InputMaybe<Scalars['numeric']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  pool_id?: InputMaybe<Scalars['String']['input']>;
  sender?: InputMaybe<Scalars['String']['input']>;
  tickLower?: InputMaybe<Scalars['numeric']['input']>;
  tickUpper?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
  token0_id?: InputMaybe<Scalars['String']['input']>;
  token1_id?: InputMaybe<Scalars['String']['input']>;
  transaction_id?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "ModifyLiquidity" */
export type ModifyLiquiditySumOrderBy = {
  amount?: InputMaybe<OrderBy>;
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "ModifyLiquidity" */
export type ModifyLiquidityVarPopOrderBy = {
  amount?: InputMaybe<OrderBy>;
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "ModifyLiquidity" */
export type ModifyLiquidityVarSampOrderBy = {
  amount?: InputMaybe<OrderBy>;
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "ModifyLiquidity" */
export type ModifyLiquidityVarianceOrderBy = {
  amount?: InputMaybe<OrderBy>;
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** columns and relationships of "Pool" */
export type Pool = {
  __typename: 'Pool';
  activePositionCount: Scalars['numeric']['output'];
  createdAtBlockNumber: Scalars['numeric']['output'];
  createdAtTimestamp: Scalars['numeric']['output'];
  feeGrowthGlobal0X128: Scalars['numeric']['output'];
  feeGrowthGlobal1X128: Scalars['numeric']['output'];
  feeTier: Scalars['numeric']['output'];
  fees0: Scalars['numeric']['output'];
  fees1: Scalars['numeric']['output'];
  hooks: Scalars['String']['output'];
  id: Scalars['String']['output'];
  liquidity: Scalars['numeric']['output'];
  lpCount: Scalars['numeric']['output'];
  /** An array relationship */
  modifyLiquidities: Array<ModifyLiquidity>;
  modifyLiquidityCount: Scalars['numeric']['output'];
  name: Scalars['String']['output'];
  observationIndex: Scalars['numeric']['output'];
  /** An array relationship */
  pool5MinuteData: Array<Pool5MinuteData>;
  /** An array relationship */
  poolDayData: Array<PoolDayData>;
  /** An array relationship */
  poolHourData: Array<PoolHourData>;
  poolId: Scalars['String']['output'];
  positionCount: Scalars['numeric']['output'];
  /** An array relationship */
  positions: Array<Position>;
  sqrtPrice: Scalars['numeric']['output'];
  sqrtPriceX96: Scalars['numeric']['output'];
  swapCount: Scalars['numeric']['output'];
  /** An array relationship */
  swaps: Array<Swap>;
  tick: Scalars['numeric']['output'];
  tickSpacing: Scalars['numeric']['output'];
  /** An array relationship */
  ticks: Array<Tick>;
  /** An object relationship */
  token0?: Maybe<Token>;
  token0_id: Scalars['String']['output'];
  /** An object relationship */
  token1?: Maybe<Token>;
  token1_id: Scalars['String']['output'];
  tvl0: Scalars['numeric']['output'];
  tvl1: Scalars['numeric']['output'];
  txCount: Scalars['numeric']['output'];
  volume0: Scalars['numeric']['output'];
  volume1: Scalars['numeric']['output'];
};

/** columns and relationships of "Pool" */
export type PoolModifyLiquiditiesArgs = {
  distinct_on?: InputMaybe<Array<ModifyLiquiditySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ModifyLiquidityOrderBy>>;
  where?: InputMaybe<ModifyLiquidityBoolExp>;
};

/** columns and relationships of "Pool" */
export type PoolPool5MinuteDataArgs = {
  distinct_on?: InputMaybe<Array<Pool5MinuteDataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Pool5MinuteDataOrderBy>>;
  where?: InputMaybe<Pool5MinuteDataBoolExp>;
};

/** columns and relationships of "Pool" */
export type PoolPoolDayDataArgs = {
  distinct_on?: InputMaybe<Array<PoolDayDataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PoolDayDataOrderBy>>;
  where?: InputMaybe<PoolDayDataBoolExp>;
};

/** columns and relationships of "Pool" */
export type PoolPoolHourDataArgs = {
  distinct_on?: InputMaybe<Array<PoolHourDataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PoolHourDataOrderBy>>;
  where?: InputMaybe<PoolHourDataBoolExp>;
};

/** columns and relationships of "Pool" */
export type PoolPositionsArgs = {
  distinct_on?: InputMaybe<Array<PositionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PositionOrderBy>>;
  where?: InputMaybe<PositionBoolExp>;
};

/** columns and relationships of "Pool" */
export type PoolSwapsArgs = {
  distinct_on?: InputMaybe<Array<SwapSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SwapOrderBy>>;
  where?: InputMaybe<SwapBoolExp>;
};

/** columns and relationships of "Pool" */
export type PoolTicksArgs = {
  distinct_on?: InputMaybe<Array<TickSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TickOrderBy>>;
  where?: InputMaybe<TickBoolExp>;
};

/** columns and relationships of "Pool5MinuteData" */
export type Pool5MinuteData = {
  __typename: 'Pool5MinuteData';
  close: Scalars['numeric']['output'];
  fees0: Scalars['numeric']['output'];
  fees1: Scalars['numeric']['output'];
  high: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  liquidity: Scalars['numeric']['output'];
  low: Scalars['numeric']['output'];
  modifyLiquidityCount: Scalars['numeric']['output'];
  open_: Scalars['numeric']['output'];
  /** An object relationship */
  pool?: Maybe<Pool>;
  pool_id: Scalars['String']['output'];
  sqrtPriceX96: Scalars['numeric']['output'];
  startTimestamp: Scalars['Int']['output'];
  swapCount: Scalars['numeric']['output'];
  tick: Scalars['numeric']['output'];
  txCount: Scalars['numeric']['output'];
  volume0: Scalars['numeric']['output'];
  volume1: Scalars['numeric']['output'];
};

/** order by aggregate values of table "Pool5MinuteData" */
export type Pool5MinuteDataAggregateOrderBy = {
  avg?: InputMaybe<Pool5MinuteDataAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<Pool5MinuteDataMaxOrderBy>;
  min?: InputMaybe<Pool5MinuteDataMinOrderBy>;
  stddev?: InputMaybe<Pool5MinuteDataStddevOrderBy>;
  stddev_pop?: InputMaybe<Pool5MinuteDataStddevPopOrderBy>;
  stddev_samp?: InputMaybe<Pool5MinuteDataStddevSampOrderBy>;
  sum?: InputMaybe<Pool5MinuteDataSumOrderBy>;
  var_pop?: InputMaybe<Pool5MinuteDataVarPopOrderBy>;
  var_samp?: InputMaybe<Pool5MinuteDataVarSampOrderBy>;
  variance?: InputMaybe<Pool5MinuteDataVarianceOrderBy>;
};

/** order by avg() on columns of table "Pool5MinuteData" */
export type Pool5MinuteDataAvgOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "Pool5MinuteData". All fields are combined with a logical 'AND'. */
export type Pool5MinuteDataBoolExp = {
  _and?: InputMaybe<Array<Pool5MinuteDataBoolExp>>;
  _not?: InputMaybe<Pool5MinuteDataBoolExp>;
  _or?: InputMaybe<Array<Pool5MinuteDataBoolExp>>;
  close?: InputMaybe<NumericComparisonExp>;
  fees0?: InputMaybe<NumericComparisonExp>;
  fees1?: InputMaybe<NumericComparisonExp>;
  high?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  liquidity?: InputMaybe<NumericComparisonExp>;
  low?: InputMaybe<NumericComparisonExp>;
  modifyLiquidityCount?: InputMaybe<NumericComparisonExp>;
  open_?: InputMaybe<NumericComparisonExp>;
  pool?: InputMaybe<PoolBoolExp>;
  pool_id?: InputMaybe<StringComparisonExp>;
  sqrtPriceX96?: InputMaybe<NumericComparisonExp>;
  startTimestamp?: InputMaybe<IntComparisonExp>;
  swapCount?: InputMaybe<NumericComparisonExp>;
  tick?: InputMaybe<NumericComparisonExp>;
  txCount?: InputMaybe<NumericComparisonExp>;
  volume0?: InputMaybe<NumericComparisonExp>;
  volume1?: InputMaybe<NumericComparisonExp>;
};

/** order by max() on columns of table "Pool5MinuteData" */
export type Pool5MinuteDataMaxOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "Pool5MinuteData" */
export type Pool5MinuteDataMinOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "Pool5MinuteData". */
export type Pool5MinuteDataOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  pool?: InputMaybe<PoolOrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** select columns of table "Pool5MinuteData" */
export type Pool5MinuteDataSelectColumn =
  /** column name */
  | 'close'
  /** column name */
  | 'fees0'
  /** column name */
  | 'fees1'
  /** column name */
  | 'high'
  /** column name */
  | 'id'
  /** column name */
  | 'liquidity'
  /** column name */
  | 'low'
  /** column name */
  | 'modifyLiquidityCount'
  /** column name */
  | 'open_'
  /** column name */
  | 'pool_id'
  /** column name */
  | 'sqrtPriceX96'
  /** column name */
  | 'startTimestamp'
  /** column name */
  | 'swapCount'
  /** column name */
  | 'tick'
  /** column name */
  | 'txCount'
  /** column name */
  | 'volume0'
  /** column name */
  | 'volume1';

/** order by stddev() on columns of table "Pool5MinuteData" */
export type Pool5MinuteDataStddevOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "Pool5MinuteData" */
export type Pool5MinuteDataStddevPopOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "Pool5MinuteData" */
export type Pool5MinuteDataStddevSampOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "Pool5MinuteData" */
export type Pool5MinuteDataStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: Pool5MinuteDataStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Pool5MinuteDataStreamCursorValueInput = {
  close?: InputMaybe<Scalars['numeric']['input']>;
  fees0?: InputMaybe<Scalars['numeric']['input']>;
  fees1?: InputMaybe<Scalars['numeric']['input']>;
  high?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  liquidity?: InputMaybe<Scalars['numeric']['input']>;
  low?: InputMaybe<Scalars['numeric']['input']>;
  modifyLiquidityCount?: InputMaybe<Scalars['numeric']['input']>;
  open_?: InputMaybe<Scalars['numeric']['input']>;
  pool_id?: InputMaybe<Scalars['String']['input']>;
  sqrtPriceX96?: InputMaybe<Scalars['numeric']['input']>;
  startTimestamp?: InputMaybe<Scalars['Int']['input']>;
  swapCount?: InputMaybe<Scalars['numeric']['input']>;
  tick?: InputMaybe<Scalars['numeric']['input']>;
  txCount?: InputMaybe<Scalars['numeric']['input']>;
  volume0?: InputMaybe<Scalars['numeric']['input']>;
  volume1?: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "Pool5MinuteData" */
export type Pool5MinuteDataSumOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "Pool5MinuteData" */
export type Pool5MinuteDataVarPopOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "Pool5MinuteData" */
export type Pool5MinuteDataVarSampOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "Pool5MinuteData" */
export type Pool5MinuteDataVarianceOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** columns and relationships of "PoolDayData" */
export type PoolDayData = {
  __typename: 'PoolDayData';
  close: Scalars['numeric']['output'];
  fees0: Scalars['numeric']['output'];
  fees1: Scalars['numeric']['output'];
  high: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  liquidity: Scalars['numeric']['output'];
  low: Scalars['numeric']['output'];
  modifyLiquidityCount: Scalars['numeric']['output'];
  open_: Scalars['numeric']['output'];
  /** An object relationship */
  pool?: Maybe<Pool>;
  pool_id: Scalars['String']['output'];
  sqrtPriceX96: Scalars['numeric']['output'];
  startTimestamp: Scalars['Int']['output'];
  swapCount: Scalars['numeric']['output'];
  tick: Scalars['numeric']['output'];
  txCount: Scalars['numeric']['output'];
  volume0: Scalars['numeric']['output'];
  volume1: Scalars['numeric']['output'];
};

/** order by aggregate values of table "PoolDayData" */
export type PoolDayDataAggregateOrderBy = {
  avg?: InputMaybe<PoolDayDataAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<PoolDayDataMaxOrderBy>;
  min?: InputMaybe<PoolDayDataMinOrderBy>;
  stddev?: InputMaybe<PoolDayDataStddevOrderBy>;
  stddev_pop?: InputMaybe<PoolDayDataStddevPopOrderBy>;
  stddev_samp?: InputMaybe<PoolDayDataStddevSampOrderBy>;
  sum?: InputMaybe<PoolDayDataSumOrderBy>;
  var_pop?: InputMaybe<PoolDayDataVarPopOrderBy>;
  var_samp?: InputMaybe<PoolDayDataVarSampOrderBy>;
  variance?: InputMaybe<PoolDayDataVarianceOrderBy>;
};

/** order by avg() on columns of table "PoolDayData" */
export type PoolDayDataAvgOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "PoolDayData". All fields are combined with a logical 'AND'. */
export type PoolDayDataBoolExp = {
  _and?: InputMaybe<Array<PoolDayDataBoolExp>>;
  _not?: InputMaybe<PoolDayDataBoolExp>;
  _or?: InputMaybe<Array<PoolDayDataBoolExp>>;
  close?: InputMaybe<NumericComparisonExp>;
  fees0?: InputMaybe<NumericComparisonExp>;
  fees1?: InputMaybe<NumericComparisonExp>;
  high?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  liquidity?: InputMaybe<NumericComparisonExp>;
  low?: InputMaybe<NumericComparisonExp>;
  modifyLiquidityCount?: InputMaybe<NumericComparisonExp>;
  open_?: InputMaybe<NumericComparisonExp>;
  pool?: InputMaybe<PoolBoolExp>;
  pool_id?: InputMaybe<StringComparisonExp>;
  sqrtPriceX96?: InputMaybe<NumericComparisonExp>;
  startTimestamp?: InputMaybe<IntComparisonExp>;
  swapCount?: InputMaybe<NumericComparisonExp>;
  tick?: InputMaybe<NumericComparisonExp>;
  txCount?: InputMaybe<NumericComparisonExp>;
  volume0?: InputMaybe<NumericComparisonExp>;
  volume1?: InputMaybe<NumericComparisonExp>;
};

/** order by max() on columns of table "PoolDayData" */
export type PoolDayDataMaxOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "PoolDayData" */
export type PoolDayDataMinOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "PoolDayData". */
export type PoolDayDataOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  pool?: InputMaybe<PoolOrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** select columns of table "PoolDayData" */
export type PoolDayDataSelectColumn =
  /** column name */
  | 'close'
  /** column name */
  | 'fees0'
  /** column name */
  | 'fees1'
  /** column name */
  | 'high'
  /** column name */
  | 'id'
  /** column name */
  | 'liquidity'
  /** column name */
  | 'low'
  /** column name */
  | 'modifyLiquidityCount'
  /** column name */
  | 'open_'
  /** column name */
  | 'pool_id'
  /** column name */
  | 'sqrtPriceX96'
  /** column name */
  | 'startTimestamp'
  /** column name */
  | 'swapCount'
  /** column name */
  | 'tick'
  /** column name */
  | 'txCount'
  /** column name */
  | 'volume0'
  /** column name */
  | 'volume1';

/** order by stddev() on columns of table "PoolDayData" */
export type PoolDayDataStddevOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "PoolDayData" */
export type PoolDayDataStddevPopOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "PoolDayData" */
export type PoolDayDataStddevSampOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "PoolDayData" */
export type PoolDayDataStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: PoolDayDataStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type PoolDayDataStreamCursorValueInput = {
  close?: InputMaybe<Scalars['numeric']['input']>;
  fees0?: InputMaybe<Scalars['numeric']['input']>;
  fees1?: InputMaybe<Scalars['numeric']['input']>;
  high?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  liquidity?: InputMaybe<Scalars['numeric']['input']>;
  low?: InputMaybe<Scalars['numeric']['input']>;
  modifyLiquidityCount?: InputMaybe<Scalars['numeric']['input']>;
  open_?: InputMaybe<Scalars['numeric']['input']>;
  pool_id?: InputMaybe<Scalars['String']['input']>;
  sqrtPriceX96?: InputMaybe<Scalars['numeric']['input']>;
  startTimestamp?: InputMaybe<Scalars['Int']['input']>;
  swapCount?: InputMaybe<Scalars['numeric']['input']>;
  tick?: InputMaybe<Scalars['numeric']['input']>;
  txCount?: InputMaybe<Scalars['numeric']['input']>;
  volume0?: InputMaybe<Scalars['numeric']['input']>;
  volume1?: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "PoolDayData" */
export type PoolDayDataSumOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "PoolDayData" */
export type PoolDayDataVarPopOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "PoolDayData" */
export type PoolDayDataVarSampOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "PoolDayData" */
export type PoolDayDataVarianceOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** columns and relationships of "PoolHourData" */
export type PoolHourData = {
  __typename: 'PoolHourData';
  close: Scalars['numeric']['output'];
  fees0: Scalars['numeric']['output'];
  fees1: Scalars['numeric']['output'];
  high: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  liquidity: Scalars['numeric']['output'];
  low: Scalars['numeric']['output'];
  modifyLiquidityCount: Scalars['numeric']['output'];
  open_: Scalars['numeric']['output'];
  /** An object relationship */
  pool?: Maybe<Pool>;
  pool_id: Scalars['String']['output'];
  sqrtPriceX96: Scalars['numeric']['output'];
  startTimestamp: Scalars['Int']['output'];
  swapCount: Scalars['numeric']['output'];
  tick: Scalars['numeric']['output'];
  txCount: Scalars['numeric']['output'];
  volume0: Scalars['numeric']['output'];
  volume1: Scalars['numeric']['output'];
};

/** order by aggregate values of table "PoolHourData" */
export type PoolHourDataAggregateOrderBy = {
  avg?: InputMaybe<PoolHourDataAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<PoolHourDataMaxOrderBy>;
  min?: InputMaybe<PoolHourDataMinOrderBy>;
  stddev?: InputMaybe<PoolHourDataStddevOrderBy>;
  stddev_pop?: InputMaybe<PoolHourDataStddevPopOrderBy>;
  stddev_samp?: InputMaybe<PoolHourDataStddevSampOrderBy>;
  sum?: InputMaybe<PoolHourDataSumOrderBy>;
  var_pop?: InputMaybe<PoolHourDataVarPopOrderBy>;
  var_samp?: InputMaybe<PoolHourDataVarSampOrderBy>;
  variance?: InputMaybe<PoolHourDataVarianceOrderBy>;
};

/** order by avg() on columns of table "PoolHourData" */
export type PoolHourDataAvgOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "PoolHourData". All fields are combined with a logical 'AND'. */
export type PoolHourDataBoolExp = {
  _and?: InputMaybe<Array<PoolHourDataBoolExp>>;
  _not?: InputMaybe<PoolHourDataBoolExp>;
  _or?: InputMaybe<Array<PoolHourDataBoolExp>>;
  close?: InputMaybe<NumericComparisonExp>;
  fees0?: InputMaybe<NumericComparisonExp>;
  fees1?: InputMaybe<NumericComparisonExp>;
  high?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  liquidity?: InputMaybe<NumericComparisonExp>;
  low?: InputMaybe<NumericComparisonExp>;
  modifyLiquidityCount?: InputMaybe<NumericComparisonExp>;
  open_?: InputMaybe<NumericComparisonExp>;
  pool?: InputMaybe<PoolBoolExp>;
  pool_id?: InputMaybe<StringComparisonExp>;
  sqrtPriceX96?: InputMaybe<NumericComparisonExp>;
  startTimestamp?: InputMaybe<IntComparisonExp>;
  swapCount?: InputMaybe<NumericComparisonExp>;
  tick?: InputMaybe<NumericComparisonExp>;
  txCount?: InputMaybe<NumericComparisonExp>;
  volume0?: InputMaybe<NumericComparisonExp>;
  volume1?: InputMaybe<NumericComparisonExp>;
};

/** order by max() on columns of table "PoolHourData" */
export type PoolHourDataMaxOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "PoolHourData" */
export type PoolHourDataMinOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "PoolHourData". */
export type PoolHourDataOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  pool?: InputMaybe<PoolOrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** select columns of table "PoolHourData" */
export type PoolHourDataSelectColumn =
  /** column name */
  | 'close'
  /** column name */
  | 'fees0'
  /** column name */
  | 'fees1'
  /** column name */
  | 'high'
  /** column name */
  | 'id'
  /** column name */
  | 'liquidity'
  /** column name */
  | 'low'
  /** column name */
  | 'modifyLiquidityCount'
  /** column name */
  | 'open_'
  /** column name */
  | 'pool_id'
  /** column name */
  | 'sqrtPriceX96'
  /** column name */
  | 'startTimestamp'
  /** column name */
  | 'swapCount'
  /** column name */
  | 'tick'
  /** column name */
  | 'txCount'
  /** column name */
  | 'volume0'
  /** column name */
  | 'volume1';

/** order by stddev() on columns of table "PoolHourData" */
export type PoolHourDataStddevOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "PoolHourData" */
export type PoolHourDataStddevPopOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "PoolHourData" */
export type PoolHourDataStddevSampOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "PoolHourData" */
export type PoolHourDataStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: PoolHourDataStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type PoolHourDataStreamCursorValueInput = {
  close?: InputMaybe<Scalars['numeric']['input']>;
  fees0?: InputMaybe<Scalars['numeric']['input']>;
  fees1?: InputMaybe<Scalars['numeric']['input']>;
  high?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  liquidity?: InputMaybe<Scalars['numeric']['input']>;
  low?: InputMaybe<Scalars['numeric']['input']>;
  modifyLiquidityCount?: InputMaybe<Scalars['numeric']['input']>;
  open_?: InputMaybe<Scalars['numeric']['input']>;
  pool_id?: InputMaybe<Scalars['String']['input']>;
  sqrtPriceX96?: InputMaybe<Scalars['numeric']['input']>;
  startTimestamp?: InputMaybe<Scalars['Int']['input']>;
  swapCount?: InputMaybe<Scalars['numeric']['input']>;
  tick?: InputMaybe<Scalars['numeric']['input']>;
  txCount?: InputMaybe<Scalars['numeric']['input']>;
  volume0?: InputMaybe<Scalars['numeric']['input']>;
  volume1?: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "PoolHourData" */
export type PoolHourDataSumOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "PoolHourData" */
export type PoolHourDataVarPopOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "PoolHourData" */
export type PoolHourDataVarSampOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "PoolHourData" */
export type PoolHourDataVarianceOrderBy = {
  close?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  high?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  low?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  open_?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** columns and relationships of "PoolUser" */
export type PoolUser = {
  __typename: 'PoolUser';
  address: Scalars['String']['output'];
  createdAtBlockNumber: Scalars['numeric']['output'];
  createdAtTimestamp: Scalars['numeric']['output'];
  fees0: Scalars['numeric']['output'];
  fees1: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  /** An object relationship */
  pool?: Maybe<Pool>;
  pool_id: Scalars['String']['output'];
  swapCount: Scalars['numeric']['output'];
  volume0: Scalars['numeric']['output'];
  volume1: Scalars['numeric']['output'];
};

/** Boolean expression to filter rows from the table "PoolUser". All fields are combined with a logical 'AND'. */
export type PoolUserBoolExp = {
  _and?: InputMaybe<Array<PoolUserBoolExp>>;
  _not?: InputMaybe<PoolUserBoolExp>;
  _or?: InputMaybe<Array<PoolUserBoolExp>>;
  address?: InputMaybe<StringComparisonExp>;
  createdAtBlockNumber?: InputMaybe<NumericComparisonExp>;
  createdAtTimestamp?: InputMaybe<NumericComparisonExp>;
  fees0?: InputMaybe<NumericComparisonExp>;
  fees1?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  pool?: InputMaybe<PoolBoolExp>;
  pool_id?: InputMaybe<StringComparisonExp>;
  swapCount?: InputMaybe<NumericComparisonExp>;
  volume0?: InputMaybe<NumericComparisonExp>;
  volume1?: InputMaybe<NumericComparisonExp>;
};

/** Ordering options when selecting data from "PoolUser". */
export type PoolUserOrderBy = {
  address?: InputMaybe<OrderBy>;
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  pool?: InputMaybe<PoolOrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** select columns of table "PoolUser" */
export type PoolUserSelectColumn =
  /** column name */
  | 'address'
  /** column name */
  | 'createdAtBlockNumber'
  /** column name */
  | 'createdAtTimestamp'
  /** column name */
  | 'fees0'
  /** column name */
  | 'fees1'
  /** column name */
  | 'id'
  /** column name */
  | 'pool_id'
  /** column name */
  | 'swapCount'
  /** column name */
  | 'volume0'
  /** column name */
  | 'volume1';

/** Streaming cursor of the table "PoolUser" */
export type PoolUserStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: PoolUserStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type PoolUserStreamCursorValueInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  createdAtBlockNumber?: InputMaybe<Scalars['numeric']['input']>;
  createdAtTimestamp?: InputMaybe<Scalars['numeric']['input']>;
  fees0?: InputMaybe<Scalars['numeric']['input']>;
  fees1?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  pool_id?: InputMaybe<Scalars['String']['input']>;
  swapCount?: InputMaybe<Scalars['numeric']['input']>;
  volume0?: InputMaybe<Scalars['numeric']['input']>;
  volume1?: InputMaybe<Scalars['numeric']['input']>;
};

/** Boolean expression to filter rows from the table "Pool". All fields are combined with a logical 'AND'. */
export type PoolBoolExp = {
  _and?: InputMaybe<Array<PoolBoolExp>>;
  _not?: InputMaybe<PoolBoolExp>;
  _or?: InputMaybe<Array<PoolBoolExp>>;
  activePositionCount?: InputMaybe<NumericComparisonExp>;
  createdAtBlockNumber?: InputMaybe<NumericComparisonExp>;
  createdAtTimestamp?: InputMaybe<NumericComparisonExp>;
  feeGrowthGlobal0X128?: InputMaybe<NumericComparisonExp>;
  feeGrowthGlobal1X128?: InputMaybe<NumericComparisonExp>;
  feeTier?: InputMaybe<NumericComparisonExp>;
  fees0?: InputMaybe<NumericComparisonExp>;
  fees1?: InputMaybe<NumericComparisonExp>;
  hooks?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  liquidity?: InputMaybe<NumericComparisonExp>;
  lpCount?: InputMaybe<NumericComparisonExp>;
  modifyLiquidities?: InputMaybe<ModifyLiquidityBoolExp>;
  modifyLiquidityCount?: InputMaybe<NumericComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  observationIndex?: InputMaybe<NumericComparisonExp>;
  pool5MinuteData?: InputMaybe<Pool5MinuteDataBoolExp>;
  poolDayData?: InputMaybe<PoolDayDataBoolExp>;
  poolHourData?: InputMaybe<PoolHourDataBoolExp>;
  poolId?: InputMaybe<StringComparisonExp>;
  positionCount?: InputMaybe<NumericComparisonExp>;
  positions?: InputMaybe<PositionBoolExp>;
  sqrtPrice?: InputMaybe<NumericComparisonExp>;
  sqrtPriceX96?: InputMaybe<NumericComparisonExp>;
  swapCount?: InputMaybe<NumericComparisonExp>;
  swaps?: InputMaybe<SwapBoolExp>;
  tick?: InputMaybe<NumericComparisonExp>;
  tickSpacing?: InputMaybe<NumericComparisonExp>;
  ticks?: InputMaybe<TickBoolExp>;
  token0?: InputMaybe<TokenBoolExp>;
  token0_id?: InputMaybe<StringComparisonExp>;
  token1?: InputMaybe<TokenBoolExp>;
  token1_id?: InputMaybe<StringComparisonExp>;
  tvl0?: InputMaybe<NumericComparisonExp>;
  tvl1?: InputMaybe<NumericComparisonExp>;
  txCount?: InputMaybe<NumericComparisonExp>;
  volume0?: InputMaybe<NumericComparisonExp>;
  volume1?: InputMaybe<NumericComparisonExp>;
};

/** Ordering options when selecting data from "Pool". */
export type PoolOrderBy = {
  activePositionCount?: InputMaybe<OrderBy>;
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  feeGrowthGlobal0X128?: InputMaybe<OrderBy>;
  feeGrowthGlobal1X128?: InputMaybe<OrderBy>;
  feeTier?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  hooks?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  lpCount?: InputMaybe<OrderBy>;
  modifyLiquidities_aggregate?: InputMaybe<ModifyLiquidityAggregateOrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  observationIndex?: InputMaybe<OrderBy>;
  pool5MinuteData_aggregate?: InputMaybe<Pool5MinuteDataAggregateOrderBy>;
  poolDayData_aggregate?: InputMaybe<PoolDayDataAggregateOrderBy>;
  poolHourData_aggregate?: InputMaybe<PoolHourDataAggregateOrderBy>;
  poolId?: InputMaybe<OrderBy>;
  positionCount?: InputMaybe<OrderBy>;
  positions_aggregate?: InputMaybe<PositionAggregateOrderBy>;
  sqrtPrice?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  swaps_aggregate?: InputMaybe<SwapAggregateOrderBy>;
  tick?: InputMaybe<OrderBy>;
  tickSpacing?: InputMaybe<OrderBy>;
  ticks_aggregate?: InputMaybe<TickAggregateOrderBy>;
  token0?: InputMaybe<TokenOrderBy>;
  token0_id?: InputMaybe<OrderBy>;
  token1?: InputMaybe<TokenOrderBy>;
  token1_id?: InputMaybe<OrderBy>;
  tvl0?: InputMaybe<OrderBy>;
  tvl1?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume0?: InputMaybe<OrderBy>;
  volume1?: InputMaybe<OrderBy>;
};

/** select columns of table "Pool" */
export type PoolSelectColumn =
  /** column name */
  | 'activePositionCount'
  /** column name */
  | 'createdAtBlockNumber'
  /** column name */
  | 'createdAtTimestamp'
  /** column name */
  | 'feeGrowthGlobal0X128'
  /** column name */
  | 'feeGrowthGlobal1X128'
  /** column name */
  | 'feeTier'
  /** column name */
  | 'fees0'
  /** column name */
  | 'fees1'
  /** column name */
  | 'hooks'
  /** column name */
  | 'id'
  /** column name */
  | 'liquidity'
  /** column name */
  | 'lpCount'
  /** column name */
  | 'modifyLiquidityCount'
  /** column name */
  | 'name'
  /** column name */
  | 'observationIndex'
  /** column name */
  | 'poolId'
  /** column name */
  | 'positionCount'
  /** column name */
  | 'sqrtPrice'
  /** column name */
  | 'sqrtPriceX96'
  /** column name */
  | 'swapCount'
  /** column name */
  | 'tick'
  /** column name */
  | 'tickSpacing'
  /** column name */
  | 'token0_id'
  /** column name */
  | 'token1_id'
  /** column name */
  | 'tvl0'
  /** column name */
  | 'tvl1'
  /** column name */
  | 'txCount'
  /** column name */
  | 'volume0'
  /** column name */
  | 'volume1';

/** Streaming cursor of the table "Pool" */
export type PoolStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: PoolStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type PoolStreamCursorValueInput = {
  activePositionCount?: InputMaybe<Scalars['numeric']['input']>;
  createdAtBlockNumber?: InputMaybe<Scalars['numeric']['input']>;
  createdAtTimestamp?: InputMaybe<Scalars['numeric']['input']>;
  feeGrowthGlobal0X128?: InputMaybe<Scalars['numeric']['input']>;
  feeGrowthGlobal1X128?: InputMaybe<Scalars['numeric']['input']>;
  feeTier?: InputMaybe<Scalars['numeric']['input']>;
  fees0?: InputMaybe<Scalars['numeric']['input']>;
  fees1?: InputMaybe<Scalars['numeric']['input']>;
  hooks?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  liquidity?: InputMaybe<Scalars['numeric']['input']>;
  lpCount?: InputMaybe<Scalars['numeric']['input']>;
  modifyLiquidityCount?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  observationIndex?: InputMaybe<Scalars['numeric']['input']>;
  poolId?: InputMaybe<Scalars['String']['input']>;
  positionCount?: InputMaybe<Scalars['numeric']['input']>;
  sqrtPrice?: InputMaybe<Scalars['numeric']['input']>;
  sqrtPriceX96?: InputMaybe<Scalars['numeric']['input']>;
  swapCount?: InputMaybe<Scalars['numeric']['input']>;
  tick?: InputMaybe<Scalars['numeric']['input']>;
  tickSpacing?: InputMaybe<Scalars['numeric']['input']>;
  token0_id?: InputMaybe<Scalars['String']['input']>;
  token1_id?: InputMaybe<Scalars['String']['input']>;
  tvl0?: InputMaybe<Scalars['numeric']['input']>;
  tvl1?: InputMaybe<Scalars['numeric']['input']>;
  txCount?: InputMaybe<Scalars['numeric']['input']>;
  volume0?: InputMaybe<Scalars['numeric']['input']>;
  volume1?: InputMaybe<Scalars['numeric']['input']>;
};

/** columns and relationships of "Position" */
export type Position = {
  __typename: 'Position';
  createdAtBlockNumber: Scalars['numeric']['output'];
  createdAtTimestamp: Scalars['numeric']['output'];
  deposited0: Scalars['numeric']['output'];
  deposited1: Scalars['numeric']['output'];
  feeGrowthInside0LastX128: Scalars['numeric']['output'];
  feeGrowthInside1LastX128: Scalars['numeric']['output'];
  fees0: Scalars['numeric']['output'];
  fees1: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  liquidity: Scalars['numeric']['output'];
  /** An object relationship */
  liquidityProvider?: Maybe<LiquidityProvider>;
  liquidityProvider_id: Scalars['String']['output'];
  modifyLiquidityCount: Scalars['numeric']['output'];
  owner: Scalars['String']['output'];
  /** An object relationship */
  pool?: Maybe<Pool>;
  pool_id: Scalars['String']['output'];
  tickLower: Scalars['numeric']['output'];
  tickUpper: Scalars['numeric']['output'];
  /** An object relationship */
  token0?: Maybe<Token>;
  token0_id: Scalars['String']['output'];
  /** An object relationship */
  token1?: Maybe<Token>;
  token1_id: Scalars['String']['output'];
  /** An object relationship */
  transaction?: Maybe<Transaction>;
  transaction_id: Scalars['String']['output'];
  withdrawn0: Scalars['numeric']['output'];
  withdrawn1: Scalars['numeric']['output'];
};

/** order by aggregate values of table "Position" */
export type PositionAggregateOrderBy = {
  avg?: InputMaybe<PositionAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<PositionMaxOrderBy>;
  min?: InputMaybe<PositionMinOrderBy>;
  stddev?: InputMaybe<PositionStddevOrderBy>;
  stddev_pop?: InputMaybe<PositionStddevPopOrderBy>;
  stddev_samp?: InputMaybe<PositionStddevSampOrderBy>;
  sum?: InputMaybe<PositionSumOrderBy>;
  var_pop?: InputMaybe<PositionVarPopOrderBy>;
  var_samp?: InputMaybe<PositionVarSampOrderBy>;
  variance?: InputMaybe<PositionVarianceOrderBy>;
};

/** order by avg() on columns of table "Position" */
export type PositionAvgOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  deposited0?: InputMaybe<OrderBy>;
  deposited1?: InputMaybe<OrderBy>;
  feeGrowthInside0LastX128?: InputMaybe<OrderBy>;
  feeGrowthInside1LastX128?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  withdrawn0?: InputMaybe<OrderBy>;
  withdrawn1?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "Position". All fields are combined with a logical 'AND'. */
export type PositionBoolExp = {
  _and?: InputMaybe<Array<PositionBoolExp>>;
  _not?: InputMaybe<PositionBoolExp>;
  _or?: InputMaybe<Array<PositionBoolExp>>;
  createdAtBlockNumber?: InputMaybe<NumericComparisonExp>;
  createdAtTimestamp?: InputMaybe<NumericComparisonExp>;
  deposited0?: InputMaybe<NumericComparisonExp>;
  deposited1?: InputMaybe<NumericComparisonExp>;
  feeGrowthInside0LastX128?: InputMaybe<NumericComparisonExp>;
  feeGrowthInside1LastX128?: InputMaybe<NumericComparisonExp>;
  fees0?: InputMaybe<NumericComparisonExp>;
  fees1?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  liquidity?: InputMaybe<NumericComparisonExp>;
  liquidityProvider?: InputMaybe<LiquidityProviderBoolExp>;
  liquidityProvider_id?: InputMaybe<StringComparisonExp>;
  modifyLiquidityCount?: InputMaybe<NumericComparisonExp>;
  owner?: InputMaybe<StringComparisonExp>;
  pool?: InputMaybe<PoolBoolExp>;
  pool_id?: InputMaybe<StringComparisonExp>;
  tickLower?: InputMaybe<NumericComparisonExp>;
  tickUpper?: InputMaybe<NumericComparisonExp>;
  token0?: InputMaybe<TokenBoolExp>;
  token0_id?: InputMaybe<StringComparisonExp>;
  token1?: InputMaybe<TokenBoolExp>;
  token1_id?: InputMaybe<StringComparisonExp>;
  transaction?: InputMaybe<TransactionBoolExp>;
  transaction_id?: InputMaybe<StringComparisonExp>;
  withdrawn0?: InputMaybe<NumericComparisonExp>;
  withdrawn1?: InputMaybe<NumericComparisonExp>;
};

/** order by max() on columns of table "Position" */
export type PositionMaxOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  deposited0?: InputMaybe<OrderBy>;
  deposited1?: InputMaybe<OrderBy>;
  feeGrowthInside0LastX128?: InputMaybe<OrderBy>;
  feeGrowthInside1LastX128?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  liquidityProvider_id?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  owner?: InputMaybe<OrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  token0_id?: InputMaybe<OrderBy>;
  token1_id?: InputMaybe<OrderBy>;
  transaction_id?: InputMaybe<OrderBy>;
  withdrawn0?: InputMaybe<OrderBy>;
  withdrawn1?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "Position" */
export type PositionMinOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  deposited0?: InputMaybe<OrderBy>;
  deposited1?: InputMaybe<OrderBy>;
  feeGrowthInside0LastX128?: InputMaybe<OrderBy>;
  feeGrowthInside1LastX128?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  liquidityProvider_id?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  owner?: InputMaybe<OrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  token0_id?: InputMaybe<OrderBy>;
  token1_id?: InputMaybe<OrderBy>;
  transaction_id?: InputMaybe<OrderBy>;
  withdrawn0?: InputMaybe<OrderBy>;
  withdrawn1?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "Position". */
export type PositionOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  deposited0?: InputMaybe<OrderBy>;
  deposited1?: InputMaybe<OrderBy>;
  feeGrowthInside0LastX128?: InputMaybe<OrderBy>;
  feeGrowthInside1LastX128?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  liquidityProvider?: InputMaybe<LiquidityProviderOrderBy>;
  liquidityProvider_id?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  owner?: InputMaybe<OrderBy>;
  pool?: InputMaybe<PoolOrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  token0?: InputMaybe<TokenOrderBy>;
  token0_id?: InputMaybe<OrderBy>;
  token1?: InputMaybe<TokenOrderBy>;
  token1_id?: InputMaybe<OrderBy>;
  transaction?: InputMaybe<TransactionOrderBy>;
  transaction_id?: InputMaybe<OrderBy>;
  withdrawn0?: InputMaybe<OrderBy>;
  withdrawn1?: InputMaybe<OrderBy>;
};

/** select columns of table "Position" */
export type PositionSelectColumn =
  /** column name */
  | 'createdAtBlockNumber'
  /** column name */
  | 'createdAtTimestamp'
  /** column name */
  | 'deposited0'
  /** column name */
  | 'deposited1'
  /** column name */
  | 'feeGrowthInside0LastX128'
  /** column name */
  | 'feeGrowthInside1LastX128'
  /** column name */
  | 'fees0'
  /** column name */
  | 'fees1'
  /** column name */
  | 'id'
  /** column name */
  | 'liquidity'
  /** column name */
  | 'liquidityProvider_id'
  /** column name */
  | 'modifyLiquidityCount'
  /** column name */
  | 'owner'
  /** column name */
  | 'pool_id'
  /** column name */
  | 'tickLower'
  /** column name */
  | 'tickUpper'
  /** column name */
  | 'token0_id'
  /** column name */
  | 'token1_id'
  /** column name */
  | 'transaction_id'
  /** column name */
  | 'withdrawn0'
  /** column name */
  | 'withdrawn1';

/** order by stddev() on columns of table "Position" */
export type PositionStddevOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  deposited0?: InputMaybe<OrderBy>;
  deposited1?: InputMaybe<OrderBy>;
  feeGrowthInside0LastX128?: InputMaybe<OrderBy>;
  feeGrowthInside1LastX128?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  withdrawn0?: InputMaybe<OrderBy>;
  withdrawn1?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "Position" */
export type PositionStddevPopOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  deposited0?: InputMaybe<OrderBy>;
  deposited1?: InputMaybe<OrderBy>;
  feeGrowthInside0LastX128?: InputMaybe<OrderBy>;
  feeGrowthInside1LastX128?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  withdrawn0?: InputMaybe<OrderBy>;
  withdrawn1?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "Position" */
export type PositionStddevSampOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  deposited0?: InputMaybe<OrderBy>;
  deposited1?: InputMaybe<OrderBy>;
  feeGrowthInside0LastX128?: InputMaybe<OrderBy>;
  feeGrowthInside1LastX128?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  withdrawn0?: InputMaybe<OrderBy>;
  withdrawn1?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "Position" */
export type PositionStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: PositionStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type PositionStreamCursorValueInput = {
  createdAtBlockNumber?: InputMaybe<Scalars['numeric']['input']>;
  createdAtTimestamp?: InputMaybe<Scalars['numeric']['input']>;
  deposited0?: InputMaybe<Scalars['numeric']['input']>;
  deposited1?: InputMaybe<Scalars['numeric']['input']>;
  feeGrowthInside0LastX128?: InputMaybe<Scalars['numeric']['input']>;
  feeGrowthInside1LastX128?: InputMaybe<Scalars['numeric']['input']>;
  fees0?: InputMaybe<Scalars['numeric']['input']>;
  fees1?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  liquidity?: InputMaybe<Scalars['numeric']['input']>;
  liquidityProvider_id?: InputMaybe<Scalars['String']['input']>;
  modifyLiquidityCount?: InputMaybe<Scalars['numeric']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  pool_id?: InputMaybe<Scalars['String']['input']>;
  tickLower?: InputMaybe<Scalars['numeric']['input']>;
  tickUpper?: InputMaybe<Scalars['numeric']['input']>;
  token0_id?: InputMaybe<Scalars['String']['input']>;
  token1_id?: InputMaybe<Scalars['String']['input']>;
  transaction_id?: InputMaybe<Scalars['String']['input']>;
  withdrawn0?: InputMaybe<Scalars['numeric']['input']>;
  withdrawn1?: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "Position" */
export type PositionSumOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  deposited0?: InputMaybe<OrderBy>;
  deposited1?: InputMaybe<OrderBy>;
  feeGrowthInside0LastX128?: InputMaybe<OrderBy>;
  feeGrowthInside1LastX128?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  withdrawn0?: InputMaybe<OrderBy>;
  withdrawn1?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "Position" */
export type PositionVarPopOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  deposited0?: InputMaybe<OrderBy>;
  deposited1?: InputMaybe<OrderBy>;
  feeGrowthInside0LastX128?: InputMaybe<OrderBy>;
  feeGrowthInside1LastX128?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  withdrawn0?: InputMaybe<OrderBy>;
  withdrawn1?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "Position" */
export type PositionVarSampOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  deposited0?: InputMaybe<OrderBy>;
  deposited1?: InputMaybe<OrderBy>;
  feeGrowthInside0LastX128?: InputMaybe<OrderBy>;
  feeGrowthInside1LastX128?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  withdrawn0?: InputMaybe<OrderBy>;
  withdrawn1?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "Position" */
export type PositionVarianceOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  deposited0?: InputMaybe<OrderBy>;
  deposited1?: InputMaybe<OrderBy>;
  feeGrowthInside0LastX128?: InputMaybe<OrderBy>;
  feeGrowthInside1LastX128?: InputMaybe<OrderBy>;
  fees0?: InputMaybe<OrderBy>;
  fees1?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  withdrawn0?: InputMaybe<OrderBy>;
  withdrawn1?: InputMaybe<OrderBy>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringArrayComparisonExp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['String']['input']>>;
  _eq?: InputMaybe<Array<Scalars['String']['input']>>;
  _gt?: InputMaybe<Array<Scalars['String']['input']>>;
  _gte?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['String']['input']>>;
  _lte?: InputMaybe<Array<Scalars['String']['input']>>;
  _neq?: InputMaybe<Array<Scalars['String']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "Swap" */
export type Swap = {
  __typename: 'Swap';
  amount0: Scalars['numeric']['output'];
  amount1: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  logIndex?: Maybe<Scalars['numeric']['output']>;
  origin: Scalars['String']['output'];
  /** An object relationship */
  pool?: Maybe<Pool>;
  pool_id: Scalars['String']['output'];
  recipient: Scalars['String']['output'];
  sender: Scalars['String']['output'];
  sqrtPriceX96: Scalars['numeric']['output'];
  tick: Scalars['numeric']['output'];
  timestamp: Scalars['numeric']['output'];
  /** An object relationship */
  token0?: Maybe<Token>;
  token0_id: Scalars['String']['output'];
  /** An object relationship */
  token1?: Maybe<Token>;
  token1_id: Scalars['String']['output'];
  /** An object relationship */
  transaction?: Maybe<Transaction>;
  transaction_id: Scalars['String']['output'];
};

/** order by aggregate values of table "Swap" */
export type SwapAggregateOrderBy = {
  avg?: InputMaybe<SwapAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SwapMaxOrderBy>;
  min?: InputMaybe<SwapMinOrderBy>;
  stddev?: InputMaybe<SwapStddevOrderBy>;
  stddev_pop?: InputMaybe<SwapStddevPopOrderBy>;
  stddev_samp?: InputMaybe<SwapStddevSampOrderBy>;
  sum?: InputMaybe<SwapSumOrderBy>;
  var_pop?: InputMaybe<SwapVarPopOrderBy>;
  var_samp?: InputMaybe<SwapVarSampOrderBy>;
  variance?: InputMaybe<SwapVarianceOrderBy>;
};

/** order by avg() on columns of table "Swap" */
export type SwapAvgOrderBy = {
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "Swap". All fields are combined with a logical 'AND'. */
export type SwapBoolExp = {
  _and?: InputMaybe<Array<SwapBoolExp>>;
  _not?: InputMaybe<SwapBoolExp>;
  _or?: InputMaybe<Array<SwapBoolExp>>;
  amount0?: InputMaybe<NumericComparisonExp>;
  amount1?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  logIndex?: InputMaybe<NumericComparisonExp>;
  origin?: InputMaybe<StringComparisonExp>;
  pool?: InputMaybe<PoolBoolExp>;
  pool_id?: InputMaybe<StringComparisonExp>;
  recipient?: InputMaybe<StringComparisonExp>;
  sender?: InputMaybe<StringComparisonExp>;
  sqrtPriceX96?: InputMaybe<NumericComparisonExp>;
  tick?: InputMaybe<NumericComparisonExp>;
  timestamp?: InputMaybe<NumericComparisonExp>;
  token0?: InputMaybe<TokenBoolExp>;
  token0_id?: InputMaybe<StringComparisonExp>;
  token1?: InputMaybe<TokenBoolExp>;
  token1_id?: InputMaybe<StringComparisonExp>;
  transaction?: InputMaybe<TransactionBoolExp>;
  transaction_id?: InputMaybe<StringComparisonExp>;
};

/** order by max() on columns of table "Swap" */
export type SwapMaxOrderBy = {
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  origin?: InputMaybe<OrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  recipient?: InputMaybe<OrderBy>;
  sender?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  token0_id?: InputMaybe<OrderBy>;
  token1_id?: InputMaybe<OrderBy>;
  transaction_id?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "Swap" */
export type SwapMinOrderBy = {
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  origin?: InputMaybe<OrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  recipient?: InputMaybe<OrderBy>;
  sender?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  token0_id?: InputMaybe<OrderBy>;
  token1_id?: InputMaybe<OrderBy>;
  transaction_id?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "Swap". */
export type SwapOrderBy = {
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  origin?: InputMaybe<OrderBy>;
  pool?: InputMaybe<PoolOrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  recipient?: InputMaybe<OrderBy>;
  sender?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  token0?: InputMaybe<TokenOrderBy>;
  token0_id?: InputMaybe<OrderBy>;
  token1?: InputMaybe<TokenOrderBy>;
  token1_id?: InputMaybe<OrderBy>;
  transaction?: InputMaybe<TransactionOrderBy>;
  transaction_id?: InputMaybe<OrderBy>;
};

/** select columns of table "Swap" */
export type SwapSelectColumn =
  /** column name */
  | 'amount0'
  /** column name */
  | 'amount1'
  /** column name */
  | 'id'
  /** column name */
  | 'logIndex'
  /** column name */
  | 'origin'
  /** column name */
  | 'pool_id'
  /** column name */
  | 'recipient'
  /** column name */
  | 'sender'
  /** column name */
  | 'sqrtPriceX96'
  /** column name */
  | 'tick'
  /** column name */
  | 'timestamp'
  /** column name */
  | 'token0_id'
  /** column name */
  | 'token1_id'
  /** column name */
  | 'transaction_id';

/** order by stddev() on columns of table "Swap" */
export type SwapStddevOrderBy = {
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "Swap" */
export type SwapStddevPopOrderBy = {
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "Swap" */
export type SwapStddevSampOrderBy = {
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "Swap" */
export type SwapStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SwapStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SwapStreamCursorValueInput = {
  amount0?: InputMaybe<Scalars['numeric']['input']>;
  amount1?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  logIndex?: InputMaybe<Scalars['numeric']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  pool_id?: InputMaybe<Scalars['String']['input']>;
  recipient?: InputMaybe<Scalars['String']['input']>;
  sender?: InputMaybe<Scalars['String']['input']>;
  sqrtPriceX96?: InputMaybe<Scalars['numeric']['input']>;
  tick?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
  token0_id?: InputMaybe<Scalars['String']['input']>;
  token1_id?: InputMaybe<Scalars['String']['input']>;
  transaction_id?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "Swap" */
export type SwapSumOrderBy = {
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "Swap" */
export type SwapVarPopOrderBy = {
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "Swap" */
export type SwapVarSampOrderBy = {
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "Swap" */
export type SwapVarianceOrderBy = {
  amount0?: InputMaybe<OrderBy>;
  amount1?: InputMaybe<OrderBy>;
  logIndex?: InputMaybe<OrderBy>;
  sqrtPriceX96?: InputMaybe<OrderBy>;
  tick?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** columns and relationships of "Tick" */
export type Tick = {
  __typename: 'Tick';
  createdAtBlockNumber: Scalars['numeric']['output'];
  createdAtTimestamp: Scalars['numeric']['output'];
  feeGrowthOutside0X128: Scalars['numeric']['output'];
  feeGrowthOutside1X128: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  liquidityGross: Scalars['numeric']['output'];
  liquidityNet: Scalars['numeric']['output'];
  /** An object relationship */
  pool?: Maybe<Pool>;
  poolId?: Maybe<Scalars['String']['output']>;
  pool_id: Scalars['String']['output'];
  positionCount: Scalars['numeric']['output'];
  price0: Scalars['numeric']['output'];
  price1: Scalars['numeric']['output'];
  tickIdx: Scalars['numeric']['output'];
};

/** order by aggregate values of table "Tick" */
export type TickAggregateOrderBy = {
  avg?: InputMaybe<TickAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<TickMaxOrderBy>;
  min?: InputMaybe<TickMinOrderBy>;
  stddev?: InputMaybe<TickStddevOrderBy>;
  stddev_pop?: InputMaybe<TickStddevPopOrderBy>;
  stddev_samp?: InputMaybe<TickStddevSampOrderBy>;
  sum?: InputMaybe<TickSumOrderBy>;
  var_pop?: InputMaybe<TickVarPopOrderBy>;
  var_samp?: InputMaybe<TickVarSampOrderBy>;
  variance?: InputMaybe<TickVarianceOrderBy>;
};

/** order by avg() on columns of table "Tick" */
export type TickAvgOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  feeGrowthOutside0X128?: InputMaybe<OrderBy>;
  feeGrowthOutside1X128?: InputMaybe<OrderBy>;
  liquidityGross?: InputMaybe<OrderBy>;
  liquidityNet?: InputMaybe<OrderBy>;
  positionCount?: InputMaybe<OrderBy>;
  price0?: InputMaybe<OrderBy>;
  price1?: InputMaybe<OrderBy>;
  tickIdx?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "Tick". All fields are combined with a logical 'AND'. */
export type TickBoolExp = {
  _and?: InputMaybe<Array<TickBoolExp>>;
  _not?: InputMaybe<TickBoolExp>;
  _or?: InputMaybe<Array<TickBoolExp>>;
  createdAtBlockNumber?: InputMaybe<NumericComparisonExp>;
  createdAtTimestamp?: InputMaybe<NumericComparisonExp>;
  feeGrowthOutside0X128?: InputMaybe<NumericComparisonExp>;
  feeGrowthOutside1X128?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  liquidityGross?: InputMaybe<NumericComparisonExp>;
  liquidityNet?: InputMaybe<NumericComparisonExp>;
  pool?: InputMaybe<PoolBoolExp>;
  poolId?: InputMaybe<StringComparisonExp>;
  pool_id?: InputMaybe<StringComparisonExp>;
  positionCount?: InputMaybe<NumericComparisonExp>;
  price0?: InputMaybe<NumericComparisonExp>;
  price1?: InputMaybe<NumericComparisonExp>;
  tickIdx?: InputMaybe<NumericComparisonExp>;
};

/** order by max() on columns of table "Tick" */
export type TickMaxOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  feeGrowthOutside0X128?: InputMaybe<OrderBy>;
  feeGrowthOutside1X128?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidityGross?: InputMaybe<OrderBy>;
  liquidityNet?: InputMaybe<OrderBy>;
  poolId?: InputMaybe<OrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  positionCount?: InputMaybe<OrderBy>;
  price0?: InputMaybe<OrderBy>;
  price1?: InputMaybe<OrderBy>;
  tickIdx?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "Tick" */
export type TickMinOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  feeGrowthOutside0X128?: InputMaybe<OrderBy>;
  feeGrowthOutside1X128?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidityGross?: InputMaybe<OrderBy>;
  liquidityNet?: InputMaybe<OrderBy>;
  poolId?: InputMaybe<OrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  positionCount?: InputMaybe<OrderBy>;
  price0?: InputMaybe<OrderBy>;
  price1?: InputMaybe<OrderBy>;
  tickIdx?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "Tick". */
export type TickOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  feeGrowthOutside0X128?: InputMaybe<OrderBy>;
  feeGrowthOutside1X128?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidityGross?: InputMaybe<OrderBy>;
  liquidityNet?: InputMaybe<OrderBy>;
  pool?: InputMaybe<PoolOrderBy>;
  poolId?: InputMaybe<OrderBy>;
  pool_id?: InputMaybe<OrderBy>;
  positionCount?: InputMaybe<OrderBy>;
  price0?: InputMaybe<OrderBy>;
  price1?: InputMaybe<OrderBy>;
  tickIdx?: InputMaybe<OrderBy>;
};

/** select columns of table "Tick" */
export type TickSelectColumn =
  /** column name */
  | 'createdAtBlockNumber'
  /** column name */
  | 'createdAtTimestamp'
  /** column name */
  | 'feeGrowthOutside0X128'
  /** column name */
  | 'feeGrowthOutside1X128'
  /** column name */
  | 'id'
  /** column name */
  | 'liquidityGross'
  /** column name */
  | 'liquidityNet'
  /** column name */
  | 'poolId'
  /** column name */
  | 'pool_id'
  /** column name */
  | 'positionCount'
  /** column name */
  | 'price0'
  /** column name */
  | 'price1'
  /** column name */
  | 'tickIdx';

/** order by stddev() on columns of table "Tick" */
export type TickStddevOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  feeGrowthOutside0X128?: InputMaybe<OrderBy>;
  feeGrowthOutside1X128?: InputMaybe<OrderBy>;
  liquidityGross?: InputMaybe<OrderBy>;
  liquidityNet?: InputMaybe<OrderBy>;
  positionCount?: InputMaybe<OrderBy>;
  price0?: InputMaybe<OrderBy>;
  price1?: InputMaybe<OrderBy>;
  tickIdx?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "Tick" */
export type TickStddevPopOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  feeGrowthOutside0X128?: InputMaybe<OrderBy>;
  feeGrowthOutside1X128?: InputMaybe<OrderBy>;
  liquidityGross?: InputMaybe<OrderBy>;
  liquidityNet?: InputMaybe<OrderBy>;
  positionCount?: InputMaybe<OrderBy>;
  price0?: InputMaybe<OrderBy>;
  price1?: InputMaybe<OrderBy>;
  tickIdx?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "Tick" */
export type TickStddevSampOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  feeGrowthOutside0X128?: InputMaybe<OrderBy>;
  feeGrowthOutside1X128?: InputMaybe<OrderBy>;
  liquidityGross?: InputMaybe<OrderBy>;
  liquidityNet?: InputMaybe<OrderBy>;
  positionCount?: InputMaybe<OrderBy>;
  price0?: InputMaybe<OrderBy>;
  price1?: InputMaybe<OrderBy>;
  tickIdx?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "Tick" */
export type TickStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: TickStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type TickStreamCursorValueInput = {
  createdAtBlockNumber?: InputMaybe<Scalars['numeric']['input']>;
  createdAtTimestamp?: InputMaybe<Scalars['numeric']['input']>;
  feeGrowthOutside0X128?: InputMaybe<Scalars['numeric']['input']>;
  feeGrowthOutside1X128?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  liquidityGross?: InputMaybe<Scalars['numeric']['input']>;
  liquidityNet?: InputMaybe<Scalars['numeric']['input']>;
  poolId?: InputMaybe<Scalars['String']['input']>;
  pool_id?: InputMaybe<Scalars['String']['input']>;
  positionCount?: InputMaybe<Scalars['numeric']['input']>;
  price0?: InputMaybe<Scalars['numeric']['input']>;
  price1?: InputMaybe<Scalars['numeric']['input']>;
  tickIdx?: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "Tick" */
export type TickSumOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  feeGrowthOutside0X128?: InputMaybe<OrderBy>;
  feeGrowthOutside1X128?: InputMaybe<OrderBy>;
  liquidityGross?: InputMaybe<OrderBy>;
  liquidityNet?: InputMaybe<OrderBy>;
  positionCount?: InputMaybe<OrderBy>;
  price0?: InputMaybe<OrderBy>;
  price1?: InputMaybe<OrderBy>;
  tickIdx?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "Tick" */
export type TickVarPopOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  feeGrowthOutside0X128?: InputMaybe<OrderBy>;
  feeGrowthOutside1X128?: InputMaybe<OrderBy>;
  liquidityGross?: InputMaybe<OrderBy>;
  liquidityNet?: InputMaybe<OrderBy>;
  positionCount?: InputMaybe<OrderBy>;
  price0?: InputMaybe<OrderBy>;
  price1?: InputMaybe<OrderBy>;
  tickIdx?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "Tick" */
export type TickVarSampOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  feeGrowthOutside0X128?: InputMaybe<OrderBy>;
  feeGrowthOutside1X128?: InputMaybe<OrderBy>;
  liquidityGross?: InputMaybe<OrderBy>;
  liquidityNet?: InputMaybe<OrderBy>;
  positionCount?: InputMaybe<OrderBy>;
  price0?: InputMaybe<OrderBy>;
  price1?: InputMaybe<OrderBy>;
  tickIdx?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "Tick" */
export type TickVarianceOrderBy = {
  createdAtBlockNumber?: InputMaybe<OrderBy>;
  createdAtTimestamp?: InputMaybe<OrderBy>;
  feeGrowthOutside0X128?: InputMaybe<OrderBy>;
  feeGrowthOutside1X128?: InputMaybe<OrderBy>;
  liquidityGross?: InputMaybe<OrderBy>;
  liquidityNet?: InputMaybe<OrderBy>;
  positionCount?: InputMaybe<OrderBy>;
  price0?: InputMaybe<OrderBy>;
  price1?: InputMaybe<OrderBy>;
  tickIdx?: InputMaybe<OrderBy>;
};

/** columns and relationships of "Token" */
export type Token = {
  __typename: 'Token';
  decimals: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  lpCount: Scalars['numeric']['output'];
  modifyLiquidityCount: Scalars['numeric']['output'];
  name: Scalars['String']['output'];
  poolCount: Scalars['numeric']['output'];
  positionCount: Scalars['numeric']['output'];
  swapCount: Scalars['numeric']['output'];
  symbol: Scalars['String']['output'];
  /** An array relationship */
  tokenDayData: Array<TokenDayData>;
  /** An array relationship */
  tokenHourData: Array<TokenHourData>;
  totalSupply: Scalars['numeric']['output'];
  tvl: Scalars['numeric']['output'];
  txCount: Scalars['numeric']['output'];
  volume: Scalars['numeric']['output'];
  whitelistPools: Array<Scalars['String']['output']>;
};

/** columns and relationships of "Token" */
export type TokenTokenDayDataArgs = {
  distinct_on?: InputMaybe<Array<TokenDayDataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TokenDayDataOrderBy>>;
  where?: InputMaybe<TokenDayDataBoolExp>;
};

/** columns and relationships of "Token" */
export type TokenTokenHourDataArgs = {
  distinct_on?: InputMaybe<Array<TokenHourDataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TokenHourDataOrderBy>>;
  where?: InputMaybe<TokenHourDataBoolExp>;
};

/** columns and relationships of "TokenDayData" */
export type TokenDayData = {
  __typename: 'TokenDayData';
  id: Scalars['String']['output'];
  modifyLiquidityCount: Scalars['numeric']['output'];
  startTimestamp: Scalars['Int']['output'];
  swapCount: Scalars['numeric']['output'];
  /** An object relationship */
  token?: Maybe<Token>;
  token_id: Scalars['String']['output'];
  txCount: Scalars['numeric']['output'];
  volume: Scalars['numeric']['output'];
};

/** order by aggregate values of table "TokenDayData" */
export type TokenDayDataAggregateOrderBy = {
  avg?: InputMaybe<TokenDayDataAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<TokenDayDataMaxOrderBy>;
  min?: InputMaybe<TokenDayDataMinOrderBy>;
  stddev?: InputMaybe<TokenDayDataStddevOrderBy>;
  stddev_pop?: InputMaybe<TokenDayDataStddevPopOrderBy>;
  stddev_samp?: InputMaybe<TokenDayDataStddevSampOrderBy>;
  sum?: InputMaybe<TokenDayDataSumOrderBy>;
  var_pop?: InputMaybe<TokenDayDataVarPopOrderBy>;
  var_samp?: InputMaybe<TokenDayDataVarSampOrderBy>;
  variance?: InputMaybe<TokenDayDataVarianceOrderBy>;
};

/** order by avg() on columns of table "TokenDayData" */
export type TokenDayDataAvgOrderBy = {
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "TokenDayData". All fields are combined with a logical 'AND'. */
export type TokenDayDataBoolExp = {
  _and?: InputMaybe<Array<TokenDayDataBoolExp>>;
  _not?: InputMaybe<TokenDayDataBoolExp>;
  _or?: InputMaybe<Array<TokenDayDataBoolExp>>;
  id?: InputMaybe<StringComparisonExp>;
  modifyLiquidityCount?: InputMaybe<NumericComparisonExp>;
  startTimestamp?: InputMaybe<IntComparisonExp>;
  swapCount?: InputMaybe<NumericComparisonExp>;
  token?: InputMaybe<TokenBoolExp>;
  token_id?: InputMaybe<StringComparisonExp>;
  txCount?: InputMaybe<NumericComparisonExp>;
  volume?: InputMaybe<NumericComparisonExp>;
};

/** order by max() on columns of table "TokenDayData" */
export type TokenDayDataMaxOrderBy = {
  id?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "TokenDayData" */
export type TokenDayDataMinOrderBy = {
  id?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "TokenDayData". */
export type TokenDayDataOrderBy = {
  id?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  token?: InputMaybe<TokenOrderBy>;
  token_id?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** select columns of table "TokenDayData" */
export type TokenDayDataSelectColumn =
  /** column name */
  | 'id'
  /** column name */
  | 'modifyLiquidityCount'
  /** column name */
  | 'startTimestamp'
  /** column name */
  | 'swapCount'
  /** column name */
  | 'token_id'
  /** column name */
  | 'txCount'
  /** column name */
  | 'volume';

/** order by stddev() on columns of table "TokenDayData" */
export type TokenDayDataStddevOrderBy = {
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "TokenDayData" */
export type TokenDayDataStddevPopOrderBy = {
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "TokenDayData" */
export type TokenDayDataStddevSampOrderBy = {
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "TokenDayData" */
export type TokenDayDataStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: TokenDayDataStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type TokenDayDataStreamCursorValueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  modifyLiquidityCount?: InputMaybe<Scalars['numeric']['input']>;
  startTimestamp?: InputMaybe<Scalars['Int']['input']>;
  swapCount?: InputMaybe<Scalars['numeric']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
  txCount?: InputMaybe<Scalars['numeric']['input']>;
  volume?: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "TokenDayData" */
export type TokenDayDataSumOrderBy = {
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "TokenDayData" */
export type TokenDayDataVarPopOrderBy = {
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "TokenDayData" */
export type TokenDayDataVarSampOrderBy = {
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "TokenDayData" */
export type TokenDayDataVarianceOrderBy = {
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** columns and relationships of "TokenHourData" */
export type TokenHourData = {
  __typename: 'TokenHourData';
  id: Scalars['String']['output'];
  modifyLiquidityCount: Scalars['numeric']['output'];
  startTimestamp: Scalars['Int']['output'];
  swapCount: Scalars['numeric']['output'];
  /** An object relationship */
  token?: Maybe<Token>;
  token_id: Scalars['String']['output'];
  txCount: Scalars['numeric']['output'];
  volume: Scalars['numeric']['output'];
};

/** order by aggregate values of table "TokenHourData" */
export type TokenHourDataAggregateOrderBy = {
  avg?: InputMaybe<TokenHourDataAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<TokenHourDataMaxOrderBy>;
  min?: InputMaybe<TokenHourDataMinOrderBy>;
  stddev?: InputMaybe<TokenHourDataStddevOrderBy>;
  stddev_pop?: InputMaybe<TokenHourDataStddevPopOrderBy>;
  stddev_samp?: InputMaybe<TokenHourDataStddevSampOrderBy>;
  sum?: InputMaybe<TokenHourDataSumOrderBy>;
  var_pop?: InputMaybe<TokenHourDataVarPopOrderBy>;
  var_samp?: InputMaybe<TokenHourDataVarSampOrderBy>;
  variance?: InputMaybe<TokenHourDataVarianceOrderBy>;
};

/** order by avg() on columns of table "TokenHourData" */
export type TokenHourDataAvgOrderBy = {
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "TokenHourData". All fields are combined with a logical 'AND'. */
export type TokenHourDataBoolExp = {
  _and?: InputMaybe<Array<TokenHourDataBoolExp>>;
  _not?: InputMaybe<TokenHourDataBoolExp>;
  _or?: InputMaybe<Array<TokenHourDataBoolExp>>;
  id?: InputMaybe<StringComparisonExp>;
  modifyLiquidityCount?: InputMaybe<NumericComparisonExp>;
  startTimestamp?: InputMaybe<IntComparisonExp>;
  swapCount?: InputMaybe<NumericComparisonExp>;
  token?: InputMaybe<TokenBoolExp>;
  token_id?: InputMaybe<StringComparisonExp>;
  txCount?: InputMaybe<NumericComparisonExp>;
  volume?: InputMaybe<NumericComparisonExp>;
};

/** order by max() on columns of table "TokenHourData" */
export type TokenHourDataMaxOrderBy = {
  id?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "TokenHourData" */
export type TokenHourDataMinOrderBy = {
  id?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "TokenHourData". */
export type TokenHourDataOrderBy = {
  id?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  token?: InputMaybe<TokenOrderBy>;
  token_id?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** select columns of table "TokenHourData" */
export type TokenHourDataSelectColumn =
  /** column name */
  | 'id'
  /** column name */
  | 'modifyLiquidityCount'
  /** column name */
  | 'startTimestamp'
  /** column name */
  | 'swapCount'
  /** column name */
  | 'token_id'
  /** column name */
  | 'txCount'
  /** column name */
  | 'volume';

/** order by stddev() on columns of table "TokenHourData" */
export type TokenHourDataStddevOrderBy = {
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "TokenHourData" */
export type TokenHourDataStddevPopOrderBy = {
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "TokenHourData" */
export type TokenHourDataStddevSampOrderBy = {
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "TokenHourData" */
export type TokenHourDataStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: TokenHourDataStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type TokenHourDataStreamCursorValueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  modifyLiquidityCount?: InputMaybe<Scalars['numeric']['input']>;
  startTimestamp?: InputMaybe<Scalars['Int']['input']>;
  swapCount?: InputMaybe<Scalars['numeric']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
  txCount?: InputMaybe<Scalars['numeric']['input']>;
  volume?: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "TokenHourData" */
export type TokenHourDataSumOrderBy = {
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "TokenHourData" */
export type TokenHourDataVarPopOrderBy = {
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "TokenHourData" */
export type TokenHourDataVarSampOrderBy = {
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "TokenHourData" */
export type TokenHourDataVarianceOrderBy = {
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  startTimestamp?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "Token". All fields are combined with a logical 'AND'. */
export type TokenBoolExp = {
  _and?: InputMaybe<Array<TokenBoolExp>>;
  _not?: InputMaybe<TokenBoolExp>;
  _or?: InputMaybe<Array<TokenBoolExp>>;
  decimals?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  lpCount?: InputMaybe<NumericComparisonExp>;
  modifyLiquidityCount?: InputMaybe<NumericComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  poolCount?: InputMaybe<NumericComparisonExp>;
  positionCount?: InputMaybe<NumericComparisonExp>;
  swapCount?: InputMaybe<NumericComparisonExp>;
  symbol?: InputMaybe<StringComparisonExp>;
  tokenDayData?: InputMaybe<TokenDayDataBoolExp>;
  tokenHourData?: InputMaybe<TokenHourDataBoolExp>;
  totalSupply?: InputMaybe<NumericComparisonExp>;
  tvl?: InputMaybe<NumericComparisonExp>;
  txCount?: InputMaybe<NumericComparisonExp>;
  volume?: InputMaybe<NumericComparisonExp>;
  whitelistPools?: InputMaybe<StringArrayComparisonExp>;
};

/** Ordering options when selecting data from "Token". */
export type TokenOrderBy = {
  decimals?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  lpCount?: InputMaybe<OrderBy>;
  modifyLiquidityCount?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  poolCount?: InputMaybe<OrderBy>;
  positionCount?: InputMaybe<OrderBy>;
  swapCount?: InputMaybe<OrderBy>;
  symbol?: InputMaybe<OrderBy>;
  tokenDayData_aggregate?: InputMaybe<TokenDayDataAggregateOrderBy>;
  tokenHourData_aggregate?: InputMaybe<TokenHourDataAggregateOrderBy>;
  totalSupply?: InputMaybe<OrderBy>;
  tvl?: InputMaybe<OrderBy>;
  txCount?: InputMaybe<OrderBy>;
  volume?: InputMaybe<OrderBy>;
  whitelistPools?: InputMaybe<OrderBy>;
};

/** select columns of table "Token" */
export type TokenSelectColumn =
  /** column name */
  | 'decimals'
  /** column name */
  | 'id'
  /** column name */
  | 'lpCount'
  /** column name */
  | 'modifyLiquidityCount'
  /** column name */
  | 'name'
  /** column name */
  | 'poolCount'
  /** column name */
  | 'positionCount'
  /** column name */
  | 'swapCount'
  /** column name */
  | 'symbol'
  /** column name */
  | 'totalSupply'
  /** column name */
  | 'tvl'
  /** column name */
  | 'txCount'
  /** column name */
  | 'volume'
  /** column name */
  | 'whitelistPools';

/** Streaming cursor of the table "Token" */
export type TokenStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: TokenStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type TokenStreamCursorValueInput = {
  decimals?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  lpCount?: InputMaybe<Scalars['numeric']['input']>;
  modifyLiquidityCount?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  poolCount?: InputMaybe<Scalars['numeric']['input']>;
  positionCount?: InputMaybe<Scalars['numeric']['input']>;
  swapCount?: InputMaybe<Scalars['numeric']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  totalSupply?: InputMaybe<Scalars['numeric']['input']>;
  tvl?: InputMaybe<Scalars['numeric']['input']>;
  txCount?: InputMaybe<Scalars['numeric']['input']>;
  volume?: InputMaybe<Scalars['numeric']['input']>;
  whitelistPools?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** columns and relationships of "Transaction" */
export type Transaction = {
  __typename: 'Transaction';
  blockNumber: Scalars['numeric']['output'];
  gasPrice: Scalars['numeric']['output'];
  gasUsed: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  /** An array relationship */
  modifyLiquidities: Array<ModifyLiquidity>;
  /** An array relationship */
  swaps: Array<Swap>;
  timestamp: Scalars['numeric']['output'];
};

/** columns and relationships of "Transaction" */
export type TransactionModifyLiquiditiesArgs = {
  distinct_on?: InputMaybe<Array<ModifyLiquiditySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ModifyLiquidityOrderBy>>;
  where?: InputMaybe<ModifyLiquidityBoolExp>;
};

/** columns and relationships of "Transaction" */
export type TransactionSwapsArgs = {
  distinct_on?: InputMaybe<Array<SwapSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SwapOrderBy>>;
  where?: InputMaybe<SwapBoolExp>;
};

/** Boolean expression to filter rows from the table "Transaction". All fields are combined with a logical 'AND'. */
export type TransactionBoolExp = {
  _and?: InputMaybe<Array<TransactionBoolExp>>;
  _not?: InputMaybe<TransactionBoolExp>;
  _or?: InputMaybe<Array<TransactionBoolExp>>;
  blockNumber?: InputMaybe<NumericComparisonExp>;
  gasPrice?: InputMaybe<NumericComparisonExp>;
  gasUsed?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  modifyLiquidities?: InputMaybe<ModifyLiquidityBoolExp>;
  swaps?: InputMaybe<SwapBoolExp>;
  timestamp?: InputMaybe<NumericComparisonExp>;
};

/** Ordering options when selecting data from "Transaction". */
export type TransactionOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  gasPrice?: InputMaybe<OrderBy>;
  gasUsed?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  modifyLiquidities_aggregate?: InputMaybe<ModifyLiquidityAggregateOrderBy>;
  swaps_aggregate?: InputMaybe<SwapAggregateOrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** select columns of table "Transaction" */
export type TransactionSelectColumn =
  /** column name */
  | 'blockNumber'
  /** column name */
  | 'gasPrice'
  /** column name */
  | 'gasUsed'
  /** column name */
  | 'id'
  /** column name */
  | 'timestamp';

/** Streaming cursor of the table "Transaction" */
export type TransactionStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: TransactionStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type TransactionStreamCursorValueInput = {
  blockNumber?: InputMaybe<Scalars['numeric']['input']>;
  gasPrice?: InputMaybe<Scalars['numeric']['input']>;
  gasUsed?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
};

/** columns and relationships of "_meta" */
export type Meta = {
  __typename: '_meta';
  bufferBlock?: Maybe<Scalars['Int']['output']>;
  chainId?: Maybe<Scalars['Int']['output']>;
  endBlock?: Maybe<Scalars['Int']['output']>;
  eventsProcessed?: Maybe<Scalars['Int']['output']>;
  firstEventBlock?: Maybe<Scalars['Int']['output']>;
  isReady?: Maybe<Scalars['Boolean']['output']>;
  progressBlock?: Maybe<Scalars['Int']['output']>;
  readyAt?: Maybe<Scalars['timestamptz']['output']>;
  sourceBlock?: Maybe<Scalars['Int']['output']>;
  startBlock?: Maybe<Scalars['Int']['output']>;
};

/** Boolean expression to filter rows from the table "_meta". All fields are combined with a logical 'AND'. */
export type MetaBoolExp = {
  _and?: InputMaybe<Array<MetaBoolExp>>;
  _not?: InputMaybe<MetaBoolExp>;
  _or?: InputMaybe<Array<MetaBoolExp>>;
  bufferBlock?: InputMaybe<IntComparisonExp>;
  chainId?: InputMaybe<IntComparisonExp>;
  endBlock?: InputMaybe<IntComparisonExp>;
  eventsProcessed?: InputMaybe<IntComparisonExp>;
  firstEventBlock?: InputMaybe<IntComparisonExp>;
  isReady?: InputMaybe<BooleanComparisonExp>;
  progressBlock?: InputMaybe<IntComparisonExp>;
  readyAt?: InputMaybe<TimestamptzComparisonExp>;
  sourceBlock?: InputMaybe<IntComparisonExp>;
  startBlock?: InputMaybe<IntComparisonExp>;
};

/** Ordering options when selecting data from "_meta". */
export type MetaOrderBy = {
  bufferBlock?: InputMaybe<OrderBy>;
  chainId?: InputMaybe<OrderBy>;
  endBlock?: InputMaybe<OrderBy>;
  eventsProcessed?: InputMaybe<OrderBy>;
  firstEventBlock?: InputMaybe<OrderBy>;
  isReady?: InputMaybe<OrderBy>;
  progressBlock?: InputMaybe<OrderBy>;
  readyAt?: InputMaybe<OrderBy>;
  sourceBlock?: InputMaybe<OrderBy>;
  startBlock?: InputMaybe<OrderBy>;
};

/** select columns of table "_meta" */
export type MetaSelectColumn =
  /** column name */
  | 'bufferBlock'
  /** column name */
  | 'chainId'
  /** column name */
  | 'endBlock'
  /** column name */
  | 'eventsProcessed'
  /** column name */
  | 'firstEventBlock'
  /** column name */
  | 'isReady'
  /** column name */
  | 'progressBlock'
  /** column name */
  | 'readyAt'
  /** column name */
  | 'sourceBlock'
  /** column name */
  | 'startBlock';

/** Streaming cursor of the table "_meta" */
export type MetaStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: MetaStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type MetaStreamCursorValueInput = {
  bufferBlock?: InputMaybe<Scalars['Int']['input']>;
  chainId?: InputMaybe<Scalars['Int']['input']>;
  endBlock?: InputMaybe<Scalars['Int']['input']>;
  eventsProcessed?: InputMaybe<Scalars['Int']['input']>;
  firstEventBlock?: InputMaybe<Scalars['Int']['input']>;
  isReady?: InputMaybe<Scalars['Boolean']['input']>;
  progressBlock?: InputMaybe<Scalars['Int']['input']>;
  readyAt?: InputMaybe<Scalars['timestamptz']['input']>;
  sourceBlock?: InputMaybe<Scalars['Int']['input']>;
  startBlock?: InputMaybe<Scalars['Int']['input']>;
};

/** columns and relationships of "chain_metadata" */
export type ChainMetadata = {
  __typename: 'chain_metadata';
  block_height?: Maybe<Scalars['Int']['output']>;
  chain_id?: Maybe<Scalars['Int']['output']>;
  end_block?: Maybe<Scalars['Int']['output']>;
  first_event_block_number?: Maybe<Scalars['Int']['output']>;
  is_hyper_sync?: Maybe<Scalars['Boolean']['output']>;
  latest_fetched_block_number?: Maybe<Scalars['Int']['output']>;
  latest_processed_block?: Maybe<Scalars['Int']['output']>;
  num_batches_fetched?: Maybe<Scalars['Int']['output']>;
  num_events_processed?: Maybe<Scalars['Int']['output']>;
  start_block?: Maybe<Scalars['Int']['output']>;
  timestamp_caught_up_to_head_or_endblock?: Maybe<
    Scalars['timestamptz']['output']
  >;
};

/** Boolean expression to filter rows from the table "chain_metadata". All fields are combined with a logical 'AND'. */
export type ChainMetadataBoolExp = {
  _and?: InputMaybe<Array<ChainMetadataBoolExp>>;
  _not?: InputMaybe<ChainMetadataBoolExp>;
  _or?: InputMaybe<Array<ChainMetadataBoolExp>>;
  block_height?: InputMaybe<IntComparisonExp>;
  chain_id?: InputMaybe<IntComparisonExp>;
  end_block?: InputMaybe<IntComparisonExp>;
  first_event_block_number?: InputMaybe<IntComparisonExp>;
  is_hyper_sync?: InputMaybe<BooleanComparisonExp>;
  latest_fetched_block_number?: InputMaybe<IntComparisonExp>;
  latest_processed_block?: InputMaybe<IntComparisonExp>;
  num_batches_fetched?: InputMaybe<IntComparisonExp>;
  num_events_processed?: InputMaybe<IntComparisonExp>;
  start_block?: InputMaybe<IntComparisonExp>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<TimestamptzComparisonExp>;
};

/** Ordering options when selecting data from "chain_metadata". */
export type ChainMetadataOrderBy = {
  block_height?: InputMaybe<OrderBy>;
  chain_id?: InputMaybe<OrderBy>;
  end_block?: InputMaybe<OrderBy>;
  first_event_block_number?: InputMaybe<OrderBy>;
  is_hyper_sync?: InputMaybe<OrderBy>;
  latest_fetched_block_number?: InputMaybe<OrderBy>;
  latest_processed_block?: InputMaybe<OrderBy>;
  num_batches_fetched?: InputMaybe<OrderBy>;
  num_events_processed?: InputMaybe<OrderBy>;
  start_block?: InputMaybe<OrderBy>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<OrderBy>;
};

/** select columns of table "chain_metadata" */
export type ChainMetadataSelectColumn =
  /** column name */
  | 'block_height'
  /** column name */
  | 'chain_id'
  /** column name */
  | 'end_block'
  /** column name */
  | 'first_event_block_number'
  /** column name */
  | 'is_hyper_sync'
  /** column name */
  | 'latest_fetched_block_number'
  /** column name */
  | 'latest_processed_block'
  /** column name */
  | 'num_batches_fetched'
  /** column name */
  | 'num_events_processed'
  /** column name */
  | 'start_block'
  /** column name */
  | 'timestamp_caught_up_to_head_or_endblock';

/** Streaming cursor of the table "chain_metadata" */
export type ChainMetadataStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: ChainMetadataStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ChainMetadataStreamCursorValueInput = {
  block_height?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  end_block?: InputMaybe<Scalars['Int']['input']>;
  first_event_block_number?: InputMaybe<Scalars['Int']['input']>;
  is_hyper_sync?: InputMaybe<Scalars['Boolean']['input']>;
  latest_fetched_block_number?: InputMaybe<Scalars['Int']['input']>;
  latest_processed_block?: InputMaybe<Scalars['Int']['input']>;
  num_batches_fetched?: InputMaybe<Scalars['Int']['input']>;
  num_events_processed?: InputMaybe<Scalars['Int']['input']>;
  start_block?: InputMaybe<Scalars['Int']['input']>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<
    Scalars['timestamptz']['input']
  >;
};

/** ordering argument of a cursor */
export type CursorOrdering =
  /** ascending ordering of the cursor */
  | 'ASC'
  /** descending ordering of the cursor */
  | 'DESC';

export type JsonbCastExp = {
  String?: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type JsonbComparisonExp = {
  _cast?: InputMaybe<JsonbCastExp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type NumericComparisonExp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export type OrderBy =
  /** in ascending order, nulls last */
  | 'asc'
  /** in ascending order, nulls first */
  | 'asc_nulls_first'
  /** in ascending order, nulls last */
  | 'asc_nulls_last'
  /** in descending order, nulls first */
  | 'desc'
  /** in descending order, nulls first */
  | 'desc_nulls_first'
  /** in descending order, nulls last */
  | 'desc_nulls_last';

export type QueryRoot = {
  __typename: 'query_root';
  /** fetch data from the table: "HookStats" */
  HookStats: Array<HookStats>;
  /** fetch data from the table: "HookStats" using primary key columns */
  HookStats_by_pk?: Maybe<HookStats>;
  /** fetch data from the table: "LiquidityProvider" */
  LiquidityProvider: Array<LiquidityProvider>;
  /** fetch data from the table: "LiquidityProvider" using primary key columns */
  LiquidityProvider_by_pk?: Maybe<LiquidityProvider>;
  /** fetch data from the table: "ModifyLiquidity" */
  ModifyLiquidity: Array<ModifyLiquidity>;
  /** fetch data from the table: "ModifyLiquidity" using primary key columns */
  ModifyLiquidity_by_pk?: Maybe<ModifyLiquidity>;
  /** fetch data from the table: "Pool" */
  Pool: Array<Pool>;
  /** fetch data from the table: "Pool5MinuteData" */
  Pool5MinuteData: Array<Pool5MinuteData>;
  /** fetch data from the table: "Pool5MinuteData" using primary key columns */
  Pool5MinuteData_by_pk?: Maybe<Pool5MinuteData>;
  /** fetch data from the table: "PoolDayData" */
  PoolDayData: Array<PoolDayData>;
  /** fetch data from the table: "PoolDayData" using primary key columns */
  PoolDayData_by_pk?: Maybe<PoolDayData>;
  /** fetch data from the table: "PoolHourData" */
  PoolHourData: Array<PoolHourData>;
  /** fetch data from the table: "PoolHourData" using primary key columns */
  PoolHourData_by_pk?: Maybe<PoolHourData>;
  /** fetch data from the table: "PoolUser" */
  PoolUser: Array<PoolUser>;
  /** fetch data from the table: "PoolUser" using primary key columns */
  PoolUser_by_pk?: Maybe<PoolUser>;
  /** fetch data from the table: "Pool" using primary key columns */
  Pool_by_pk?: Maybe<Pool>;
  /** fetch data from the table: "Position" */
  Position: Array<Position>;
  /** fetch data from the table: "Position" using primary key columns */
  Position_by_pk?: Maybe<Position>;
  /** fetch data from the table: "Swap" */
  Swap: Array<Swap>;
  /** fetch data from the table: "Swap" using primary key columns */
  Swap_by_pk?: Maybe<Swap>;
  /** fetch data from the table: "Tick" */
  Tick: Array<Tick>;
  /** fetch data from the table: "Tick" using primary key columns */
  Tick_by_pk?: Maybe<Tick>;
  /** fetch data from the table: "Token" */
  Token: Array<Token>;
  /** fetch data from the table: "TokenDayData" */
  TokenDayData: Array<TokenDayData>;
  /** fetch data from the table: "TokenDayData" using primary key columns */
  TokenDayData_by_pk?: Maybe<TokenDayData>;
  /** fetch data from the table: "TokenHourData" */
  TokenHourData: Array<TokenHourData>;
  /** fetch data from the table: "TokenHourData" using primary key columns */
  TokenHourData_by_pk?: Maybe<TokenHourData>;
  /** fetch data from the table: "Token" using primary key columns */
  Token_by_pk?: Maybe<Token>;
  /** fetch data from the table: "Transaction" */
  Transaction: Array<Transaction>;
  /** fetch data from the table: "Transaction" using primary key columns */
  Transaction_by_pk?: Maybe<Transaction>;
  /** fetch data from the table: "_meta" */
  _meta: Array<Meta>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<ChainMetadata>;
  /** fetch data from the table: "raw_events" */
  raw_events: Array<RawEvents>;
  /** fetch data from the table: "raw_events" using primary key columns */
  raw_events_by_pk?: Maybe<RawEvents>;
};

export type QueryRootHookStatsArgs = {
  distinct_on?: InputMaybe<Array<HookStatsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<HookStatsOrderBy>>;
  where?: InputMaybe<HookStatsBoolExp>;
};

export type QueryRootHookStatsByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootLiquidityProviderArgs = {
  distinct_on?: InputMaybe<Array<LiquidityProviderSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<LiquidityProviderOrderBy>>;
  where?: InputMaybe<LiquidityProviderBoolExp>;
};

export type QueryRootLiquidityProviderByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootModifyLiquidityArgs = {
  distinct_on?: InputMaybe<Array<ModifyLiquiditySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ModifyLiquidityOrderBy>>;
  where?: InputMaybe<ModifyLiquidityBoolExp>;
};

export type QueryRootModifyLiquidityByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootPoolArgs = {
  distinct_on?: InputMaybe<Array<PoolSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PoolOrderBy>>;
  where?: InputMaybe<PoolBoolExp>;
};

export type QueryRootPool5MinuteDataArgs = {
  distinct_on?: InputMaybe<Array<Pool5MinuteDataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Pool5MinuteDataOrderBy>>;
  where?: InputMaybe<Pool5MinuteDataBoolExp>;
};

export type QueryRootPool5MinuteDataByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootPoolDayDataArgs = {
  distinct_on?: InputMaybe<Array<PoolDayDataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PoolDayDataOrderBy>>;
  where?: InputMaybe<PoolDayDataBoolExp>;
};

export type QueryRootPoolDayDataByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootPoolHourDataArgs = {
  distinct_on?: InputMaybe<Array<PoolHourDataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PoolHourDataOrderBy>>;
  where?: InputMaybe<PoolHourDataBoolExp>;
};

export type QueryRootPoolHourDataByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootPoolUserArgs = {
  distinct_on?: InputMaybe<Array<PoolUserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PoolUserOrderBy>>;
  where?: InputMaybe<PoolUserBoolExp>;
};

export type QueryRootPoolUserByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootPoolByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootPositionArgs = {
  distinct_on?: InputMaybe<Array<PositionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PositionOrderBy>>;
  where?: InputMaybe<PositionBoolExp>;
};

export type QueryRootPositionByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootSwapArgs = {
  distinct_on?: InputMaybe<Array<SwapSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SwapOrderBy>>;
  where?: InputMaybe<SwapBoolExp>;
};

export type QueryRootSwapByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootTickArgs = {
  distinct_on?: InputMaybe<Array<TickSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TickOrderBy>>;
  where?: InputMaybe<TickBoolExp>;
};

export type QueryRootTickByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootTokenArgs = {
  distinct_on?: InputMaybe<Array<TokenSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TokenOrderBy>>;
  where?: InputMaybe<TokenBoolExp>;
};

export type QueryRootTokenDayDataArgs = {
  distinct_on?: InputMaybe<Array<TokenDayDataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TokenDayDataOrderBy>>;
  where?: InputMaybe<TokenDayDataBoolExp>;
};

export type QueryRootTokenDayDataByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootTokenHourDataArgs = {
  distinct_on?: InputMaybe<Array<TokenHourDataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TokenHourDataOrderBy>>;
  where?: InputMaybe<TokenHourDataBoolExp>;
};

export type QueryRootTokenHourDataByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootTokenByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootTransactionArgs = {
  distinct_on?: InputMaybe<Array<TransactionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TransactionOrderBy>>;
  where?: InputMaybe<TransactionBoolExp>;
};

export type QueryRootTransactionByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootMetaArgs = {
  distinct_on?: InputMaybe<Array<MetaSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MetaOrderBy>>;
  where?: InputMaybe<MetaBoolExp>;
};

export type QueryRootChainMetadataArgs = {
  distinct_on?: InputMaybe<Array<ChainMetadataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ChainMetadataOrderBy>>;
  where?: InputMaybe<ChainMetadataBoolExp>;
};

export type QueryRootRawEventsArgs = {
  distinct_on?: InputMaybe<Array<RawEventsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RawEventsOrderBy>>;
  where?: InputMaybe<RawEventsBoolExp>;
};

export type QueryRootRawEventsByPkArgs = {
  serial: Scalars['Int']['input'];
};

/** columns and relationships of "raw_events" */
export type RawEvents = {
  __typename: 'raw_events';
  block_fields: Scalars['jsonb']['output'];
  block_hash: Scalars['String']['output'];
  block_number: Scalars['Int']['output'];
  block_timestamp: Scalars['Int']['output'];
  chain_id: Scalars['Int']['output'];
  contract_name: Scalars['String']['output'];
  event_id: Scalars['numeric']['output'];
  event_name: Scalars['String']['output'];
  log_index: Scalars['Int']['output'];
  params: Scalars['jsonb']['output'];
  serial: Scalars['Int']['output'];
  src_address: Scalars['String']['output'];
  transaction_fields: Scalars['jsonb']['output'];
};

/** columns and relationships of "raw_events" */
export type RawEventsBlockFieldsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "raw_events" */
export type RawEventsParamsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "raw_events" */
export type RawEventsTransactionFieldsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "raw_events". All fields are combined with a logical 'AND'. */
export type RawEventsBoolExp = {
  _and?: InputMaybe<Array<RawEventsBoolExp>>;
  _not?: InputMaybe<RawEventsBoolExp>;
  _or?: InputMaybe<Array<RawEventsBoolExp>>;
  block_fields?: InputMaybe<JsonbComparisonExp>;
  block_hash?: InputMaybe<StringComparisonExp>;
  block_number?: InputMaybe<IntComparisonExp>;
  block_timestamp?: InputMaybe<IntComparisonExp>;
  chain_id?: InputMaybe<IntComparisonExp>;
  contract_name?: InputMaybe<StringComparisonExp>;
  event_id?: InputMaybe<NumericComparisonExp>;
  event_name?: InputMaybe<StringComparisonExp>;
  log_index?: InputMaybe<IntComparisonExp>;
  params?: InputMaybe<JsonbComparisonExp>;
  serial?: InputMaybe<IntComparisonExp>;
  src_address?: InputMaybe<StringComparisonExp>;
  transaction_fields?: InputMaybe<JsonbComparisonExp>;
};

/** Ordering options when selecting data from "raw_events". */
export type RawEventsOrderBy = {
  block_fields?: InputMaybe<OrderBy>;
  block_hash?: InputMaybe<OrderBy>;
  block_number?: InputMaybe<OrderBy>;
  block_timestamp?: InputMaybe<OrderBy>;
  chain_id?: InputMaybe<OrderBy>;
  contract_name?: InputMaybe<OrderBy>;
  event_id?: InputMaybe<OrderBy>;
  event_name?: InputMaybe<OrderBy>;
  log_index?: InputMaybe<OrderBy>;
  params?: InputMaybe<OrderBy>;
  serial?: InputMaybe<OrderBy>;
  src_address?: InputMaybe<OrderBy>;
  transaction_fields?: InputMaybe<OrderBy>;
};

/** select columns of table "raw_events" */
export type RawEventsSelectColumn =
  /** column name */
  | 'block_fields'
  /** column name */
  | 'block_hash'
  /** column name */
  | 'block_number'
  /** column name */
  | 'block_timestamp'
  /** column name */
  | 'chain_id'
  /** column name */
  | 'contract_name'
  /** column name */
  | 'event_id'
  /** column name */
  | 'event_name'
  /** column name */
  | 'log_index'
  /** column name */
  | 'params'
  /** column name */
  | 'serial'
  /** column name */
  | 'src_address'
  /** column name */
  | 'transaction_fields';

/** Streaming cursor of the table "raw_events" */
export type RawEventsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: RawEventsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type RawEventsStreamCursorValueInput = {
  block_fields?: InputMaybe<Scalars['jsonb']['input']>;
  block_hash?: InputMaybe<Scalars['String']['input']>;
  block_number?: InputMaybe<Scalars['Int']['input']>;
  block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  contract_name?: InputMaybe<Scalars['String']['input']>;
  event_id?: InputMaybe<Scalars['numeric']['input']>;
  event_name?: InputMaybe<Scalars['String']['input']>;
  log_index?: InputMaybe<Scalars['Int']['input']>;
  params?: InputMaybe<Scalars['jsonb']['input']>;
  serial?: InputMaybe<Scalars['Int']['input']>;
  src_address?: InputMaybe<Scalars['String']['input']>;
  transaction_fields?: InputMaybe<Scalars['jsonb']['input']>;
};

export type SubscriptionRoot = {
  __typename: 'subscription_root';
  /** fetch data from the table: "HookStats" */
  HookStats: Array<HookStats>;
  /** fetch data from the table: "HookStats" using primary key columns */
  HookStats_by_pk?: Maybe<HookStats>;
  /** fetch data from the table in a streaming manner: "HookStats" */
  HookStats_stream: Array<HookStats>;
  /** fetch data from the table: "LiquidityProvider" */
  LiquidityProvider: Array<LiquidityProvider>;
  /** fetch data from the table: "LiquidityProvider" using primary key columns */
  LiquidityProvider_by_pk?: Maybe<LiquidityProvider>;
  /** fetch data from the table in a streaming manner: "LiquidityProvider" */
  LiquidityProvider_stream: Array<LiquidityProvider>;
  /** fetch data from the table: "ModifyLiquidity" */
  ModifyLiquidity: Array<ModifyLiquidity>;
  /** fetch data from the table: "ModifyLiquidity" using primary key columns */
  ModifyLiquidity_by_pk?: Maybe<ModifyLiquidity>;
  /** fetch data from the table in a streaming manner: "ModifyLiquidity" */
  ModifyLiquidity_stream: Array<ModifyLiquidity>;
  /** fetch data from the table: "Pool" */
  Pool: Array<Pool>;
  /** fetch data from the table: "Pool5MinuteData" */
  Pool5MinuteData: Array<Pool5MinuteData>;
  /** fetch data from the table: "Pool5MinuteData" using primary key columns */
  Pool5MinuteData_by_pk?: Maybe<Pool5MinuteData>;
  /** fetch data from the table in a streaming manner: "Pool5MinuteData" */
  Pool5MinuteData_stream: Array<Pool5MinuteData>;
  /** fetch data from the table: "PoolDayData" */
  PoolDayData: Array<PoolDayData>;
  /** fetch data from the table: "PoolDayData" using primary key columns */
  PoolDayData_by_pk?: Maybe<PoolDayData>;
  /** fetch data from the table in a streaming manner: "PoolDayData" */
  PoolDayData_stream: Array<PoolDayData>;
  /** fetch data from the table: "PoolHourData" */
  PoolHourData: Array<PoolHourData>;
  /** fetch data from the table: "PoolHourData" using primary key columns */
  PoolHourData_by_pk?: Maybe<PoolHourData>;
  /** fetch data from the table in a streaming manner: "PoolHourData" */
  PoolHourData_stream: Array<PoolHourData>;
  /** fetch data from the table: "PoolUser" */
  PoolUser: Array<PoolUser>;
  /** fetch data from the table: "PoolUser" using primary key columns */
  PoolUser_by_pk?: Maybe<PoolUser>;
  /** fetch data from the table in a streaming manner: "PoolUser" */
  PoolUser_stream: Array<PoolUser>;
  /** fetch data from the table: "Pool" using primary key columns */
  Pool_by_pk?: Maybe<Pool>;
  /** fetch data from the table in a streaming manner: "Pool" */
  Pool_stream: Array<Pool>;
  /** fetch data from the table: "Position" */
  Position: Array<Position>;
  /** fetch data from the table: "Position" using primary key columns */
  Position_by_pk?: Maybe<Position>;
  /** fetch data from the table in a streaming manner: "Position" */
  Position_stream: Array<Position>;
  /** fetch data from the table: "Swap" */
  Swap: Array<Swap>;
  /** fetch data from the table: "Swap" using primary key columns */
  Swap_by_pk?: Maybe<Swap>;
  /** fetch data from the table in a streaming manner: "Swap" */
  Swap_stream: Array<Swap>;
  /** fetch data from the table: "Tick" */
  Tick: Array<Tick>;
  /** fetch data from the table: "Tick" using primary key columns */
  Tick_by_pk?: Maybe<Tick>;
  /** fetch data from the table in a streaming manner: "Tick" */
  Tick_stream: Array<Tick>;
  /** fetch data from the table: "Token" */
  Token: Array<Token>;
  /** fetch data from the table: "TokenDayData" */
  TokenDayData: Array<TokenDayData>;
  /** fetch data from the table: "TokenDayData" using primary key columns */
  TokenDayData_by_pk?: Maybe<TokenDayData>;
  /** fetch data from the table in a streaming manner: "TokenDayData" */
  TokenDayData_stream: Array<TokenDayData>;
  /** fetch data from the table: "TokenHourData" */
  TokenHourData: Array<TokenHourData>;
  /** fetch data from the table: "TokenHourData" using primary key columns */
  TokenHourData_by_pk?: Maybe<TokenHourData>;
  /** fetch data from the table in a streaming manner: "TokenHourData" */
  TokenHourData_stream: Array<TokenHourData>;
  /** fetch data from the table: "Token" using primary key columns */
  Token_by_pk?: Maybe<Token>;
  /** fetch data from the table in a streaming manner: "Token" */
  Token_stream: Array<Token>;
  /** fetch data from the table: "Transaction" */
  Transaction: Array<Transaction>;
  /** fetch data from the table: "Transaction" using primary key columns */
  Transaction_by_pk?: Maybe<Transaction>;
  /** fetch data from the table in a streaming manner: "Transaction" */
  Transaction_stream: Array<Transaction>;
  /** fetch data from the table: "_meta" */
  _meta: Array<Meta>;
  /** fetch data from the table in a streaming manner: "_meta" */
  _meta_stream: Array<Meta>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<ChainMetadata>;
  /** fetch data from the table in a streaming manner: "chain_metadata" */
  chain_metadata_stream: Array<ChainMetadata>;
  /** fetch data from the table: "raw_events" */
  raw_events: Array<RawEvents>;
  /** fetch data from the table: "raw_events" using primary key columns */
  raw_events_by_pk?: Maybe<RawEvents>;
  /** fetch data from the table in a streaming manner: "raw_events" */
  raw_events_stream: Array<RawEvents>;
};

export type SubscriptionRootHookStatsArgs = {
  distinct_on?: InputMaybe<Array<HookStatsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<HookStatsOrderBy>>;
  where?: InputMaybe<HookStatsBoolExp>;
};

export type SubscriptionRootHookStatsByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootHookStatsStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<HookStatsStreamCursorInput>>;
  where?: InputMaybe<HookStatsBoolExp>;
};

export type SubscriptionRootLiquidityProviderArgs = {
  distinct_on?: InputMaybe<Array<LiquidityProviderSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<LiquidityProviderOrderBy>>;
  where?: InputMaybe<LiquidityProviderBoolExp>;
};

export type SubscriptionRootLiquidityProviderByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootLiquidityProviderStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<LiquidityProviderStreamCursorInput>>;
  where?: InputMaybe<LiquidityProviderBoolExp>;
};

export type SubscriptionRootModifyLiquidityArgs = {
  distinct_on?: InputMaybe<Array<ModifyLiquiditySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ModifyLiquidityOrderBy>>;
  where?: InputMaybe<ModifyLiquidityBoolExp>;
};

export type SubscriptionRootModifyLiquidityByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootModifyLiquidityStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ModifyLiquidityStreamCursorInput>>;
  where?: InputMaybe<ModifyLiquidityBoolExp>;
};

export type SubscriptionRootPoolArgs = {
  distinct_on?: InputMaybe<Array<PoolSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PoolOrderBy>>;
  where?: InputMaybe<PoolBoolExp>;
};

export type SubscriptionRootPool5MinuteDataArgs = {
  distinct_on?: InputMaybe<Array<Pool5MinuteDataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Pool5MinuteDataOrderBy>>;
  where?: InputMaybe<Pool5MinuteDataBoolExp>;
};

export type SubscriptionRootPool5MinuteDataByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootPool5MinuteDataStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Pool5MinuteDataStreamCursorInput>>;
  where?: InputMaybe<Pool5MinuteDataBoolExp>;
};

export type SubscriptionRootPoolDayDataArgs = {
  distinct_on?: InputMaybe<Array<PoolDayDataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PoolDayDataOrderBy>>;
  where?: InputMaybe<PoolDayDataBoolExp>;
};

export type SubscriptionRootPoolDayDataByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootPoolDayDataStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<PoolDayDataStreamCursorInput>>;
  where?: InputMaybe<PoolDayDataBoolExp>;
};

export type SubscriptionRootPoolHourDataArgs = {
  distinct_on?: InputMaybe<Array<PoolHourDataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PoolHourDataOrderBy>>;
  where?: InputMaybe<PoolHourDataBoolExp>;
};

export type SubscriptionRootPoolHourDataByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootPoolHourDataStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<PoolHourDataStreamCursorInput>>;
  where?: InputMaybe<PoolHourDataBoolExp>;
};

export type SubscriptionRootPoolUserArgs = {
  distinct_on?: InputMaybe<Array<PoolUserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PoolUserOrderBy>>;
  where?: InputMaybe<PoolUserBoolExp>;
};

export type SubscriptionRootPoolUserByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootPoolUserStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<PoolUserStreamCursorInput>>;
  where?: InputMaybe<PoolUserBoolExp>;
};

export type SubscriptionRootPoolByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootPoolStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<PoolStreamCursorInput>>;
  where?: InputMaybe<PoolBoolExp>;
};

export type SubscriptionRootPositionArgs = {
  distinct_on?: InputMaybe<Array<PositionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PositionOrderBy>>;
  where?: InputMaybe<PositionBoolExp>;
};

export type SubscriptionRootPositionByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootPositionStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<PositionStreamCursorInput>>;
  where?: InputMaybe<PositionBoolExp>;
};

export type SubscriptionRootSwapArgs = {
  distinct_on?: InputMaybe<Array<SwapSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SwapOrderBy>>;
  where?: InputMaybe<SwapBoolExp>;
};

export type SubscriptionRootSwapByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootSwapStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SwapStreamCursorInput>>;
  where?: InputMaybe<SwapBoolExp>;
};

export type SubscriptionRootTickArgs = {
  distinct_on?: InputMaybe<Array<TickSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TickOrderBy>>;
  where?: InputMaybe<TickBoolExp>;
};

export type SubscriptionRootTickByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootTickStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TickStreamCursorInput>>;
  where?: InputMaybe<TickBoolExp>;
};

export type SubscriptionRootTokenArgs = {
  distinct_on?: InputMaybe<Array<TokenSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TokenOrderBy>>;
  where?: InputMaybe<TokenBoolExp>;
};

export type SubscriptionRootTokenDayDataArgs = {
  distinct_on?: InputMaybe<Array<TokenDayDataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TokenDayDataOrderBy>>;
  where?: InputMaybe<TokenDayDataBoolExp>;
};

export type SubscriptionRootTokenDayDataByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootTokenDayDataStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TokenDayDataStreamCursorInput>>;
  where?: InputMaybe<TokenDayDataBoolExp>;
};

export type SubscriptionRootTokenHourDataArgs = {
  distinct_on?: InputMaybe<Array<TokenHourDataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TokenHourDataOrderBy>>;
  where?: InputMaybe<TokenHourDataBoolExp>;
};

export type SubscriptionRootTokenHourDataByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootTokenHourDataStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TokenHourDataStreamCursorInput>>;
  where?: InputMaybe<TokenHourDataBoolExp>;
};

export type SubscriptionRootTokenByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootTokenStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TokenStreamCursorInput>>;
  where?: InputMaybe<TokenBoolExp>;
};

export type SubscriptionRootTransactionArgs = {
  distinct_on?: InputMaybe<Array<TransactionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TransactionOrderBy>>;
  where?: InputMaybe<TransactionBoolExp>;
};

export type SubscriptionRootTransactionByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootTransactionStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TransactionStreamCursorInput>>;
  where?: InputMaybe<TransactionBoolExp>;
};

export type SubscriptionRootMetaArgs = {
  distinct_on?: InputMaybe<Array<MetaSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MetaOrderBy>>;
  where?: InputMaybe<MetaBoolExp>;
};

export type SubscriptionRootMetaStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<MetaStreamCursorInput>>;
  where?: InputMaybe<MetaBoolExp>;
};

export type SubscriptionRootChainMetadataArgs = {
  distinct_on?: InputMaybe<Array<ChainMetadataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ChainMetadataOrderBy>>;
  where?: InputMaybe<ChainMetadataBoolExp>;
};

export type SubscriptionRootChainMetadataStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ChainMetadataStreamCursorInput>>;
  where?: InputMaybe<ChainMetadataBoolExp>;
};

export type SubscriptionRootRawEventsArgs = {
  distinct_on?: InputMaybe<Array<RawEventsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RawEventsOrderBy>>;
  where?: InputMaybe<RawEventsBoolExp>;
};

export type SubscriptionRootRawEventsByPkArgs = {
  serial: Scalars['Int']['input'];
};

export type SubscriptionRootRawEventsStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<RawEventsStreamCursorInput>>;
  where?: InputMaybe<RawEventsBoolExp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

export type GetPoolVolumeQueryVariables = Exact<{
  poolId: Scalars['String']['input'];
}>;

export type GetPoolVolumeQuery = {
  __typename: 'query_root';
  Pool: Array<{
    __typename: 'Pool';
    id: string;
    volume0: any;
    volume1: any;
    fees0: any;
    fees1: any;
    txCount: any;
    swapCount: any;
    modifyLiquidityCount: any;
    positionCount: any;
  }>;
};

export type GetPoolUserVolumeQueryVariables = Exact<{
  poolId: Scalars['String']['input'];
  userAddr: Scalars['String']['input'];
}>;

export type GetPoolUserVolumeQuery = {
  __typename: 'query_root';
  PoolUser: Array<{
    __typename: 'PoolUser';
    address: string;
    volume0: any;
    volume1: any;
    fees0: any;
    fees1: any;
    swapCount: any;
  }>;
};

export type GetLpFeesQueryVariables = Exact<{
  lpId: Scalars['String']['input'];
}>;

export type GetLpFeesQuery = {
  __typename: 'query_root';
  LiquidityProvider: Array<{
    __typename: 'LiquidityProvider';
    id: string;
    fees0: any;
    fees1: any;
  }>;
};

export type GetPoolDayDataQueryVariables = Exact<{
  poolId: Scalars['String']['input'];
  startTimestamp?: InputMaybe<Scalars['Int']['input']>;
  endTimestamp?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetPoolDayDataQuery = {
  __typename: 'query_root';
  PoolDayData: Array<{
    __typename: 'PoolDayData';
    startTimestamp: number;
    volume0: any;
    volume1: any;
    open_: any;
    high: any;
    low: any;
    close: any;
    sqrtPriceX96: any;
  }>;
};

export type GetPoolHourDataQueryVariables = Exact<{
  poolId: Scalars['String']['input'];
  startTimestamp?: InputMaybe<Scalars['Int']['input']>;
  endTimestamp?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetPoolHourDataQuery = {
  __typename: 'query_root';
  PoolHourData: Array<{
    __typename: 'PoolHourData';
    startTimestamp: number;
    volume0: any;
    volume1: any;
    open_: any;
    high: any;
    low: any;
    close: any;
    sqrtPriceX96: any;
  }>;
};

export type GetPool5MinuteDataQueryVariables = Exact<{
  poolId: Scalars['String']['input'];
  startTimestamp?: InputMaybe<Scalars['Int']['input']>;
  endTimestamp?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetPool5MinuteDataQuery = {
  __typename: 'query_root';
  Pool5MinuteData: Array<{
    __typename: 'Pool5MinuteData';
    startTimestamp: number;
    volume0: any;
    volume1: any;
    open_: any;
    high: any;
    low: any;
    close: any;
    sqrtPriceX96: any;
  }>;
};

export const GetPoolVolumeDocument = gql`
  query GetPoolVolume($poolId: String!) {
    Pool(where: {id: {_eq: $poolId}}) {
      id
      volume0
      volume1
      fees0
      fees1
      txCount
      swapCount
      modifyLiquidityCount
      positionCount
    }
  }
`;
export const GetPoolUserVolumeDocument = gql`
  query GetPoolUserVolume($poolId: String!, $userAddr: String!) {
    PoolUser(where: {pool: {id: {_eq: $poolId}}, address: {_eq: $userAddr}}) {
      address
      volume0
      volume1
      fees0
      fees1
      swapCount
    }
  }
`;
export const GetLpFeesDocument = gql`
  query GetLPFees($lpId: String!) {
    LiquidityProvider(where: {id: {_eq: $lpId}}) {
      id
      fees0
      fees1
    }
  }
`;
export const GetPoolDayDataDocument = gql`
  query GetPoolDayData(
    $poolId: String!
    $startTimestamp: Int
    $endTimestamp: Int
    $limit: Int
    $offset: Int
  ) {
    PoolDayData(
      where: {
        pool: {id: {_eq: $poolId}}
        startTimestamp: {_gte: $startTimestamp, _lte: $endTimestamp}
      }
      order_by: {startTimestamp: asc}
      limit: $limit
      offset: $offset
    ) {
      startTimestamp
      volume0
      volume1
      open_
      high
      low
      close
      sqrtPriceX96
    }
  }
`;
export const GetPoolHourDataDocument = gql`
  query GetPoolHourData(
    $poolId: String!
    $startTimestamp: Int
    $endTimestamp: Int
    $limit: Int
    $offset: Int
  ) {
    PoolHourData(
      where: {
        pool: {id: {_eq: $poolId}}
        startTimestamp: {_gte: $startTimestamp, _lte: $endTimestamp}
      }
      order_by: {startTimestamp: asc}
      limit: $limit
      offset: $offset
    ) {
      startTimestamp
      volume0
      volume1
      open_
      high
      low
      close
      sqrtPriceX96
    }
  }
`;
export const GetPool5MinuteDataDocument = gql`
  query GetPool5MinuteData(
    $poolId: String!
    $startTimestamp: Int
    $endTimestamp: Int
    $limit: Int
    $offset: Int
  ) {
    Pool5MinuteData(
      where: {
        pool: {id: {_eq: $poolId}}
        startTimestamp: {_gte: $startTimestamp, _lte: $endTimestamp}
      }
      order_by: {startTimestamp: asc}
      limit: $limit
      offset: $offset
    ) {
      startTimestamp
      volume0
      volume1
      open_
      high
      low
      close
      sqrtPriceX96
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    GetPoolVolume(
      variables: GetPoolVolumeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetPoolVolumeQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetPoolVolumeQuery>({
            document: GetPoolVolumeDocument,
            variables,
            requestHeaders: {...requestHeaders, ...wrappedRequestHeaders},
            signal,
          }),
        'GetPoolVolume',
        'query',
        variables,
      );
    },
    GetPoolUserVolume(
      variables: GetPoolUserVolumeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetPoolUserVolumeQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetPoolUserVolumeQuery>({
            document: GetPoolUserVolumeDocument,
            variables,
            requestHeaders: {...requestHeaders, ...wrappedRequestHeaders},
            signal,
          }),
        'GetPoolUserVolume',
        'query',
        variables,
      );
    },
    GetLPFees(
      variables: GetLpFeesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetLpFeesQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetLpFeesQuery>({
            document: GetLpFeesDocument,
            variables,
            requestHeaders: {...requestHeaders, ...wrappedRequestHeaders},
            signal,
          }),
        'GetLPFees',
        'query',
        variables,
      );
    },
    GetPoolDayData(
      variables: GetPoolDayDataQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetPoolDayDataQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetPoolDayDataQuery>({
            document: GetPoolDayDataDocument,
            variables,
            requestHeaders: {...requestHeaders, ...wrappedRequestHeaders},
            signal,
          }),
        'GetPoolDayData',
        'query',
        variables,
      );
    },
    GetPoolHourData(
      variables: GetPoolHourDataQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetPoolHourDataQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetPoolHourDataQuery>({
            document: GetPoolHourDataDocument,
            variables,
            requestHeaders: {...requestHeaders, ...wrappedRequestHeaders},
            signal,
          }),
        'GetPoolHourData',
        'query',
        variables,
      );
    },
    GetPool5MinuteData(
      variables: GetPool5MinuteDataQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetPool5MinuteDataQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetPool5MinuteDataQuery>({
            document: GetPool5MinuteDataDocument,
            variables,
            requestHeaders: {...requestHeaders, ...wrappedRequestHeaders},
            signal,
          }),
        'GetPool5MinuteData',
        'query',
        variables,
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
