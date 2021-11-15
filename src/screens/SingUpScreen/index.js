import React from "react";
import { View, Dimensions, Text, Alert, ScrollView, SafeAreaView } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from '@react-navigation/native'
import Form from "../../components/SingUp/Form";

import styles from './styles.js';
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from "@apollo/client";
import {onError}from "@apollo/client/link/error"

const errorLink =  onError(({graphQLErrors, networkError})=>{
  if(graphQLErrors){
      graphQLErrors.map(({ message }, i, locations) => {
          alert("graphQLErrors"+JSON.stringify(message))
      })
  }
})
const link = from ([
  errorLink,
  new HttpLink({uri: "https://delivery-graphql-tidiaz.herokuapp.com/graphql"})
]);
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link:link
});

const SingUpScreen = (props) => {

  return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>Bienvenido</Text> 
        <ApolloProvider client={client}>
          <Form />{/* userName={userName} typeState={typeState} onSubmit={onSubmit}  */}
        </ApolloProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingUpScreen;
