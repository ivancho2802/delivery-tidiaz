import React from "react";
import { createStackNavigator } from '@react-navigation/stack'
import SingUp from "../screens/SingUp";


const Stack = createStackNavigator();

const SingUpNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"SingUp"} component={SingUp} />
    </Stack.Navigator>
  );
};

export default SingUpNavigator;
