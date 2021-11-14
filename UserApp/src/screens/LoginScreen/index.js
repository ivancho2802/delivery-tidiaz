import React, { useState } from 'react';
import { View, Dimensions, Text, Alert, ScrollView, SafeAreaView } from "react-native";
import Form from "../../components/Login/Form";
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


const LoginScreen = (props) => {/* 
  const [login, { error }] = useMutation(LoginUser);

  const typeState = useState("");
  const userName = useState("");
  
  const onSubmit = async () => {
  
    const [type] = typeState;
    const [uname] = userName;
    console.log("username"+uname)
    console.log("password"+type)
    if (!type || !uname) {
      return;
    }
    //const { error, loading, data } = await useQuery(LoginUser);
    //const [users, setUsers] = useState({});
    
    //const [user, setUser] = useState({});
    // submit to server
    try {
      login({
        variables: {
          username: uname,
          password: type
        }
      });
  
      if (error) {
        console.log(error);
      }
      /* console.log("error")
      console.log(error)
      console.log(loading)
      console.log(data)
      
      console.log("aqui areslogin");
      useEffect(() => {
        if (data) {
          setUser(data.getUser);
        }
      }, [data]);
      console.log("user")
      console.log(user) */

      /* useEffect(async() => {
        if (data) {
            data.login({
            variables:{
              username: uname,
              password: type
            }
          })
          .then((res) => {
            setUsers(res);
          })
          .catch(err => {
            console.log("err")
            console.log(err)
          });
        }
      }, [data]);
      console.log("users")
      console.log(users) */

      /* const { error, loading, data } = useQuery(LoginUser, {
        variables:{
          username: uname,
          password: type
        }
      }).catch(error => console.log("An error", error));
      if (data) {
        const [users, setUsers] = useState([]);
        console.log("data");
        console.log(data); 
        setUsers(data.login({
          variables:{
            username: "uname",
            password: "type"
          }
        }));
        console.log("users")
        console.log(users) 
      }
      if (loading){
        console.log("loading");
        console.log(loading); 
      }
      if (error) {
        console.log("error");
        console.log(error); 
      } */

      /* const userInfo = await Auth.currentAuthenticatedUser();
  
      const date = new Date();
      const input = {
        createdAt: date.toISOString(),
        type,
        originLatitude: originPlace.details.geometry.location.lat,
        oreiginLongitude: originPlace.details.geometry.location.lng,
  
        destLatitude: destinationPlace.details.geometry.location.lat,
        destLongitude: destinationPlace.details.geometry.location.lng,
  
        userId: userInfo.attributes.sub,
        carId: "1",
        status: "NEW",
      }
  
      const response = await API.graphql(
        graphqlOperation(
          createOrder, {
            input: input
          },
        )
      )
  
      console.log(response);
  
      navigation.navigate('OrderPage', { ord: response.data.createOrder }); /
    } catch (e) {
      console.log("e");
      console.log(e);
    }
  } */
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

export default LoginScreen;
