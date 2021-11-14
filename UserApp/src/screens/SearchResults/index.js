import React from 'react';
import {View, Dimensions} from 'react-native';
import { useRoute } from '@react-navigation/native';
import RouteMap from "../../components/RouteMap";
import UberTypes from "../../components/UberTypes";

//api consulta apigraphl
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
//api consulta apigraphl

const SearchResults = (props) => {
  const route = useRoute();
  const {originPlace, destinationPlace} = route.params

  return (
    <View style={{display: 'flex', justifyContent: 'space-between'}}>
      <View style={{height: Dimensions.get('window').height - 400}}>
        <RouteMap origin={originPlace} destination={destinationPlace} />
      </View>

      <View style={{height: 400}}>
        <ApolloProvider client={client}>
          <UberTypes  origin={originPlace} destination={destinationPlace}/>{/*  typeState={typeState} onSubmit={onSubmit}  */}
        </ApolloProvider>
      </View>
    </View>
  );
};

export default SearchResults;
