import React from "react";
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigator from "./Home";
import CustomDrawer from "./CustomDrawer";
import LoginNavigator from "./Login";
import SingUpNavigator from "./SingUp";
import OrderNavigator from "./Order";

const Drawer = createDrawerNavigator();

const DummyScreen = (props) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>{props.name}</Text>
  </View>
)

const RootNavigator = (props) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={
        (props) => (
          <CustomDrawer {...props} />)
      }>
        <Drawer.Screen name="Home" component={HomeNavigator} />

        <Drawer.Screen name="Mis Pedidos" component={OrderNavigator} />

        <Drawer.Screen name="Your Trips">
           {() => <DummyScreen name={"Your Trips"} />}
        </Drawer.Screen>

        <Drawer.Screen name="Help">
          {() => <DummyScreen name={"Help"} />}
        </Drawer.Screen>

        <Drawer.Screen name="Wallet">
          {() => <DummyScreen name={"Wallet"} />}
        </Drawer.Screen>

        <Drawer.Screen name="Settings">
          {() => <DummyScreen name={"Settings"} />}
        </Drawer.Screen>
        <Drawer.Screen name="Login" component={LoginNavigator} />
        
        <Drawer.Screen name="SingUp" component={SingUpNavigator} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
