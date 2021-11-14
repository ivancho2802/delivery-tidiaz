import React, { useState, useEffect }  from "react";
import { View, Text, Pressable, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles.js';
import UberTypeRow from '../UberTypeRow';
import { useNavigation } from '@react-navigation/native';
import { CREATE_ORDER } from '../../graphql/mutations';
import { useMutation, useQuery } from "@apollo/client";
import { listCars } from '../../graphql/queries';
//import { listTypeCars } from '../../graphql/queries';

//import typesData from '../../assets/data/types';

const UberTypes = ({ origin, destination }) => {
  const navigation = useNavigation();
  const [typesData, setCar] = useState([]);
  //const [typesData, setTypeCar] = useState([]);
  const [userInfo, setUser] = useState({});//username: "----", email: "", bill: 0
  const [selectedType, setSelectedType] = useState({});
  const [CreateOrder, { error}] = useMutation(CREATE_ORDER);
  const showTAlert = (msg, force) => {
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
            if(force)
              navigation.navigate('Login')
            console.log("OK Pressed")
          } 
        }
      ]
    );
  };

  const { errorLC, loading, data } = useQuery(listCars, {
    variables:{
      filter: {
        id: ""
        //originLatitude: origin.details.geometry.location.lat,
        //oreiginLongitude: origin.details.geometry.location.lng
      },
      limit: 10,
      nextToken: "1"
    }
  });
  //consulta primero de typesData segun la ubicacion de origin
  useEffect(() => {
    async function fetchDataCars() {
      try {
        if (data) {
          var carsF = []
          if(data.listCars.length>0)
          for (let index = 0; index < data.listCars.length; index++) {
            var car = data.listCars[index];
            const carf = {
              id: car.id,
              type: car.type,
              price: 10,
              duration: 45
            }
            carsF.push(carf)
          }        
          setCar(carsF);
        }
      } catch (error) {
        // Error retrieving data
        console.log("errorfetchData car");
        console.error(error);
        showTAlert(JSON.stringify(error))
      }
    }
    fetchDataCars();
  }, [data]);
  //inicializar los datos del usuario
  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const value = await AsyncStorage.getItem('tidiazuser');
        if (value !== null) {
          // We have data!!
          setUser(JSON.parse(value))//await Auth.currentAuthenticatedUser();
          if(userInfo)
          console.log(userInfo)
        }else{
          console.log("userinfo invalido value tidiazuser");
          console.log(value);
          showTAlert("no has iniciado sesion ¿quieres iniciar sesion?", true)
        }
      } catch (error) {
        // Error retrieving data
        console.log("errorfetchData");
        console.error(error);
        showTAlert(JSON.stringify(error))
      }
    }
    fetchData();
  }, []);
  const onSubmit = async () => {
    const type = selectedType.type;
    const idselectedType = selectedType.id;
    if (!idselectedType || !type || !userInfo) {
      return;
    }
    console.log("origin")
    console.log(selectedType)
    console.log(origin)
    // submit to server
    try {
      const date = new Date();
      const input = {
        createdAt: date.toISOString(),
        type,
        originLatitude: origin.details.geometry.location.lat,
        
        oreiginLongitude: origin.details.geometry.location.lng,

        destLatitude: destination.details.geometry.location.lat,
        destLongitude: destination.details.geometry.location.lng,

        userId: userInfo.id,//userInfo.attributes.sub,
        carId: idselectedType,
        status: "NEW",
      }
      console.log("input")
      console.log(input)
      const response = await CreateOrder({
        variables: input
      });
      /* const response = await API.graphql(
        graphqlOperation(
          createOrder, {
            input: input
          },
        )
      ) */
      if(error){
          console.error(error);
          showTAlert(JSON.stringify(error), false)
      }
      if (response){
        console.log("response");
        console.log(response);
        navigation.navigate('OrderPage', { ord: response.data.createOrder }); 
      }
    } catch (e) {
      console.error(e);
      showTAlert(JSON.stringify(e), false)
    }
  }
  return (
    <View>
      {typesData.map((type) => (
        <UberTypeRow
          type={type}
          key={type.id}
          isSelected={type.id === selectedType.id}
          onPress={() => setSelectedType(type)}
        />
      ))}

      <Pressable onPress={onSubmit} style={{
        backgroundColor: 'black',
        padding: 10,
        margin: 10,
        alignItems: 'center',
      }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          Confirm Uber
        </Text>
      </Pressable>
    </View>
  );
};

export default UberTypes;
