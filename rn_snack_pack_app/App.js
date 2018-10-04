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

//ref: https://docs.aws.amazon.com/aws-mobile/latest/developerguide/mobile-hub-react-native-getting-started.html#mobile-hub-react-native-getting-started-configure-aws-amplify
import Amplify, {API, Analytics,Storage} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import aws_exports from './src/aws-exports';
import PaymentView from "./src/components/PaymentView";
import OrderItemView from "./src/components/OrderItemView";
import CartView from "./src/components/CartView";
import SnackPackMenuView from "./src/components/SnackPackMenuView";

//Allow analytics & other aws backend to connect to mobile hub
Amplify.configure(aws_exports);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
          <SnackPackMenuView data={[]}/>
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
