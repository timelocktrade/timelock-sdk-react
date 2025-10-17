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
  optiontype: {input: any; output: any};
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

/** columns and relationships of "BorrowEvent" */
export type BorrowEvent = {
  __typename: 'BorrowEvent';
  blockNumber: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  liquidity: Scalars['numeric']['output'];
  tickLower: Scalars['Int']['output'];
  tickUpper: Scalars['Int']['output'];
  timestamp: Scalars['numeric']['output'];
  transactionHash: Scalars['String']['output'];
  user: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "BorrowEvent". All fields are combined with a logical 'AND'. */
export type BorrowEventBoolExp = {
  _and?: InputMaybe<Array<BorrowEventBoolExp>>;
  _not?: InputMaybe<BorrowEventBoolExp>;
  _or?: InputMaybe<Array<BorrowEventBoolExp>>;
  blockNumber?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  liquidity?: InputMaybe<NumericComparisonExp>;
  tickLower?: InputMaybe<IntComparisonExp>;
  tickUpper?: InputMaybe<IntComparisonExp>;
  timestamp?: InputMaybe<NumericComparisonExp>;
  transactionHash?: InputMaybe<StringComparisonExp>;
  user?: InputMaybe<StringComparisonExp>;
};

/** Ordering options when selecting data from "BorrowEvent". */
export type BorrowEventOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  transactionHash?: InputMaybe<OrderBy>;
  user?: InputMaybe<OrderBy>;
};

/** select columns of table "BorrowEvent" */
export type BorrowEventSelectColumn =
  /** column name */
  | 'blockNumber'
  /** column name */
  | 'id'
  /** column name */
  | 'liquidity'
  /** column name */
  | 'tickLower'
  /** column name */
  | 'tickUpper'
  /** column name */
  | 'timestamp'
  /** column name */
  | 'transactionHash'
  /** column name */
  | 'user';

/** Streaming cursor of the table "BorrowEvent" */
export type BorrowEventStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: BorrowEventStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type BorrowEventStreamCursorValueInput = {
  blockNumber?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  liquidity?: InputMaybe<Scalars['numeric']['input']>;
  tickLower?: InputMaybe<Scalars['Int']['input']>;
  tickUpper?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "BurnEvent" */
export type BurnEvent = {
  __typename: 'BurnEvent';
  blockNumber: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  liquidity: Scalars['numeric']['output'];
  tickLower: Scalars['Int']['output'];
  tickUpper: Scalars['Int']['output'];
  timestamp: Scalars['numeric']['output'];
  transactionHash: Scalars['String']['output'];
  user: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "BurnEvent". All fields are combined with a logical 'AND'. */
export type BurnEventBoolExp = {
  _and?: InputMaybe<Array<BurnEventBoolExp>>;
  _not?: InputMaybe<BurnEventBoolExp>;
  _or?: InputMaybe<Array<BurnEventBoolExp>>;
  blockNumber?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  liquidity?: InputMaybe<NumericComparisonExp>;
  tickLower?: InputMaybe<IntComparisonExp>;
  tickUpper?: InputMaybe<IntComparisonExp>;
  timestamp?: InputMaybe<NumericComparisonExp>;
  transactionHash?: InputMaybe<StringComparisonExp>;
  user?: InputMaybe<StringComparisonExp>;
};

/** Ordering options when selecting data from "BurnEvent". */
export type BurnEventOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  transactionHash?: InputMaybe<OrderBy>;
  user?: InputMaybe<OrderBy>;
};

/** select columns of table "BurnEvent" */
export type BurnEventSelectColumn =
  /** column name */
  | 'blockNumber'
  /** column name */
  | 'id'
  /** column name */
  | 'liquidity'
  /** column name */
  | 'tickLower'
  /** column name */
  | 'tickUpper'
  /** column name */
  | 'timestamp'
  /** column name */
  | 'transactionHash'
  /** column name */
  | 'user';

/** Streaming cursor of the table "BurnEvent" */
export type BurnEventStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: BurnEventStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type BurnEventStreamCursorValueInput = {
  blockNumber?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  liquidity?: InputMaybe<Scalars['numeric']['input']>;
  tickLower?: InputMaybe<Scalars['Int']['input']>;
  tickUpper?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "ExerciseOptionEvent" */
export type ExerciseOptionEvent = {
  __typename: 'ExerciseOptionEvent';
  blockNumber: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  liquidities: Array<Scalars['numeric']['output']>;
  /** An object relationship */
  option?: Maybe<UserOption>;
  option_id: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  payout: Scalars['numeric']['output'];
  timestamp: Scalars['numeric']['output'];
  transactionHash: Scalars['String']['output'];
};

/** order by aggregate values of table "ExerciseOptionEvent" */
export type ExerciseOptionEventAggregateOrderBy = {
  avg?: InputMaybe<ExerciseOptionEventAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<ExerciseOptionEventMaxOrderBy>;
  min?: InputMaybe<ExerciseOptionEventMinOrderBy>;
  stddev?: InputMaybe<ExerciseOptionEventStddevOrderBy>;
  stddev_pop?: InputMaybe<ExerciseOptionEventStddevPopOrderBy>;
  stddev_samp?: InputMaybe<ExerciseOptionEventStddevSampOrderBy>;
  sum?: InputMaybe<ExerciseOptionEventSumOrderBy>;
  var_pop?: InputMaybe<ExerciseOptionEventVarPopOrderBy>;
  var_samp?: InputMaybe<ExerciseOptionEventVarSampOrderBy>;
  variance?: InputMaybe<ExerciseOptionEventVarianceOrderBy>;
};

/** order by avg() on columns of table "ExerciseOptionEvent" */
export type ExerciseOptionEventAvgOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  payout?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "ExerciseOptionEvent". All fields are combined with a logical 'AND'. */
export type ExerciseOptionEventBoolExp = {
  _and?: InputMaybe<Array<ExerciseOptionEventBoolExp>>;
  _not?: InputMaybe<ExerciseOptionEventBoolExp>;
  _or?: InputMaybe<Array<ExerciseOptionEventBoolExp>>;
  blockNumber?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  liquidities?: InputMaybe<NumericArrayComparisonExp>;
  option?: InputMaybe<UserOptionBoolExp>;
  option_id?: InputMaybe<StringComparisonExp>;
  owner?: InputMaybe<StringComparisonExp>;
  payout?: InputMaybe<NumericComparisonExp>;
  timestamp?: InputMaybe<NumericComparisonExp>;
  transactionHash?: InputMaybe<StringComparisonExp>;
};

/** order by max() on columns of table "ExerciseOptionEvent" */
export type ExerciseOptionEventMaxOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidities?: InputMaybe<OrderBy>;
  option_id?: InputMaybe<OrderBy>;
  owner?: InputMaybe<OrderBy>;
  payout?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  transactionHash?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "ExerciseOptionEvent" */
export type ExerciseOptionEventMinOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidities?: InputMaybe<OrderBy>;
  option_id?: InputMaybe<OrderBy>;
  owner?: InputMaybe<OrderBy>;
  payout?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  transactionHash?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "ExerciseOptionEvent". */
export type ExerciseOptionEventOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidities?: InputMaybe<OrderBy>;
  option?: InputMaybe<UserOptionOrderBy>;
  option_id?: InputMaybe<OrderBy>;
  owner?: InputMaybe<OrderBy>;
  payout?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  transactionHash?: InputMaybe<OrderBy>;
};

/** select columns of table "ExerciseOptionEvent" */
export type ExerciseOptionEventSelectColumn =
  /** column name */
  | 'blockNumber'
  /** column name */
  | 'id'
  /** column name */
  | 'liquidities'
  /** column name */
  | 'option_id'
  /** column name */
  | 'owner'
  /** column name */
  | 'payout'
  /** column name */
  | 'timestamp'
  /** column name */
  | 'transactionHash';

/** order by stddev() on columns of table "ExerciseOptionEvent" */
export type ExerciseOptionEventStddevOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  payout?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "ExerciseOptionEvent" */
export type ExerciseOptionEventStddevPopOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  payout?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "ExerciseOptionEvent" */
export type ExerciseOptionEventStddevSampOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  payout?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "ExerciseOptionEvent" */
export type ExerciseOptionEventStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: ExerciseOptionEventStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ExerciseOptionEventStreamCursorValueInput = {
  blockNumber?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  liquidities?: InputMaybe<Array<Scalars['numeric']['input']>>;
  option_id?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  payout?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "ExerciseOptionEvent" */
export type ExerciseOptionEventSumOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  payout?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "ExerciseOptionEvent" */
export type ExerciseOptionEventVarPopOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  payout?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "ExerciseOptionEvent" */
export type ExerciseOptionEventVarSampOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  payout?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "ExerciseOptionEvent" */
export type ExerciseOptionEventVarianceOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  payout?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
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

/** columns and relationships of "MintEvent" */
export type MintEvent = {
  __typename: 'MintEvent';
  blockNumber: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  liquidity: Scalars['numeric']['output'];
  tickLower: Scalars['Int']['output'];
  tickUpper: Scalars['Int']['output'];
  timestamp: Scalars['numeric']['output'];
  transactionHash: Scalars['String']['output'];
  user: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "MintEvent". All fields are combined with a logical 'AND'. */
export type MintEventBoolExp = {
  _and?: InputMaybe<Array<MintEventBoolExp>>;
  _not?: InputMaybe<MintEventBoolExp>;
  _or?: InputMaybe<Array<MintEventBoolExp>>;
  blockNumber?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  liquidity?: InputMaybe<NumericComparisonExp>;
  tickLower?: InputMaybe<IntComparisonExp>;
  tickUpper?: InputMaybe<IntComparisonExp>;
  timestamp?: InputMaybe<NumericComparisonExp>;
  transactionHash?: InputMaybe<StringComparisonExp>;
  user?: InputMaybe<StringComparisonExp>;
};

/** Ordering options when selecting data from "MintEvent". */
export type MintEventOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  transactionHash?: InputMaybe<OrderBy>;
  user?: InputMaybe<OrderBy>;
};

/** select columns of table "MintEvent" */
export type MintEventSelectColumn =
  /** column name */
  | 'blockNumber'
  /** column name */
  | 'id'
  /** column name */
  | 'liquidity'
  /** column name */
  | 'tickLower'
  /** column name */
  | 'tickUpper'
  /** column name */
  | 'timestamp'
  /** column name */
  | 'transactionHash'
  /** column name */
  | 'user';

/** Streaming cursor of the table "MintEvent" */
export type MintEventStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: MintEventStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type MintEventStreamCursorValueInput = {
  blockNumber?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  liquidity?: InputMaybe<Scalars['numeric']['input']>;
  tickLower?: InputMaybe<Scalars['Int']['input']>;
  tickUpper?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "MintOptionEvent" */
export type MintOptionEvent = {
  __typename: 'MintOptionEvent';
  blockNumber: Scalars['numeric']['output'];
  buyer: Scalars['String']['output'];
  currentTick: Scalars['Int']['output'];
  expiresAt: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  liquidities: Array<Scalars['numeric']['output']>;
  optionType: Scalars['Int']['output'];
  strikeTick: Scalars['Int']['output'];
  timestamp: Scalars['numeric']['output'];
  totalPremium: Scalars['numeric']['output'];
  transactionHash: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "MintOptionEvent". All fields are combined with a logical 'AND'. */
export type MintOptionEventBoolExp = {
  _and?: InputMaybe<Array<MintOptionEventBoolExp>>;
  _not?: InputMaybe<MintOptionEventBoolExp>;
  _or?: InputMaybe<Array<MintOptionEventBoolExp>>;
  blockNumber?: InputMaybe<NumericComparisonExp>;
  buyer?: InputMaybe<StringComparisonExp>;
  currentTick?: InputMaybe<IntComparisonExp>;
  expiresAt?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  liquidities?: InputMaybe<NumericArrayComparisonExp>;
  optionType?: InputMaybe<IntComparisonExp>;
  strikeTick?: InputMaybe<IntComparisonExp>;
  timestamp?: InputMaybe<NumericComparisonExp>;
  totalPremium?: InputMaybe<NumericComparisonExp>;
  transactionHash?: InputMaybe<StringComparisonExp>;
};

/** Ordering options when selecting data from "MintOptionEvent". */
export type MintOptionEventOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  buyer?: InputMaybe<OrderBy>;
  currentTick?: InputMaybe<OrderBy>;
  expiresAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidities?: InputMaybe<OrderBy>;
  optionType?: InputMaybe<OrderBy>;
  strikeTick?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  totalPremium?: InputMaybe<OrderBy>;
  transactionHash?: InputMaybe<OrderBy>;
};

/** select columns of table "MintOptionEvent" */
export type MintOptionEventSelectColumn =
  /** column name */
  | 'blockNumber'
  /** column name */
  | 'buyer'
  /** column name */
  | 'currentTick'
  /** column name */
  | 'expiresAt'
  /** column name */
  | 'id'
  /** column name */
  | 'liquidities'
  /** column name */
  | 'optionType'
  /** column name */
  | 'strikeTick'
  /** column name */
  | 'timestamp'
  /** column name */
  | 'totalPremium'
  /** column name */
  | 'transactionHash';

/** Streaming cursor of the table "MintOptionEvent" */
export type MintOptionEventStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: MintOptionEventStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type MintOptionEventStreamCursorValueInput = {
  blockNumber?: InputMaybe<Scalars['numeric']['input']>;
  buyer?: InputMaybe<Scalars['String']['input']>;
  currentTick?: InputMaybe<Scalars['Int']['input']>;
  expiresAt?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  liquidities?: InputMaybe<Array<Scalars['numeric']['input']>>;
  optionType?: InputMaybe<Scalars['Int']['input']>;
  strikeTick?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
  totalPremium?: InputMaybe<Scalars['numeric']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "RepayEvent" */
export type RepayEvent = {
  __typename: 'RepayEvent';
  blockNumber: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  liquidity: Scalars['numeric']['output'];
  tickLower: Scalars['Int']['output'];
  tickUpper: Scalars['Int']['output'];
  timestamp: Scalars['numeric']['output'];
  transactionHash: Scalars['String']['output'];
  user: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "RepayEvent". All fields are combined with a logical 'AND'. */
export type RepayEventBoolExp = {
  _and?: InputMaybe<Array<RepayEventBoolExp>>;
  _not?: InputMaybe<RepayEventBoolExp>;
  _or?: InputMaybe<Array<RepayEventBoolExp>>;
  blockNumber?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  liquidity?: InputMaybe<NumericComparisonExp>;
  tickLower?: InputMaybe<IntComparisonExp>;
  tickUpper?: InputMaybe<IntComparisonExp>;
  timestamp?: InputMaybe<NumericComparisonExp>;
  transactionHash?: InputMaybe<StringComparisonExp>;
  user?: InputMaybe<StringComparisonExp>;
};

/** Ordering options when selecting data from "RepayEvent". */
export type RepayEventOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquidity?: InputMaybe<OrderBy>;
  tickLower?: InputMaybe<OrderBy>;
  tickUpper?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  transactionHash?: InputMaybe<OrderBy>;
  user?: InputMaybe<OrderBy>;
};

/** select columns of table "RepayEvent" */
export type RepayEventSelectColumn =
  /** column name */
  | 'blockNumber'
  /** column name */
  | 'id'
  /** column name */
  | 'liquidity'
  /** column name */
  | 'tickLower'
  /** column name */
  | 'tickUpper'
  /** column name */
  | 'timestamp'
  /** column name */
  | 'transactionHash'
  /** column name */
  | 'user';

/** Streaming cursor of the table "RepayEvent" */
export type RepayEventStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: RepayEventStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type RepayEventStreamCursorValueInput = {
  blockNumber?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  liquidity?: InputMaybe<Scalars['numeric']['input']>;
  tickLower?: InputMaybe<Scalars['Int']['input']>;
  tickUpper?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
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

/** columns and relationships of "TimelockMarket" */
export type TimelockMarket = {
  __typename: 'TimelockMarket';
  id: Scalars['String']['output'];
  optionAsset: Scalars['String']['output'];
  optionAssetDecimals: Scalars['Int']['output'];
  optionAssetIsToken0: Scalars['Boolean']['output'];
  optionAssetName: Scalars['String']['output'];
  optionAssetSymbol: Scalars['String']['output'];
  /** An array relationship */
  options: Array<UserOption>;
  optionsCount: Scalars['numeric']['output'];
  payoutAsset: Scalars['String']['output'];
  payoutAssetDecimals: Scalars['Int']['output'];
  payoutAssetName: Scalars['String']['output'];
  payoutAssetSymbol: Scalars['String']['output'];
  pool: Scalars['String']['output'];
  tickSpacing: Scalars['Int']['output'];
  /** An array relationship */
  traders: Array<TimelockMarketUser>;
  tradersCount: Scalars['numeric']['output'];
  vault: Scalars['String']['output'];
};

/** columns and relationships of "TimelockMarket" */
export type TimelockMarketOptionsArgs = {
  distinct_on?: InputMaybe<Array<UserOptionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserOptionOrderBy>>;
  where?: InputMaybe<UserOptionBoolExp>;
};

/** columns and relationships of "TimelockMarket" */
export type TimelockMarketTradersArgs = {
  distinct_on?: InputMaybe<Array<TimelockMarketUserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TimelockMarketUserOrderBy>>;
  where?: InputMaybe<TimelockMarketUserBoolExp>;
};

/** columns and relationships of "TimelockMarketUser" */
export type TimelockMarketUser = {
  __typename: 'TimelockMarketUser';
  id: Scalars['String']['output'];
  /** An object relationship */
  market?: Maybe<TimelockMarket>;
  market_id: Scalars['String']['output'];
  /** An array relationship */
  options: Array<UserOption>;
  optionsCount: Scalars['numeric']['output'];
  userAddr: Scalars['String']['output'];
};

/** columns and relationships of "TimelockMarketUser" */
export type TimelockMarketUserOptionsArgs = {
  distinct_on?: InputMaybe<Array<UserOptionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserOptionOrderBy>>;
  where?: InputMaybe<UserOptionBoolExp>;
};

/** order by aggregate values of table "TimelockMarketUser" */
export type TimelockMarketUserAggregateOrderBy = {
  avg?: InputMaybe<TimelockMarketUserAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<TimelockMarketUserMaxOrderBy>;
  min?: InputMaybe<TimelockMarketUserMinOrderBy>;
  stddev?: InputMaybe<TimelockMarketUserStddevOrderBy>;
  stddev_pop?: InputMaybe<TimelockMarketUserStddevPopOrderBy>;
  stddev_samp?: InputMaybe<TimelockMarketUserStddevSampOrderBy>;
  sum?: InputMaybe<TimelockMarketUserSumOrderBy>;
  var_pop?: InputMaybe<TimelockMarketUserVarPopOrderBy>;
  var_samp?: InputMaybe<TimelockMarketUserVarSampOrderBy>;
  variance?: InputMaybe<TimelockMarketUserVarianceOrderBy>;
};

/** order by avg() on columns of table "TimelockMarketUser" */
export type TimelockMarketUserAvgOrderBy = {
  optionsCount?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "TimelockMarketUser". All fields are combined with a logical 'AND'. */
export type TimelockMarketUserBoolExp = {
  _and?: InputMaybe<Array<TimelockMarketUserBoolExp>>;
  _not?: InputMaybe<TimelockMarketUserBoolExp>;
  _or?: InputMaybe<Array<TimelockMarketUserBoolExp>>;
  id?: InputMaybe<StringComparisonExp>;
  market?: InputMaybe<TimelockMarketBoolExp>;
  market_id?: InputMaybe<StringComparisonExp>;
  options?: InputMaybe<UserOptionBoolExp>;
  optionsCount?: InputMaybe<NumericComparisonExp>;
  userAddr?: InputMaybe<StringComparisonExp>;
};

/** order by max() on columns of table "TimelockMarketUser" */
export type TimelockMarketUserMaxOrderBy = {
  id?: InputMaybe<OrderBy>;
  market_id?: InputMaybe<OrderBy>;
  optionsCount?: InputMaybe<OrderBy>;
  userAddr?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "TimelockMarketUser" */
export type TimelockMarketUserMinOrderBy = {
  id?: InputMaybe<OrderBy>;
  market_id?: InputMaybe<OrderBy>;
  optionsCount?: InputMaybe<OrderBy>;
  userAddr?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "TimelockMarketUser". */
export type TimelockMarketUserOrderBy = {
  id?: InputMaybe<OrderBy>;
  market?: InputMaybe<TimelockMarketOrderBy>;
  market_id?: InputMaybe<OrderBy>;
  optionsCount?: InputMaybe<OrderBy>;
  options_aggregate?: InputMaybe<UserOptionAggregateOrderBy>;
  userAddr?: InputMaybe<OrderBy>;
};

/** select columns of table "TimelockMarketUser" */
export type TimelockMarketUserSelectColumn =
  /** column name */
  | 'id'
  /** column name */
  | 'market_id'
  /** column name */
  | 'optionsCount'
  /** column name */
  | 'userAddr';

/** order by stddev() on columns of table "TimelockMarketUser" */
export type TimelockMarketUserStddevOrderBy = {
  optionsCount?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "TimelockMarketUser" */
export type TimelockMarketUserStddevPopOrderBy = {
  optionsCount?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "TimelockMarketUser" */
export type TimelockMarketUserStddevSampOrderBy = {
  optionsCount?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "TimelockMarketUser" */
export type TimelockMarketUserStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: TimelockMarketUserStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type TimelockMarketUserStreamCursorValueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  market_id?: InputMaybe<Scalars['String']['input']>;
  optionsCount?: InputMaybe<Scalars['numeric']['input']>;
  userAddr?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "TimelockMarketUser" */
export type TimelockMarketUserSumOrderBy = {
  optionsCount?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "TimelockMarketUser" */
export type TimelockMarketUserVarPopOrderBy = {
  optionsCount?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "TimelockMarketUser" */
export type TimelockMarketUserVarSampOrderBy = {
  optionsCount?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "TimelockMarketUser" */
export type TimelockMarketUserVarianceOrderBy = {
  optionsCount?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "TimelockMarket". All fields are combined with a logical 'AND'. */
export type TimelockMarketBoolExp = {
  _and?: InputMaybe<Array<TimelockMarketBoolExp>>;
  _not?: InputMaybe<TimelockMarketBoolExp>;
  _or?: InputMaybe<Array<TimelockMarketBoolExp>>;
  id?: InputMaybe<StringComparisonExp>;
  optionAsset?: InputMaybe<StringComparisonExp>;
  optionAssetDecimals?: InputMaybe<IntComparisonExp>;
  optionAssetIsToken0?: InputMaybe<BooleanComparisonExp>;
  optionAssetName?: InputMaybe<StringComparisonExp>;
  optionAssetSymbol?: InputMaybe<StringComparisonExp>;
  options?: InputMaybe<UserOptionBoolExp>;
  optionsCount?: InputMaybe<NumericComparisonExp>;
  payoutAsset?: InputMaybe<StringComparisonExp>;
  payoutAssetDecimals?: InputMaybe<IntComparisonExp>;
  payoutAssetName?: InputMaybe<StringComparisonExp>;
  payoutAssetSymbol?: InputMaybe<StringComparisonExp>;
  pool?: InputMaybe<StringComparisonExp>;
  tickSpacing?: InputMaybe<IntComparisonExp>;
  traders?: InputMaybe<TimelockMarketUserBoolExp>;
  tradersCount?: InputMaybe<NumericComparisonExp>;
  vault?: InputMaybe<StringComparisonExp>;
};

/** Ordering options when selecting data from "TimelockMarket". */
export type TimelockMarketOrderBy = {
  id?: InputMaybe<OrderBy>;
  optionAsset?: InputMaybe<OrderBy>;
  optionAssetDecimals?: InputMaybe<OrderBy>;
  optionAssetIsToken0?: InputMaybe<OrderBy>;
  optionAssetName?: InputMaybe<OrderBy>;
  optionAssetSymbol?: InputMaybe<OrderBy>;
  optionsCount?: InputMaybe<OrderBy>;
  options_aggregate?: InputMaybe<UserOptionAggregateOrderBy>;
  payoutAsset?: InputMaybe<OrderBy>;
  payoutAssetDecimals?: InputMaybe<OrderBy>;
  payoutAssetName?: InputMaybe<OrderBy>;
  payoutAssetSymbol?: InputMaybe<OrderBy>;
  pool?: InputMaybe<OrderBy>;
  tickSpacing?: InputMaybe<OrderBy>;
  tradersCount?: InputMaybe<OrderBy>;
  traders_aggregate?: InputMaybe<TimelockMarketUserAggregateOrderBy>;
  vault?: InputMaybe<OrderBy>;
};

/** select columns of table "TimelockMarket" */
export type TimelockMarketSelectColumn =
  /** column name */
  | 'id'
  /** column name */
  | 'optionAsset'
  /** column name */
  | 'optionAssetDecimals'
  /** column name */
  | 'optionAssetIsToken0'
  /** column name */
  | 'optionAssetName'
  /** column name */
  | 'optionAssetSymbol'
  /** column name */
  | 'optionsCount'
  /** column name */
  | 'payoutAsset'
  /** column name */
  | 'payoutAssetDecimals'
  /** column name */
  | 'payoutAssetName'
  /** column name */
  | 'payoutAssetSymbol'
  /** column name */
  | 'pool'
  /** column name */
  | 'tickSpacing'
  /** column name */
  | 'tradersCount'
  /** column name */
  | 'vault';

/** Streaming cursor of the table "TimelockMarket" */
export type TimelockMarketStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: TimelockMarketStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type TimelockMarketStreamCursorValueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  optionAsset?: InputMaybe<Scalars['String']['input']>;
  optionAssetDecimals?: InputMaybe<Scalars['Int']['input']>;
  optionAssetIsToken0?: InputMaybe<Scalars['Boolean']['input']>;
  optionAssetName?: InputMaybe<Scalars['String']['input']>;
  optionAssetSymbol?: InputMaybe<Scalars['String']['input']>;
  optionsCount?: InputMaybe<Scalars['numeric']['input']>;
  payoutAsset?: InputMaybe<Scalars['String']['input']>;
  payoutAssetDecimals?: InputMaybe<Scalars['Int']['input']>;
  payoutAssetName?: InputMaybe<Scalars['String']['input']>;
  payoutAssetSymbol?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['String']['input']>;
  tickSpacing?: InputMaybe<Scalars['Int']['input']>;
  tradersCount?: InputMaybe<Scalars['numeric']['input']>;
  vault?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "UserOption" */
export type UserOption = {
  __typename: 'UserOption';
  createdAt: Scalars['Int']['output'];
  entryPrice: Scalars['numeric']['output'];
  entryTick: Scalars['Int']['output'];
  /** An array relationship */
  exerciseEvents: Array<ExerciseOptionEvent>;
  expiresAt: Scalars['Int']['output'];
  fullyExercised: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  liquiditiesAtOpen: Array<Scalars['numeric']['output']>;
  liquiditiesCurrent: Array<Scalars['numeric']['output']>;
  /** An object relationship */
  market?: Maybe<TimelockMarket>;
  marketAddr: Scalars['String']['output'];
  market_id: Scalars['String']['output'];
  /** An object relationship */
  mintEvent?: Maybe<MintOptionEvent>;
  mintEvent_id: Scalars['String']['output'];
  optionType: Scalars['optiontype']['output'];
  /** An object relationship */
  owner?: Maybe<TimelockMarketUser>;
  ownerAddr: Scalars['String']['output'];
  owner_id: Scalars['String']['output'];
  positionSizeAtOpen: Scalars['numeric']['output'];
  positionSizeCurrent: Scalars['numeric']['output'];
  premiumPaid: Scalars['numeric']['output'];
  realizedPayout: Scalars['numeric']['output'];
  strikePrice: Scalars['numeric']['output'];
  strikeTick: Scalars['Int']['output'];
};

/** columns and relationships of "UserOption" */
export type UserOptionExerciseEventsArgs = {
  distinct_on?: InputMaybe<Array<ExerciseOptionEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ExerciseOptionEventOrderBy>>;
  where?: InputMaybe<ExerciseOptionEventBoolExp>;
};

/** order by aggregate values of table "UserOption" */
export type UserOptionAggregateOrderBy = {
  avg?: InputMaybe<UserOptionAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<UserOptionMaxOrderBy>;
  min?: InputMaybe<UserOptionMinOrderBy>;
  stddev?: InputMaybe<UserOptionStddevOrderBy>;
  stddev_pop?: InputMaybe<UserOptionStddevPopOrderBy>;
  stddev_samp?: InputMaybe<UserOptionStddevSampOrderBy>;
  sum?: InputMaybe<UserOptionSumOrderBy>;
  var_pop?: InputMaybe<UserOptionVarPopOrderBy>;
  var_samp?: InputMaybe<UserOptionVarSampOrderBy>;
  variance?: InputMaybe<UserOptionVarianceOrderBy>;
};

/** order by avg() on columns of table "UserOption" */
export type UserOptionAvgOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  entryPrice?: InputMaybe<OrderBy>;
  entryTick?: InputMaybe<OrderBy>;
  expiresAt?: InputMaybe<OrderBy>;
  positionSizeAtOpen?: InputMaybe<OrderBy>;
  positionSizeCurrent?: InputMaybe<OrderBy>;
  premiumPaid?: InputMaybe<OrderBy>;
  realizedPayout?: InputMaybe<OrderBy>;
  strikePrice?: InputMaybe<OrderBy>;
  strikeTick?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "UserOption". All fields are combined with a logical 'AND'. */
export type UserOptionBoolExp = {
  _and?: InputMaybe<Array<UserOptionBoolExp>>;
  _not?: InputMaybe<UserOptionBoolExp>;
  _or?: InputMaybe<Array<UserOptionBoolExp>>;
  createdAt?: InputMaybe<IntComparisonExp>;
  entryPrice?: InputMaybe<NumericComparisonExp>;
  entryTick?: InputMaybe<IntComparisonExp>;
  exerciseEvents?: InputMaybe<ExerciseOptionEventBoolExp>;
  expiresAt?: InputMaybe<IntComparisonExp>;
  fullyExercised?: InputMaybe<BooleanComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  liquiditiesAtOpen?: InputMaybe<NumericArrayComparisonExp>;
  liquiditiesCurrent?: InputMaybe<NumericArrayComparisonExp>;
  market?: InputMaybe<TimelockMarketBoolExp>;
  marketAddr?: InputMaybe<StringComparisonExp>;
  market_id?: InputMaybe<StringComparisonExp>;
  mintEvent?: InputMaybe<MintOptionEventBoolExp>;
  mintEvent_id?: InputMaybe<StringComparisonExp>;
  optionType?: InputMaybe<OptiontypeComparisonExp>;
  owner?: InputMaybe<TimelockMarketUserBoolExp>;
  ownerAddr?: InputMaybe<StringComparisonExp>;
  owner_id?: InputMaybe<StringComparisonExp>;
  positionSizeAtOpen?: InputMaybe<NumericComparisonExp>;
  positionSizeCurrent?: InputMaybe<NumericComparisonExp>;
  premiumPaid?: InputMaybe<NumericComparisonExp>;
  realizedPayout?: InputMaybe<NumericComparisonExp>;
  strikePrice?: InputMaybe<NumericComparisonExp>;
  strikeTick?: InputMaybe<IntComparisonExp>;
};

/** order by max() on columns of table "UserOption" */
export type UserOptionMaxOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  entryPrice?: InputMaybe<OrderBy>;
  entryTick?: InputMaybe<OrderBy>;
  expiresAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquiditiesAtOpen?: InputMaybe<OrderBy>;
  liquiditiesCurrent?: InputMaybe<OrderBy>;
  marketAddr?: InputMaybe<OrderBy>;
  market_id?: InputMaybe<OrderBy>;
  mintEvent_id?: InputMaybe<OrderBy>;
  optionType?: InputMaybe<OrderBy>;
  ownerAddr?: InputMaybe<OrderBy>;
  owner_id?: InputMaybe<OrderBy>;
  positionSizeAtOpen?: InputMaybe<OrderBy>;
  positionSizeCurrent?: InputMaybe<OrderBy>;
  premiumPaid?: InputMaybe<OrderBy>;
  realizedPayout?: InputMaybe<OrderBy>;
  strikePrice?: InputMaybe<OrderBy>;
  strikeTick?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "UserOption" */
export type UserOptionMinOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  entryPrice?: InputMaybe<OrderBy>;
  entryTick?: InputMaybe<OrderBy>;
  expiresAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquiditiesAtOpen?: InputMaybe<OrderBy>;
  liquiditiesCurrent?: InputMaybe<OrderBy>;
  marketAddr?: InputMaybe<OrderBy>;
  market_id?: InputMaybe<OrderBy>;
  mintEvent_id?: InputMaybe<OrderBy>;
  optionType?: InputMaybe<OrderBy>;
  ownerAddr?: InputMaybe<OrderBy>;
  owner_id?: InputMaybe<OrderBy>;
  positionSizeAtOpen?: InputMaybe<OrderBy>;
  positionSizeCurrent?: InputMaybe<OrderBy>;
  premiumPaid?: InputMaybe<OrderBy>;
  realizedPayout?: InputMaybe<OrderBy>;
  strikePrice?: InputMaybe<OrderBy>;
  strikeTick?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "UserOption". */
export type UserOptionOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  entryPrice?: InputMaybe<OrderBy>;
  entryTick?: InputMaybe<OrderBy>;
  exerciseEvents_aggregate?: InputMaybe<ExerciseOptionEventAggregateOrderBy>;
  expiresAt?: InputMaybe<OrderBy>;
  fullyExercised?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  liquiditiesAtOpen?: InputMaybe<OrderBy>;
  liquiditiesCurrent?: InputMaybe<OrderBy>;
  market?: InputMaybe<TimelockMarketOrderBy>;
  marketAddr?: InputMaybe<OrderBy>;
  market_id?: InputMaybe<OrderBy>;
  mintEvent?: InputMaybe<MintOptionEventOrderBy>;
  mintEvent_id?: InputMaybe<OrderBy>;
  optionType?: InputMaybe<OrderBy>;
  owner?: InputMaybe<TimelockMarketUserOrderBy>;
  ownerAddr?: InputMaybe<OrderBy>;
  owner_id?: InputMaybe<OrderBy>;
  positionSizeAtOpen?: InputMaybe<OrderBy>;
  positionSizeCurrent?: InputMaybe<OrderBy>;
  premiumPaid?: InputMaybe<OrderBy>;
  realizedPayout?: InputMaybe<OrderBy>;
  strikePrice?: InputMaybe<OrderBy>;
  strikeTick?: InputMaybe<OrderBy>;
};

/** select columns of table "UserOption" */
export type UserOptionSelectColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'entryPrice'
  /** column name */
  | 'entryTick'
  /** column name */
  | 'expiresAt'
  /** column name */
  | 'fullyExercised'
  /** column name */
  | 'id'
  /** column name */
  | 'liquiditiesAtOpen'
  /** column name */
  | 'liquiditiesCurrent'
  /** column name */
  | 'marketAddr'
  /** column name */
  | 'market_id'
  /** column name */
  | 'mintEvent_id'
  /** column name */
  | 'optionType'
  /** column name */
  | 'ownerAddr'
  /** column name */
  | 'owner_id'
  /** column name */
  | 'positionSizeAtOpen'
  /** column name */
  | 'positionSizeCurrent'
  /** column name */
  | 'premiumPaid'
  /** column name */
  | 'realizedPayout'
  /** column name */
  | 'strikePrice'
  /** column name */
  | 'strikeTick';

/** order by stddev() on columns of table "UserOption" */
export type UserOptionStddevOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  entryPrice?: InputMaybe<OrderBy>;
  entryTick?: InputMaybe<OrderBy>;
  expiresAt?: InputMaybe<OrderBy>;
  positionSizeAtOpen?: InputMaybe<OrderBy>;
  positionSizeCurrent?: InputMaybe<OrderBy>;
  premiumPaid?: InputMaybe<OrderBy>;
  realizedPayout?: InputMaybe<OrderBy>;
  strikePrice?: InputMaybe<OrderBy>;
  strikeTick?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "UserOption" */
export type UserOptionStddevPopOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  entryPrice?: InputMaybe<OrderBy>;
  entryTick?: InputMaybe<OrderBy>;
  expiresAt?: InputMaybe<OrderBy>;
  positionSizeAtOpen?: InputMaybe<OrderBy>;
  positionSizeCurrent?: InputMaybe<OrderBy>;
  premiumPaid?: InputMaybe<OrderBy>;
  realizedPayout?: InputMaybe<OrderBy>;
  strikePrice?: InputMaybe<OrderBy>;
  strikeTick?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "UserOption" */
export type UserOptionStddevSampOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  entryPrice?: InputMaybe<OrderBy>;
  entryTick?: InputMaybe<OrderBy>;
  expiresAt?: InputMaybe<OrderBy>;
  positionSizeAtOpen?: InputMaybe<OrderBy>;
  positionSizeCurrent?: InputMaybe<OrderBy>;
  premiumPaid?: InputMaybe<OrderBy>;
  realizedPayout?: InputMaybe<OrderBy>;
  strikePrice?: InputMaybe<OrderBy>;
  strikeTick?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "UserOption" */
export type UserOptionStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: UserOptionStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UserOptionStreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  entryPrice?: InputMaybe<Scalars['numeric']['input']>;
  entryTick?: InputMaybe<Scalars['Int']['input']>;
  expiresAt?: InputMaybe<Scalars['Int']['input']>;
  fullyExercised?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  liquiditiesAtOpen?: InputMaybe<Array<Scalars['numeric']['input']>>;
  liquiditiesCurrent?: InputMaybe<Array<Scalars['numeric']['input']>>;
  marketAddr?: InputMaybe<Scalars['String']['input']>;
  market_id?: InputMaybe<Scalars['String']['input']>;
  mintEvent_id?: InputMaybe<Scalars['String']['input']>;
  optionType?: InputMaybe<Scalars['optiontype']['input']>;
  ownerAddr?: InputMaybe<Scalars['String']['input']>;
  owner_id?: InputMaybe<Scalars['String']['input']>;
  positionSizeAtOpen?: InputMaybe<Scalars['numeric']['input']>;
  positionSizeCurrent?: InputMaybe<Scalars['numeric']['input']>;
  premiumPaid?: InputMaybe<Scalars['numeric']['input']>;
  realizedPayout?: InputMaybe<Scalars['numeric']['input']>;
  strikePrice?: InputMaybe<Scalars['numeric']['input']>;
  strikeTick?: InputMaybe<Scalars['Int']['input']>;
};

/** order by sum() on columns of table "UserOption" */
export type UserOptionSumOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  entryPrice?: InputMaybe<OrderBy>;
  entryTick?: InputMaybe<OrderBy>;
  expiresAt?: InputMaybe<OrderBy>;
  positionSizeAtOpen?: InputMaybe<OrderBy>;
  positionSizeCurrent?: InputMaybe<OrderBy>;
  premiumPaid?: InputMaybe<OrderBy>;
  realizedPayout?: InputMaybe<OrderBy>;
  strikePrice?: InputMaybe<OrderBy>;
  strikeTick?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "UserOption" */
export type UserOptionVarPopOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  entryPrice?: InputMaybe<OrderBy>;
  entryTick?: InputMaybe<OrderBy>;
  expiresAt?: InputMaybe<OrderBy>;
  positionSizeAtOpen?: InputMaybe<OrderBy>;
  positionSizeCurrent?: InputMaybe<OrderBy>;
  premiumPaid?: InputMaybe<OrderBy>;
  realizedPayout?: InputMaybe<OrderBy>;
  strikePrice?: InputMaybe<OrderBy>;
  strikeTick?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "UserOption" */
export type UserOptionVarSampOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  entryPrice?: InputMaybe<OrderBy>;
  entryTick?: InputMaybe<OrderBy>;
  expiresAt?: InputMaybe<OrderBy>;
  positionSizeAtOpen?: InputMaybe<OrderBy>;
  positionSizeCurrent?: InputMaybe<OrderBy>;
  premiumPaid?: InputMaybe<OrderBy>;
  realizedPayout?: InputMaybe<OrderBy>;
  strikePrice?: InputMaybe<OrderBy>;
  strikeTick?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "UserOption" */
export type UserOptionVarianceOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  entryPrice?: InputMaybe<OrderBy>;
  entryTick?: InputMaybe<OrderBy>;
  expiresAt?: InputMaybe<OrderBy>;
  positionSizeAtOpen?: InputMaybe<OrderBy>;
  positionSizeCurrent?: InputMaybe<OrderBy>;
  premiumPaid?: InputMaybe<OrderBy>;
  realizedPayout?: InputMaybe<OrderBy>;
  strikePrice?: InputMaybe<OrderBy>;
  strikeTick?: InputMaybe<OrderBy>;
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
export type NumericArrayComparisonExp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _eq?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _gt?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _gte?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['numeric']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _lte?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _neq?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['numeric']['input']>>>;
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

/** Boolean expression to compare columns of type "optiontype". All fields are combined with logical 'AND'. */
export type OptiontypeComparisonExp = {
  _eq?: InputMaybe<Scalars['optiontype']['input']>;
  _gt?: InputMaybe<Scalars['optiontype']['input']>;
  _gte?: InputMaybe<Scalars['optiontype']['input']>;
  _in?: InputMaybe<Array<Scalars['optiontype']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['optiontype']['input']>;
  _lte?: InputMaybe<Scalars['optiontype']['input']>;
  _neq?: InputMaybe<Scalars['optiontype']['input']>;
  _nin?: InputMaybe<Array<Scalars['optiontype']['input']>>;
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
  /** fetch data from the table: "BorrowEvent" */
  BorrowEvent: Array<BorrowEvent>;
  /** fetch data from the table: "BorrowEvent" using primary key columns */
  BorrowEvent_by_pk?: Maybe<BorrowEvent>;
  /** fetch data from the table: "BurnEvent" */
  BurnEvent: Array<BurnEvent>;
  /** fetch data from the table: "BurnEvent" using primary key columns */
  BurnEvent_by_pk?: Maybe<BurnEvent>;
  /** fetch data from the table: "ExerciseOptionEvent" */
  ExerciseOptionEvent: Array<ExerciseOptionEvent>;
  /** fetch data from the table: "ExerciseOptionEvent" using primary key columns */
  ExerciseOptionEvent_by_pk?: Maybe<ExerciseOptionEvent>;
  /** fetch data from the table: "MintEvent" */
  MintEvent: Array<MintEvent>;
  /** fetch data from the table: "MintEvent" using primary key columns */
  MintEvent_by_pk?: Maybe<MintEvent>;
  /** fetch data from the table: "MintOptionEvent" */
  MintOptionEvent: Array<MintOptionEvent>;
  /** fetch data from the table: "MintOptionEvent" using primary key columns */
  MintOptionEvent_by_pk?: Maybe<MintOptionEvent>;
  /** fetch data from the table: "RepayEvent" */
  RepayEvent: Array<RepayEvent>;
  /** fetch data from the table: "RepayEvent" using primary key columns */
  RepayEvent_by_pk?: Maybe<RepayEvent>;
  /** fetch data from the table: "TimelockMarket" */
  TimelockMarket: Array<TimelockMarket>;
  /** fetch data from the table: "TimelockMarketUser" */
  TimelockMarketUser: Array<TimelockMarketUser>;
  /** fetch data from the table: "TimelockMarketUser" using primary key columns */
  TimelockMarketUser_by_pk?: Maybe<TimelockMarketUser>;
  /** fetch data from the table: "TimelockMarket" using primary key columns */
  TimelockMarket_by_pk?: Maybe<TimelockMarket>;
  /** fetch data from the table: "UserOption" */
  UserOption: Array<UserOption>;
  /** fetch data from the table: "UserOption" using primary key columns */
  UserOption_by_pk?: Maybe<UserOption>;
  /** fetch data from the table: "_meta" */
  _meta: Array<Meta>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<ChainMetadata>;
  /** fetch data from the table: "raw_events" */
  raw_events: Array<RawEvents>;
  /** fetch data from the table: "raw_events" using primary key columns */
  raw_events_by_pk?: Maybe<RawEvents>;
};

export type QueryRootBorrowEventArgs = {
  distinct_on?: InputMaybe<Array<BorrowEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BorrowEventOrderBy>>;
  where?: InputMaybe<BorrowEventBoolExp>;
};

export type QueryRootBorrowEventByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootBurnEventArgs = {
  distinct_on?: InputMaybe<Array<BurnEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BurnEventOrderBy>>;
  where?: InputMaybe<BurnEventBoolExp>;
};

export type QueryRootBurnEventByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootExerciseOptionEventArgs = {
  distinct_on?: InputMaybe<Array<ExerciseOptionEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ExerciseOptionEventOrderBy>>;
  where?: InputMaybe<ExerciseOptionEventBoolExp>;
};

export type QueryRootExerciseOptionEventByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootMintEventArgs = {
  distinct_on?: InputMaybe<Array<MintEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MintEventOrderBy>>;
  where?: InputMaybe<MintEventBoolExp>;
};

export type QueryRootMintEventByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootMintOptionEventArgs = {
  distinct_on?: InputMaybe<Array<MintOptionEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MintOptionEventOrderBy>>;
  where?: InputMaybe<MintOptionEventBoolExp>;
};

export type QueryRootMintOptionEventByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootRepayEventArgs = {
  distinct_on?: InputMaybe<Array<RepayEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RepayEventOrderBy>>;
  where?: InputMaybe<RepayEventBoolExp>;
};

export type QueryRootRepayEventByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootTimelockMarketArgs = {
  distinct_on?: InputMaybe<Array<TimelockMarketSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TimelockMarketOrderBy>>;
  where?: InputMaybe<TimelockMarketBoolExp>;
};

export type QueryRootTimelockMarketUserArgs = {
  distinct_on?: InputMaybe<Array<TimelockMarketUserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TimelockMarketUserOrderBy>>;
  where?: InputMaybe<TimelockMarketUserBoolExp>;
};

export type QueryRootTimelockMarketUserByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootTimelockMarketByPkArgs = {
  id: Scalars['String']['input'];
};

export type QueryRootUserOptionArgs = {
  distinct_on?: InputMaybe<Array<UserOptionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserOptionOrderBy>>;
  where?: InputMaybe<UserOptionBoolExp>;
};

export type QueryRootUserOptionByPkArgs = {
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
  /** fetch data from the table: "BorrowEvent" */
  BorrowEvent: Array<BorrowEvent>;
  /** fetch data from the table: "BorrowEvent" using primary key columns */
  BorrowEvent_by_pk?: Maybe<BorrowEvent>;
  /** fetch data from the table in a streaming manner: "BorrowEvent" */
  BorrowEvent_stream: Array<BorrowEvent>;
  /** fetch data from the table: "BurnEvent" */
  BurnEvent: Array<BurnEvent>;
  /** fetch data from the table: "BurnEvent" using primary key columns */
  BurnEvent_by_pk?: Maybe<BurnEvent>;
  /** fetch data from the table in a streaming manner: "BurnEvent" */
  BurnEvent_stream: Array<BurnEvent>;
  /** fetch data from the table: "ExerciseOptionEvent" */
  ExerciseOptionEvent: Array<ExerciseOptionEvent>;
  /** fetch data from the table: "ExerciseOptionEvent" using primary key columns */
  ExerciseOptionEvent_by_pk?: Maybe<ExerciseOptionEvent>;
  /** fetch data from the table in a streaming manner: "ExerciseOptionEvent" */
  ExerciseOptionEvent_stream: Array<ExerciseOptionEvent>;
  /** fetch data from the table: "MintEvent" */
  MintEvent: Array<MintEvent>;
  /** fetch data from the table: "MintEvent" using primary key columns */
  MintEvent_by_pk?: Maybe<MintEvent>;
  /** fetch data from the table in a streaming manner: "MintEvent" */
  MintEvent_stream: Array<MintEvent>;
  /** fetch data from the table: "MintOptionEvent" */
  MintOptionEvent: Array<MintOptionEvent>;
  /** fetch data from the table: "MintOptionEvent" using primary key columns */
  MintOptionEvent_by_pk?: Maybe<MintOptionEvent>;
  /** fetch data from the table in a streaming manner: "MintOptionEvent" */
  MintOptionEvent_stream: Array<MintOptionEvent>;
  /** fetch data from the table: "RepayEvent" */
  RepayEvent: Array<RepayEvent>;
  /** fetch data from the table: "RepayEvent" using primary key columns */
  RepayEvent_by_pk?: Maybe<RepayEvent>;
  /** fetch data from the table in a streaming manner: "RepayEvent" */
  RepayEvent_stream: Array<RepayEvent>;
  /** fetch data from the table: "TimelockMarket" */
  TimelockMarket: Array<TimelockMarket>;
  /** fetch data from the table: "TimelockMarketUser" */
  TimelockMarketUser: Array<TimelockMarketUser>;
  /** fetch data from the table: "TimelockMarketUser" using primary key columns */
  TimelockMarketUser_by_pk?: Maybe<TimelockMarketUser>;
  /** fetch data from the table in a streaming manner: "TimelockMarketUser" */
  TimelockMarketUser_stream: Array<TimelockMarketUser>;
  /** fetch data from the table: "TimelockMarket" using primary key columns */
  TimelockMarket_by_pk?: Maybe<TimelockMarket>;
  /** fetch data from the table in a streaming manner: "TimelockMarket" */
  TimelockMarket_stream: Array<TimelockMarket>;
  /** fetch data from the table: "UserOption" */
  UserOption: Array<UserOption>;
  /** fetch data from the table: "UserOption" using primary key columns */
  UserOption_by_pk?: Maybe<UserOption>;
  /** fetch data from the table in a streaming manner: "UserOption" */
  UserOption_stream: Array<UserOption>;
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

export type SubscriptionRootBorrowEventArgs = {
  distinct_on?: InputMaybe<Array<BorrowEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BorrowEventOrderBy>>;
  where?: InputMaybe<BorrowEventBoolExp>;
};

export type SubscriptionRootBorrowEventByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootBorrowEventStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<BorrowEventStreamCursorInput>>;
  where?: InputMaybe<BorrowEventBoolExp>;
};

export type SubscriptionRootBurnEventArgs = {
  distinct_on?: InputMaybe<Array<BurnEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BurnEventOrderBy>>;
  where?: InputMaybe<BurnEventBoolExp>;
};

export type SubscriptionRootBurnEventByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootBurnEventStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<BurnEventStreamCursorInput>>;
  where?: InputMaybe<BurnEventBoolExp>;
};

export type SubscriptionRootExerciseOptionEventArgs = {
  distinct_on?: InputMaybe<Array<ExerciseOptionEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ExerciseOptionEventOrderBy>>;
  where?: InputMaybe<ExerciseOptionEventBoolExp>;
};

export type SubscriptionRootExerciseOptionEventByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootExerciseOptionEventStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ExerciseOptionEventStreamCursorInput>>;
  where?: InputMaybe<ExerciseOptionEventBoolExp>;
};

export type SubscriptionRootMintEventArgs = {
  distinct_on?: InputMaybe<Array<MintEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MintEventOrderBy>>;
  where?: InputMaybe<MintEventBoolExp>;
};

export type SubscriptionRootMintEventByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootMintEventStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<MintEventStreamCursorInput>>;
  where?: InputMaybe<MintEventBoolExp>;
};

export type SubscriptionRootMintOptionEventArgs = {
  distinct_on?: InputMaybe<Array<MintOptionEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MintOptionEventOrderBy>>;
  where?: InputMaybe<MintOptionEventBoolExp>;
};

export type SubscriptionRootMintOptionEventByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootMintOptionEventStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<MintOptionEventStreamCursorInput>>;
  where?: InputMaybe<MintOptionEventBoolExp>;
};

export type SubscriptionRootRepayEventArgs = {
  distinct_on?: InputMaybe<Array<RepayEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RepayEventOrderBy>>;
  where?: InputMaybe<RepayEventBoolExp>;
};

export type SubscriptionRootRepayEventByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootRepayEventStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<RepayEventStreamCursorInput>>;
  where?: InputMaybe<RepayEventBoolExp>;
};

export type SubscriptionRootTimelockMarketArgs = {
  distinct_on?: InputMaybe<Array<TimelockMarketSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TimelockMarketOrderBy>>;
  where?: InputMaybe<TimelockMarketBoolExp>;
};

export type SubscriptionRootTimelockMarketUserArgs = {
  distinct_on?: InputMaybe<Array<TimelockMarketUserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TimelockMarketUserOrderBy>>;
  where?: InputMaybe<TimelockMarketUserBoolExp>;
};

export type SubscriptionRootTimelockMarketUserByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootTimelockMarketUserStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TimelockMarketUserStreamCursorInput>>;
  where?: InputMaybe<TimelockMarketUserBoolExp>;
};

export type SubscriptionRootTimelockMarketByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootTimelockMarketStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TimelockMarketStreamCursorInput>>;
  where?: InputMaybe<TimelockMarketBoolExp>;
};

export type SubscriptionRootUserOptionArgs = {
  distinct_on?: InputMaybe<Array<UserOptionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserOptionOrderBy>>;
  where?: InputMaybe<UserOptionBoolExp>;
};

export type SubscriptionRootUserOptionByPkArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionRootUserOptionStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<UserOptionStreamCursorInput>>;
  where?: InputMaybe<UserOptionBoolExp>;
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

export type GetActiveUserOptionsQueryVariables = Exact<{
  user: Scalars['String']['input'];
}>;

export type GetActiveUserOptionsQuery = {
  __typename: 'query_root';
  UserOption: Array<{
    __typename: 'UserOption';
    id: string;
    ownerAddr: string;
    optionType: any;
    strikeTick: number;
    entryTick: number;
    strikePrice: any;
    entryPrice: any;
    expiresAt: number;
    createdAt: number;
    premiumPaid: any;
    realizedPayout: any;
    marketAddr: string;
    liquiditiesAtOpen: Array<any>;
    liquiditiesCurrent: Array<any>;
    positionSizeAtOpen: any;
    positionSizeCurrent: any;
    fullyExercised: boolean;
    exerciseEvents: Array<{
      __typename: 'ExerciseOptionEvent';
      transactionHash: string;
    }>;
    mintEvent?: {__typename: 'MintOptionEvent'; transactionHash: string} | null;
  }>;
};

export type GetClosedUserOptionsQueryVariables = Exact<{
  user: Scalars['String']['input'];
}>;

export type GetClosedUserOptionsQuery = {
  __typename: 'query_root';
  UserOption: Array<{
    __typename: 'UserOption';
    id: string;
    ownerAddr: string;
    optionType: any;
    strikeTick: number;
    entryTick: number;
    strikePrice: any;
    entryPrice: any;
    expiresAt: number;
    createdAt: number;
    premiumPaid: any;
    realizedPayout: any;
    marketAddr: string;
    liquiditiesAtOpen: Array<any>;
    liquiditiesCurrent: Array<any>;
    positionSizeAtOpen: any;
    positionSizeCurrent: any;
    fullyExercised: boolean;
    exerciseEvents: Array<{
      __typename: 'ExerciseOptionEvent';
      transactionHash: string;
    }>;
    mintEvent?: {__typename: 'MintOptionEvent'; transactionHash: string} | null;
  }>;
};

export type GetMarketDataQueryVariables = Exact<{
  marketAddr: Scalars['String']['input'];
}>;

export type GetMarketDataQuery = {
  __typename: 'query_root';
  TimelockMarket: Array<{
    __typename: 'TimelockMarket';
    id: string;
    optionsCount: any;
    tradersCount: any;
    vault: string;
    pool: string;
    tickSpacing: number;
    optionAssetIsToken0: boolean;
    optionAsset: string;
    payoutAsset: string;
    optionAssetDecimals: number;
    payoutAssetDecimals: number;
    optionAssetSymbol: string;
    payoutAssetSymbol: string;
    optionAssetName: string;
    payoutAssetName: string;
  }>;
};

export const GetActiveUserOptionsDocument = gql`
  query GetActiveUserOptions($user: String!) {
    UserOption(
      where: {ownerAddr: {_eq: $user}, fullyExercised: {_eq: false}}
      limit: 1000
    ) {
      id
      ownerAddr
      exerciseEvents {
        transactionHash
      }
      mintEvent {
        transactionHash
      }
      optionType
      strikeTick
      entryTick
      strikePrice
      entryPrice
      expiresAt
      createdAt
      premiumPaid
      realizedPayout
      marketAddr
      liquiditiesAtOpen
      liquiditiesCurrent
      positionSizeAtOpen
      positionSizeCurrent
      fullyExercised
    }
  }
`;
export const GetClosedUserOptionsDocument = gql`
  query GetClosedUserOptions($user: String!) {
    UserOption(
      where: {ownerAddr: {_eq: $user}, fullyExercised: {_eq: true}}
      limit: 1000
    ) {
      id
      ownerAddr
      exerciseEvents {
        transactionHash
      }
      mintEvent {
        transactionHash
      }
      optionType
      strikeTick
      entryTick
      strikePrice
      entryPrice
      expiresAt
      createdAt
      premiumPaid
      realizedPayout
      marketAddr
      liquiditiesAtOpen
      liquiditiesCurrent
      positionSizeAtOpen
      positionSizeCurrent
      fullyExercised
    }
  }
`;
export const GetMarketDataDocument = gql`
  query GetMarketData($marketAddr: String!) {
    TimelockMarket(where: {id: {_eq: $marketAddr}}, limit: 1) {
      id
      optionsCount
      tradersCount
      vault
      pool
      tickSpacing
      optionAssetIsToken0
      optionAsset
      payoutAsset
      optionAssetDecimals
      payoutAssetDecimals
      optionAssetSymbol
      payoutAssetSymbol
      optionAssetName
      payoutAssetName
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
    GetActiveUserOptions(
      variables: GetActiveUserOptionsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetActiveUserOptionsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetActiveUserOptionsQuery>({
            document: GetActiveUserOptionsDocument,
            variables,
            requestHeaders: {...requestHeaders, ...wrappedRequestHeaders},
            signal,
          }),
        'GetActiveUserOptions',
        'query',
        variables,
      );
    },
    GetClosedUserOptions(
      variables: GetClosedUserOptionsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetClosedUserOptionsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetClosedUserOptionsQuery>({
            document: GetClosedUserOptionsDocument,
            variables,
            requestHeaders: {...requestHeaders, ...wrappedRequestHeaders},
            signal,
          }),
        'GetClosedUserOptions',
        'query',
        variables,
      );
    },
    GetMarketData(
      variables: GetMarketDataQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetMarketDataQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetMarketDataQuery>({
            document: GetMarketDataDocument,
            variables,
            requestHeaders: {...requestHeaders, ...wrappedRequestHeaders},
            signal,
          }),
        'GetMarketData',
        'query',
        variables,
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
