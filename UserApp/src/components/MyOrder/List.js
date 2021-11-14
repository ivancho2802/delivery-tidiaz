import React, { useState, useEffect } from "react";
import { View,Text, Pressable, Alert } from "react-native";
import { useQuery } from '@apollo/client';
import { listOrders } from '../../graphql/queries';
import styles from './styles.js';
import {useNavigation} from '@react-navigation/native'

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Moment from 'react-moment';

const List = (props) => {
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
            //navigation.navigate('Login')
            console.log("OK Pressed")
          } 
        }
      ]
    );
  };
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const { error, loading, data } = useQuery(listOrders, {
    variables:{
      filter: {id: ""},
      limit: 10,
      nextToken: ""
    }
  });
  useEffect(() => {
    try {
      // exampe 
      if (data) { 
        setOrders(data.listOrders);
      }
    } catch (e) {
      console.error(e);
    }
  }, [data])

  const goToOrderDetail = async({ord}) => {
    await setOrder(ord)
    try {
      //const value = await AsyncStorage.getItem('tidiazuser');
      if (ord && ord.car && ord.car?.id) {
        // We have data!!
        console.log("goToOrderDetail OrderPage");
        console.log(ord);
        navigation.navigate('OrderPage', { ord }); 
      }else{
        showTAlert("lo sentimos error en los datos");
        console.log(ord);
        return 
      }
    } catch (error) {
      // Error retrieving data
      console.error(error)
    }
  } 
  return (
      <View>
        <View  style={styles.inputBox}>
            <Text style={styles.inputText}>Mis pedidos</Text>
            {/* <View style={styles.timeContainer}>
            <AntDesign name={'clockcircle'} size={16} color={'#535353'} />
            <Text>Now</Text>
            <MaterialIcons name={'keyboard-arrow-down'} size={16} />
            </View> */}
        </View>
 
        {orders.map((ord) => (
          <Pressable
          key={ord.id}
          style={[styles.container, {
              backgroundColor: (order ? ord.id === order.id:false) ? '#efefef' : 'white',
          }]}
          onPress={() => goToOrderDetail({ord})}>
                <View style={styles.row}>
                    <View style={styles.iconContainer}>
                        <AntDesign name={'car'} size={20} color={'#ffffff'} />
                    </View>
                    <View>
                        <Text style={styles.destinationText}>Order estatus: {ord?.status?ord?.status:'Nueva'}</Text>
                        <Text style={styles.destinationText}>Order numero: {ord?.id}</Text>
                        <Text style={styles.destinationText}>
                            Fecha Mov: {ord?.updatedAt} 
                            {/* <Moment unix>{ord?.updatedAt}</Moment> */}
                        </Text>
                    </View>
                </View>
         </Pressable>
        ))}
      </View>
  );
};

export default List;
