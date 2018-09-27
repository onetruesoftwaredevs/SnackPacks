/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import PriceView from "./src/components/PriceView";
import Review from "./src/components/Review";
import Rating from "./src/components/Rating";
import NutritionView from "./src/components/NutritionView";
import SnackPackView from "./src/components/SnackPackView";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
          <SnackPackView spname='Snack-pack-1' sprating={3.5} spprice={10.99}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
});
