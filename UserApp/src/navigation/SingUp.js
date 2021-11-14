import React from "react";
import { createStackNavigator } from '@react-navigation/stack'
import SingUpScreen from "../screens/SingUpScreen";


const Stack = createStackNavigator();

const SingUpNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"SingUp"} component={SingUpScreen} />
    </Stack.Navigator>
  );
};

export default SingUpNavigator;
