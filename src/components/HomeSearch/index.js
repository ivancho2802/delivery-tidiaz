import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from '@react-navigation/native'

import styles from './styles.js';

const HomeSearch = (props) => {
  const navigation = useNavigation();
  const showTAlert = (msg) => {
    Alert.alert(
      "Un momento",
      msg,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
            navigation.navigate('Login')
            console.log("OK Pressed")
          } 
        }
      ]
    );
  };

  /* _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('TASKS');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }; */
  const [user, setUser] = useState({});//username: "----", email: "", bill: 0
  
  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const value = await AsyncStorage.getItem('tidiazuser');
        if (value !== null) {
          // We have data!!
          console.log(value);
          setUser(JSON.parse(value))//await Auth.currentAuthenticatedUser();
        }else{
          console.log("value");
          console.log(value);
        }
      } catch (error) {
        // Error retrieving data
        console.error(error);
      }
      // ...
    }
    fetchData();
  }, []);

  const goToSearch = async() => {
    try {
      //const value = await AsyncStorage.getItem('tidiazuser');
      if (user !== null) {
        // We have data!!
        console.log(user);
        navigation.navigate('DestinationSearch')
      }else{
        showTAlert("lo sentimos debes iniciar sesion antes")
        console.log(user);
      }
    } catch (error) {
      // Error retrieving data
      console.error(error)
    }
  }

  return (
    <View>
      {/*  Input Box */}
      <Pressable onPress={goToSearch} style={styles.inputBox}>
        <Text style={styles.inputText}>Where To?</Text>

        <View style={styles.timeContainer}>
          <AntDesign name={'clockcircle'} size={16} color={'#535353'} />
          <Text>Now</Text>
          <MaterialIcons name={'keyboard-arrow-down'} size={16} />
        </View>
      </Pressable>

      {/* Previous destination */}
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <AntDesign name={'clockcircle'} size={20} color={'#ffffff'} />
        </View>
        <Text style={styles.destinationText}>Spin Nightclub</Text>
      </View>

      {/* Home destination */}
      <View style={styles.row}>
        <View style={[styles.iconContainer, {backgroundColor: '#218cff'}]}>
          <Entypo name={'home'} size={20} color={'#ffffff'} />
        </View>
        <Text style={styles.destinationText}>Spin Nightclub</Text>
      </View>
    </View>
  );
};

export default HomeSearch;
