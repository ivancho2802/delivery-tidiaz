import React, { useState, useEffect }  from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Pressable } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from '@react-navigation/native'

import styles from './styles.js';

import { useMutation } from "@apollo/client";
import {createUser} from '../../graphql/mutations'

const Form = () => { 
  
    /* const { error, loading, data } = useQuery(LOAD_USER, {
      variables:{
        id: "617d6d1d6eb74e83472faf52"
      }
    });
    const [users, setUsers] = useState({});
    useEffect(() => {
      if (data) {
        setUsers(data.getUser);
      }
    }, [data]);
    console.log("users")
    console.log(users) */
    const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState("");
  const [email, setEmail] = useState("");
  const [selectedU, setSelectedU] = useState("");
  const [msgerr, setMsgerr] = useState("");
  const [msgsuc, setMsgsuc] = useState("");
  const [loadingA , setLoading] = useState(false);
  

  const [RegisterUser, { error, loading, data }] = useMutation(createUser);

  const onPressBegin = async  () => {
    try {
        console.log("username"+selectedU)
        console.log("password"+selectedType)
        console.log("email"+email)
        const response = await RegisterUser({
            variables: {
                username:selectedU,
                email:email,
                password:selectedType
            }
        });
        if(error){
            console.log(error);
            setMsgerr(error)
        }
        if (loading){
          console.log("loading");
          console.log(loading);
        }
        if (loading){
          console.log("data");
          console.log(data);
        }
        if (response){
          console.log("response");
          console.log(response);
          setMsgsuc("Usuario registrado "+response.data.registerUser.username)
          /*{"data": 
                {"registerUser": 
                    {"__typename": "User", 
                    "car": null, 
                    "createdAt": "1636124566247", 
                    "email": "A", 
                    "id": "618548a43f3c8bbdbb31d1ad", 
                    "orders": [Array], 
                    "password": "A", "updatedAt": "1636124566247", "username": "A"}}}*/
        }
        
      console.log("datadatadatadata")
    } catch (e) {
      console.error(e);
    }
  };
  
  const goLogin = () => {
    navigation.navigate('Login')
  }
  
  return (
    <View  style={styles.container}>
        <Text style={styles.textCenter}>
          Registro de Usuario
        </Text>
        <Text style={styles.textCenter}>
          {msgerr?msgerr:msgsuc}
        </Text>
        
        <ActivityIndicator animating={loadingA}/>
         <TextInput
          style={styles.inputText}
          onChangeText={setSelectedU}
          value={selectedU}
          placeholder=" Username"
        />
        <TextInput
         style={styles.inputText}
         onChangeText={setEmail}
         value={email}
         placeholder=" Email"
       />
        <TextInput
          style={styles.inputText}
          onChangeText={setSelectedType}
          value={selectedType}
          placeholder="Contraseña"
          keyboardType="visible-password"
        /> 
         <Button
          onPress={onPressBegin}
          title="Registrarse"
          style={styles.inputBox}
          accessibilityLabel="Learn more about this purple button"
        />
        <Text style={styles.textCenter}>
          Tambien puedes
        </Text>
        <Button
         onPress={goLogin}
         title="ir a Iniciar Sesion"
          style={styles.inputBoxB}
         accessibilityLabel="Learn more about this purple button"
       />
    </View>
  );
};

export default Form;
