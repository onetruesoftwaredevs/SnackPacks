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
import Review from "./src/components/misc/Review";
import Rating from "./src/components/misc/Rating";
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
        this.state = {isLoading: true};
        User.setInstance("Steve", "1");
    }

    componentDidMount() {
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers?command=list";
        fetch(url, {method: "GET"})
            .then(response => response.json())
            .then(responseJson => this.loadData(responseJson));
    }

    loadData = (responseJson) => {
        let driver = responseJson[0]; // load the first driver (temporary but more complete)
        Driver.setInstance(
            driver._name,
            driver._id,
            driver._phone,
            driver._carmodel,
            driver._carmake,
            driver._rating,
            driver._status,
            driver._reviews
        );
        this.setState({isLoading: false});
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.loading_text}>Loading metadata</Text>
                </View>
            );
        }

        return <SnackPacks/>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        width: '100%',
        height: '100%',
    },

    loading_text: {
        flex: 1,
        color: '#444',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
    },
});
