import React, { useStat,Component  } from "react";

import {TextInput, View, StyleSheet, Button, Alert,Text,SafeAreaView } from "react-native";
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { ApolloClient, InMemoryCache, ApolloProvider,  useQuery, gql,useMutation  } from '@apollo/client';
import { Query } from "react-apollo";


const client = new ApolloClient({
  uri: 'http://192.168.55.53:4000',
  cache: new InMemoryCache()

});

const InsertUserCom = () => {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
  const [insertu, { data, loading, error }] = useMutation(InsertUser);


  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="ascii-capable"
      />

      <View>
  <Button
    title="Press me"
    onPress={() => {
      insertu({ variables: { userId: text,userPw:number }});
      alert('생성완료')
    } }
  />
</View>
    </SafeAreaView>
  );
};

const GetUsers = gql`
  query GetUsers {
    users {
        id
        userId
        userPw
    }
  }
`;
const InsertUser = gql`
  mutation insertUser( 
    $userId:String
    $userPw:String)
    {
    insertUser(userId:$userId,userPw: $userPw) {
      userId
      userPw
    }
  }
`;


const styles = StyleSheet.create({
  center: {

    alignItems: 'center'
  },
  text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
})

const AA=()=>{
     const { loading, error, data } = useQuery(GetUsers);

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
      <Text style={styles.text}>그만자자 {props.name}!</Text>
    </View>
  );
}

const LotsOfGreetings = () => {
  return (
    <View style={
    [styles.center, {top: 0, backgroundColor: '#a4b602',height:'40%',width:'80%',padding:15,},
    ]
    }>
      <Greeting name='권준!!' />
      <Greeting name='최성우' />
      
    </View>
  );
}

const App  = ()  => {



    return (
     <ApolloProvider client={client}>
    <AA />
    <LotsOfGreetings>
    </LotsOfGreetings>
    <InsertUserCom />

    </ApolloProvider>
    

    )

}


export default App;