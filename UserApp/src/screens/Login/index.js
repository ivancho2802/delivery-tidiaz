import React, {useEffect, useState} from "react";

import { View, Text, Pressable, Dimensions, ScrollView, SafeAreaView } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from '@react-navigation/native'
import {
  useQuery,
  
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from '@apollo/client'
import {onError}from "@apollo/client/link/error"

import styles from './styles.js';
import Form from "../../components/Login/Form";

const errorLink =  onError(({graphQLErrors, networkError})=>{
  if(graphQLErrors){
      graphQLErrors.map(({ message }, i, locations) => {
          alert("graphQLErrors"+{message})
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

const navigation = useNavigation();

const goToSearch = () => {
  navigation.navigate('DestinationSearch')
}

/* const errorLink =  onError(({graphQLErrors, networkError})=>{
  if(graphQLErrors){
      graphQLErrors.map(({ message }, i, locations) => {
          alert("graphQLErrors"+{message})
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
}); */

const Login = (props) => {
  return (
    <View>
    <ApolloProvider client={client}>
      <Form/>
    </ApolloProvider>
    </View>
  );
  

};
export default Login;
