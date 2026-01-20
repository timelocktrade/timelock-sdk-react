import {GraphQLClient} from 'graphql-request';
import {getSdk as getTimelockGraphqlSdk} from './generated/timelock';
import {getSdk as getUniv4GraphqlSdk} from './generated/univ4';

export const getTimelockGraphqlClient = (apiUrl: string) => {
  return getTimelockGraphqlSdk(new GraphQLClient(apiUrl));
};
export const getUniv4GraphqlClient = (apiUrl: string) => {
  return getUniv4GraphqlSdk(new GraphQLClient(apiUrl));
};
