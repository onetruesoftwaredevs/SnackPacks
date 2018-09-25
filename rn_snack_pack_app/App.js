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

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
          <PriceView price={10.99}/>
          <Review author='Stephen Davis' title='Quality' review='this was a very good product' rating={4}/>
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
