import React from "react";
import { View, Text, Pressable } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from '@react-navigation/native'
import {createUser} from '../../graphql/mutations'
import {useMutation} from '@apollo/client'

import styles from './styles.js';
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from "@apollo/client";
import {onError}from "@apollo/client/link/error"

const SingUp = (props) => {
  
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
  const navigation = useNavigation();

  const goToSearch = () => {
    navigation.navigate('DestinationSearch')
  }
  const [registerUser, {error}] = useMutation(createUser)
  const onSubmit=(d)=>{
    alert(JSON.stringify(d))
    registerUser({
      variables: {
        username:d.username,
        email:d.email,
        password:d.password
      }
    });

    if(error){
      console.log(error)
    }
  }

  return (
    <View>
      {/* <ApolloProvider client={client}> */}
        <form onSubmit={onSubmit}>
          <label style={styles.inputText}>
            Username
            <input name="username"/>
          </label>
          <label style={styles.inputText}>
            Email
            <input type="email" name="email"/>
          </label>
          <label style={styles.inputText}>
            Contraseña
            <input type="password" name="password"/>
          </label>
          
        </form>
        {/* 
        username: {
          type: String,
          required: true
        },
        password: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        },
        */}
      {/* </ApolloProvider> */}
    </View>
  );
};

export default SingUp;
