import React, {useState, useEffect} from 'react';
import {View, TextInput, SafeAreaView} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';

import styles from './styles.js';
import PlaceRow from "./PlaceRow";

const homePlace = {
  description: 'Dominos Pizza',
  geometry: { location: { lat: 7.8835836, lng: -72.5052658 } },
};
const workPlace = {
  description: 'MacDonalds',
  geometry: { location: { lat: 7.8409097, lng: -72.5054875 } },
};

const DestinationSearch = (props) => {
  const [originPlace, setOriginPlace] = useState({});
  const [destinationPlace, setDestinationPlace] = useState({});

  const navigation = useNavigation();

  const checkNavigation = () => {
    console.log(originPlace)
    console.log(destinationPlace)
    if (Object.keys(originPlace).length && Object.keys(destinationPlace).length) {
      navigation.navigate('SearchResults', {
        originPlace,
        destinationPlace,
      })
    }
  }

  useEffect(() => {
    checkNavigation();
  }, [originPlace, destinationPlace]);

  return (
    <SafeAreaView>
      <View style={styles.container}>

        <GooglePlacesAutocomplete
          placeholder="Where from?"
          onPress={(data, details = null) => {
            setOriginPlace({data, details, latitude: details.geometry.location.lat, longitude: details.geometry.location.lng});
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          currentLocation={true}
          currentLocationLabel='Current location'
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteContainer,
            listView: styles.listView,
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyD0HZOSZ6R5XymzyvKDNUWlS_l5D6s1ak8',
            language: 'en',
          }}
          renderRow={(data) => <PlaceRow data={data} />}
          renderDescription={(data) => data.description || data.vicinity}
          predefinedPlaces={[homePlace, workPlace]}
        />

        <GooglePlacesAutocomplete
          placeholder="Where to?"
          onPress={(data, details = null) => {
            setDestinationPlace({data, details, latitude: details.geometry.location.lat, longitude: details.geometry.location.lng});
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          styles={{
            textInput: styles.textInput,
            container: {
              ...styles.autocompleteContainer,
              top: 55,
            },
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyD0HZOSZ6R5XymzyvKDNUWlS_l5D6s1ak8',
            language: 'en',
          }}
          renderRow={(data) => <PlaceRow data={data} />}
          renderDescription={(data) => data.description || data.vicinity}
          predefinedPlaces={[homePlace, workPlace]}
        />

        {/* Circle near Origin input */}
        <View style={styles.circle} />

        {/* Line between dots */}
        <View style={styles.line} />

        {/* Square near Destination input */}
        <View style={styles.square} />

      </View>
    </SafeAreaView>
  );
};

export default DestinationSearch;
