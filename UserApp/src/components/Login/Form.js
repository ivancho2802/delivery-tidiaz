import React, { useState, useEffect }  from "react";
import { View, Text, TextInput, Button, Pressable  } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from '@react-navigation/native'

import styles from './styles.js';

import { useMutation, useQuery } from "@apollo/client";
import {LOAD_USER} from '../../graphql/queries'
import {LoginUser} from '../../graphql/mutations';

const Form = () => { //{typeState, userName, onSubmit}
  
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
  
  _storeGData = async (value) => {
    try {
      const datatidiazuser = await AsyncStorage.getItem("tidiazuser")
      if(datatidiazuser)
      return datatidiazuser!==null ? JSON.parse(datatidiazuser) : {}
      else
      return {}
    } catch (error) {
      // Error saving data
      console.log("error")
      console.log(error)
      return {}
    }
  };
  _storeData = async (value) => {
    try {
      await AsyncStorage.setItem(
        'tidiazuser',
        JSON.stringify(value)
      );
      console.log(("tidiazuser"))
      var xx = await _storeGData()
      console.log("xx")
      console.log(xx)
    } catch (error) {
      // Error saving data
      console.log("error")
      console.log(error)
    }
  };
  const [selectedType, setSelectedType] = useState("");
  const [selectedU, setSelectedU] = useState("");

  const [Login, { error }] = useMutation(LoginUser);

  const onPressBegin = async  () => {
    try {
      console.log("username"+selectedU)
      console.log("password"+selectedType)
      var responseLogin = await Login({
        variables: {
          username: selectedU,
          password: selectedType,
        },
      });

      if (error) {
        console.log(error);
      }
      if (responseLogin) {
        console.log(responseLogin);
        _storeData(responseLogin.data.login)
        //navigation.navigate('Login')
      }
    } catch (e) {
      console.error(e);
    }
  };
  
  return (
    <View  style={styles.container}>
        <Text style={styles.textCenter}>
          Inicio de sesion
        </Text>
         <TextInput
          style={styles.inputText}
          onChangeText={setSelectedU}
          value={selectedU}
          placeholder=" Username o Email"
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
          title="Iniciar Sesion"
          style={styles.inputBoxB}
          accessibilityLabel="Learn more about this purple button"
        />
    </View>
  );
};

export default Form;
