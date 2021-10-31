import React, { useState } from "react";
//import { CREATE_USER_MUTATION } from "../GraphQL/Mutations";
import { useMutation, useQuery } from "@apollo/client";
import { View, Dimensions, ScrollView, SafeAreaView } from "react-native";
import {LoginUser} from '../../graphql/queries'

function Form() {
  /*
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUser, { error }] = useMutation(CREATE_USER_MUTATION);
   const addUser = () => {
    createUser({
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    });

    if (error) {
      console.log(error);
    }
  }; */
  const [login, {error}] = useQuery(LoginUser)
  const onSubmit=(d)=>{
    alert(JSON.stringify(d))
    var result = login({
      variables: {
        username:d.username,
        password:d.password
      }
    });
    if(error){
      console.log(error)
    }
    console.log(result)
  }
  return (
    <View>
      <form onSubmit={onSubmit}>
        <label style={styles.inputText}>
          Email
          <input type="email" name="email"/>
        </label>
        <label style={styles.inputText}>
          Contraseña
          <input type="password" name="password"/>
        </label>
        <button type={submit}> Create User</button>
      
      </form>
    </View>
    /* <div>
      <input
        type="text"
        placeholder="First Name"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={addUser}> Create User</button>
    </div> */
  );
}

export default Form;