/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import PriceView from "./src/components/menu/PriceView";
import Review from "./src/components/menu/Review";
import Rating from "./src/components/menu/Rating";
import NutritionView from "./src/components/menu/NutritionView";
import SnackPackView from "./src/components/menu/SnackPackView";

//ref: https://docs.aws.amazon.com/aws-mobile/latest/developerguide/mobile-hub-react-native-getting-started.html#mobile-hub-react-native-getting-started-configure-aws-amplify
import Amplify, {API, Analytics, Storage} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import aws_exports from './src/api/aws-exports';
import PaymentView from "./src/components/cart/PaymentView";
import OrderItemView from "./src/components/cart/OrderItemView";
import CartScreen from "./src/screens/CartScreen";
import MenuScreen from "./src/screens/MenuScreen";
import {SnackPacks} from "./src/snackpacks";
import Driver from "./src/function/Driver";
import User from "./src/function/User";

//Allow analytics & other aws backend to connect to mobile hub
Amplify.configure(aws_exports);

export default class App extends Component {
    constructor(props) {
        super();
        // temporary, use cognito and database to fill values here
        Driver.setInstance("daddy daniels", "0");
        User.setInstance("Steve", "0");
    }

    render() {
        return <SnackPacks/>
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
