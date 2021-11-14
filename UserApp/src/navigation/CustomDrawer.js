import React, {useState, useEffect} from "react";
import { View, Text, Pressable  } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
//import { Auth } from 'aws-amplify';

const CustomDrawer = (props) => {
  
  const [user, setUser] = useState({});//username: "----", email: "", bill: 0
  
  /* useEffect(() => {
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
  }, []); */
  return (
    <DrawerContentScrollView {...props}>
      <View style={{backgroundColor: '#212121', padding: 15}}>

        {/* User Row */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: '#cacaca',
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
          }}/>

          <View>
            <Text style={{color: 'white', fontSize: 24}}>{user.username}</Text>
            <Text style={{color: 'lightgrey'}}>{user.bill} *</Text>
          </View>
        </View>

        {/* Messages Row */}
        <View style={{
          borderBottomWidth: 1,
          borderBottomColor: '#919191',
          borderTopWidth: 1,
          borderTopColor: '#919191',
          paddingVertical: 5,
          marginVertical: 10,
        }}>
          <Pressable
            onPress={() => {console.warn('Messages')}}>
            <Text style={{color: '#dddddd', paddingVertical: 5,}}>Messages</Text>
          </Pressable>
        </View>

        { /* Do more */}
        <Pressable
          onPress={() => {console.warn('Make Money Driving')}}>
          <Text style={{color: '#dddddd', paddingVertical: 5,}}>Do more with your account</Text>
        </Pressable>

        {/* Make money */}
        <Pressable onPress={() => {console.warn('Make Money Driving')}}>
          <Text style={{color: 'white', paddingVertical: 5}}>Make money driving</Text>
        </Pressable>


      </View>

      <DrawerItemList {...props} />

      {/* Make money  onPress={() => { Auth.signOut() }}*/}
      <Pressable>
        <Text style={{padding: 5, paddingLeft: 20}}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
