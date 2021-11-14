import React from "react";
import { createStackNavigator } from '@react-navigation/stack'

import MyOrderScreen from "../screens/MyOrderScreen";

const Stack = createStackNavigator();

const OrderNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"MyOrder"} component={MyOrderScreen} />

    </Stack.Navigator>
  );
};

export default OrderNavigator;
