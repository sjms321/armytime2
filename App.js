import React, { useState } from "react";
import { View, StyleSheet, Button, Alert,Text } from "react-native";
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { ApolloClient, InMemoryCache, ApolloProvider,  useQuery,
                                                       gql } from '@apollo/client';
const client = new ApolloClient({
  uri: 'localhost:4000/',
  cache: new InMemoryCache()

});

const GetUsers = gql`
  query GetUsers {
    users {
        id
        userId
        userPw
    }
  }
`;

const qwe= ({ navigation }) => {
  const { data, loading } = useQuery(GetUsers)


  return (
    <FlatList
      data={data.chapters}
      renderItem={({ item }) => (
        <ChapterItem
          chapter={item}
          onPress={() => navigation.navigate('Chapter', { chapter: item })}
        />
      )}
      keyExtractor={(chapter) => chapter.id.toString()}
    />
  )
}

const App = () => {



    const b= client.query({
      query: gql`
         query GetUsers {
             users {
                 id
                 userId
                 userPw
             }
           }
        `
    })

        const a = 10;
    return (
     <ApolloProvider client={client}>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Text>Hello, world! {a}</Text>
      </View>
     </ApolloProvider>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  }
});

export default App;