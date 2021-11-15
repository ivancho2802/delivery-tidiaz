import React from "react";
import { View, Dimensions, ScrollView, SafeAreaView } from "react-native";

import HomeMap from '../../components/HomeMap';
import CovidMessage from '../../components/CovidMessage';
import HomeSearch from '../../components/HomeSearch'; 

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
import styles from './styles.js';

const HomeScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{height: Dimensions.get('window').height - 400}}>
          <ApolloProvider client={client}>
            <HomeMap />
          </ApolloProvider>
        </View>

        {/*  Covid Message*/}
        <CovidMessage />

        {/*  Bottom Comp*/}
        <HomeSearch />

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
