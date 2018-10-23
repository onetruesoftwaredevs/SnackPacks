/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, WebView} from 'react-native';
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
import SnackPacks from "./src/snackpacks";

//Allow analytics & other aws backend to connect to mobile hub
Amplify.configure(aws_exports);

// The checkout route
//var checkout = require('./src/routes/checkout');
//App.use('/checkout', checkout);

const payment = require('./src/payment.html');

export default class App extends Component {
  render() {
    return (
        <WebView
            style={styles.WebViewStyle}
            source={payment}
            javaScriptEnabled={true}
            domStorageEnabled={true}
        />
    );
  }
}

const styles = StyleSheet.create({
    WebViewStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            flex:1,
            marginTop: (Platform.OS) === 'ios' ? 20 : 0
        },
});
