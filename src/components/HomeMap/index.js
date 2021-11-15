import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
//import {API, graphqlOperation} from 'aws-amplify';useQuery
import { Graphqlindex } from '../../graphql/index';
import { useQuery, gpl } from '@apollo/client';
import { listCars } from '../../graphql/queries';

// import cars from '../../assets/data/cars';

const HomeMap = (props) => {
  const [cars, setCars] = useState([]);
  const { error, loading, data } = useQuery(listCars, {
    variables:{
      filter: {id: ""},
      limit: 10,
      nextToken: "1"
    }
  });
  useEffect(() => {
    try {
      // exampe 
      if (data) {
        /* console.log(data) */
        /* {"listCars": [
          {"__typename": "Car", "createdAt": "1636144813388", "heading": 0.5, "id": "6179cf818b2dc3ea11f428ce", 
          "isActive": true, "latitude": 7.8899765895296525, "longitude": -72.49791163530774, "orders": null, 
          "type": "UberX", "updatedAt": "1636144813388", "user": null, "userId": "123"}, 
          {"__typename": "Car", "createdAt": "1469016015000", "heading": 0.5, "id": "61857f92319ea6d8f1b4aa12", 
          "isActive": true, "latitude": 7.889301757254577, "longitude": -72.49679047190295, "orders": null,
           "type": "Comfort", "updatedAt": "1469016015000", "user": null, "userId": "123"}]} */
        setCars(data.listCars);
      }
      /*const response = await useQuery( listCars );
      console.log("graph reuet ivan diaz")
      console.log(response)
      setCars(response.data.listCars.items);
      */
    } catch (e) {
      console.error(e);
    }
  }, [data])
  /* console.log("carss")
  console.log(cars)
  console.log("data")
  console.log(data) */

  const getImage = (type) => {
    if (type === 'UberX') {
      return require('../../assets/images/top-UberX.png');
    }
    if (type === 'Comfort') {
      return require('../../assets/images/top-Comfort.png');
    }
    return require('../../assets/images/top-UberXL.png');
  };

  return (
    <MapView
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: 7.8880318,
        longitude: -72.4989416,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}>
      {cars.map((car) => (
        <Marker
          key={car.id}
          coordinate={{latitude: car.latitude, longitude: car.longitude}}
        >
          <Image
            style={{
              width: 70,
              height: 70,
              resizeMode: 'contain',
              transform: [{
                rotate: `${car.heading}deg`
              }]
            }}
            source={getImage(car.type)}
          />
        </Marker>
      ))}
    </MapView>
  );
};

export default HomeMap;
