import React, { useState } from "react";
import { View, StyleSheet, Button, Alert,Text } from "react-native";
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { ApolloClient, InMemoryCache, ApolloProvider,  useQuery, gql } from '@apollo/client';
import { Query } from "react-apollo";


const client = new ApolloClient({
  uri: 'http://192.168.55.53:4000',
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


const styles = StyleSheet.create({
  center: {
    alignItems: 'center'
  }
})

const AA=()=>{
     const { loading, error, data } = useQuery(GetUsers);

         console.log("=============");
         console.log(loading);
         console.log(data);
         console.log(error);
         console.log("=============");

         let template = ``;
         if (loading) {template = <Text>`로딩중... ${loading}`</Text>;}
         if (error) {template = <Text>`에러발생 : ${error}`</Text>;}
         if (data) {
           template = data.users.map((item, index) =>
             <Text key={index}>{item.userId} / {item.userPw}</Text>
           )
         }
          return (<View>{template}</View>);
}


const Greeting = (props) => {
  return (
    <View style={styles.center}>
      <Text>그만자자 {props.name}!</Text>
    </View>
  );
}

const LotsOfGreetings = () => {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greeting name='권준' />
      <Greeting name='최성우' />
    </View>
  );
}

const App = () => {



    return (
     <ApolloProvider client={client}>
    <AA />
    <LotsOfGreetings />
    </ApolloProvider>


    )

}


export default App;