import React from "react";
import { View, Dimensions, ScrollView, SafeAreaView } from "react-native";

import HomeMap from '../../components/HomeMap';
import CovidMessage from '../../components/CovidMessage';
import HomeSearch from '../../components/HomeSearch'; 

import styles from './styles.js';

const HomeScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{height: Dimensions.get('window').height - 400}}>
          <HomeMap />
        </View>

        {/*  Covid Message*/}
        <CovidMessage />

        {/*  Bottom Comp*/}
        <HomeSearch />

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
