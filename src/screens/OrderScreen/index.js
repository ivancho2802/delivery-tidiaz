import React, { useState, useEffect } from "react";
import { WebSocketLink } from '@apollo/client/link/ws';
import OrderDetail from "../../components/OrderDetail"
//import { API, graphqlOperation } from 'aws-amplify';
import { useRoute } from '@react-navigation/native';
import {onError}from "@apollo/client/link/error";
import { getMainDefinition } from '@apollo/client/utilities';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  split
} from '@apollo/client';
const errorLink =  onError(({graphQLErrors, networkError})=>{
  if(graphQLErrors){
      graphQLErrors.map(({ message }, i, locations) => {
          alert("graphQLErrors"+JSON.stringify(message))
      })
  }
})
/* const link = from ([
  errorLink,
  new HttpLink({uri: "https://delivery-graphql-tidiaz.herokuapp.com/graphql"})
]); */ 
const wsLink = new WebSocketLink({
  uri: 'ws://delivery-graphql-tidiaz.herokuapp.com/graphql',
  options: {
    reconnect: true
  }
});
const httpLink = new HttpLink({
  uri: 'https://delivery-graphql-tidiaz.herokuapp.com/graphql'
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link:splitLink
    //link:link
});

const OrderScreen = (props) => {
  const route = useRoute();
  const [orderBefore, setIdOrder] = useState(null);
  useEffect(() => {
    console.log(route.params.ord)
    setIdOrder(route.params.ord)
  });
  return (
    <ApolloProvider client={client}>
      {orderBefore?
      <OrderDetail orderBefore={orderBefore}/>
      :null}
    </ApolloProvider>
  );
};

export default OrderScreen;
