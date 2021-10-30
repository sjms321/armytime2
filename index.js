/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider,  useQuery,
                                                       gql } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'localhost:4000/',
  cache: new InMemoryCache()
});

const App2 = () => (
  <ApolloProvider client={client}>

  </ApolloProvider>
);

AppRegistry.registerComponent("armytime2", () => App);

