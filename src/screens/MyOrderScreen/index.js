import React, { useState } from 'react';
import { View, Dimensions, Text, Alert, ScrollView, SafeAreaView } from "react-native";
import List from '../../components/MyOrder/List.js';
import styles from './styles.js';
import {onError}from "@apollo/client/link/error";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from '@apollo/client';
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

const MyOrderScreen = (props) => { 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ApolloProvider client={client}>
          <List />
        </ApolloProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyOrderScreen;
