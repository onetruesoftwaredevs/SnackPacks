/**
 *
 * @author Stephen Davis
 *
 * @description screen for drivers when they open the application
 *
 */

import React, {Component} from 'react';
import {TouchableOpacity, Alert, StyleSheet, Text, View, Image} from 'react-native';
import OrderPreview from "../components/driver/OrderPreview";
import Driver from "../function/Driver";
import OrderManager from "../function/OrderManager";

export default class DriverScreen extends Component {

    constructor(props) {
        super();
        this.state = {previousOrder: null}
    }

    loadData(responseJson) {
        this.orderManager = new OrderManager(responseJson);
        Driver.getInstance().setOrderManager(this.orderManager);
        this.setState({
            previousOrder: null,
        });
    }

    componentDidMount() {
        return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers?command=list", {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => this.loadData(responseJson));
    }

    validateDeletion = (responseJson, order_id) => {
        Alert.alert("Deletion of order [" + order_id + "]", responseJson ? "succeeded" : "failed");
    };

    completeCurrentOrder() {
        // create query string
        let currentOrder = Driver.getInstance().getCurrentOrder();
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers?command=delete&id=";
        url = url + currentOrder._id;
        // delete from database
        fetch(url, {method: "GET"})
            .then(response => response.json())
            .then(responseJson => this.validateDeletion(responseJson, currentOrder._id));
        // update driver order manager
        Driver.getInstance().removeCurrentOrder();
        // update ui
        this.setState({previousOrder: currentOrder});
    }

    completeOrderOption = {
        text: 'complete',
        style: {
            backgroundColor: '#44aa44',
            padding: 2,
        },
        onPress: () => {
            this.completeCurrentOrder();
        },
    };

    showMyOrders = () => {
        this.props.navigation.navigate('OrdersView', {
            title: 'My Orders',
            url: "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers?command=list",
            isDriver: true,
        });
    };

    showAvailableOrders = () => {
        this.props.navigation.navigate('OrdersView', {
            title: 'Available Orders',
            url: "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers?command=list",
            isDriver: false,
        });
    };

    render() {
        let currentOrder = Driver.getInstance().getCurrentOrder();
        if (currentOrder === null) {
            // no current orders
            return (
                <View style={styles.container}>
                    <View style={styles.horizontal_container}>
                        <Text style={styles.name_style}>{Driver.getInstance().getName()}</Text>
                        <Text style={styles.name_style}>{Driver.getInstance().getId()}</Text>
                    </View>
                    <View style={styles.horizontal_container}>
                        <TouchableOpacity style={styles.button_style} onPress={this.showMyOrders}>
                            <Text style={styles.my_order_style}> My Orders</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button_style} onPress={this.showAvailableOrders}>
                            <Text style={styles.available_order_style}>Available Orders</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        // current orders
        return (
            <View style={styles.container}>
                <View style={styles.horizontal_container}>
                    <Text style={styles.name_style}>{Driver.getInstance().getName()}</Text>
                    <Text style={styles.name_style}>{Driver.getInstance().getId()}</Text>
                </View>
                <OrderPreview
                    name={currentOrder._recipient}
                    number={currentOrder._id}
                    driver={currentOrder._driver}
                    order_status={'not delivered'}
                    payment_info={currentOrder._paymentInfo}
                    address={currentOrder._address}
                    subtotal={currentOrder._subtotal}
                    tax={currentOrder._tax}
                    total={currentOrder._total}
                    last_screen={'DriversScreen'}
                    navigation={this.props.navigation}
                    swipe_handler={"complete_order_option"}
                    parent={this}
                    is_reviewable={false}
                />
                <View style={styles.horizontal_container}>
                    <TouchableOpacity style={styles.button_style} onPress={this.showMyOrders}>
                        <Text style={styles.my_order_style}> My Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button_style} onPress={this.showAvailableOrders}>
                        <Text style={styles.available_order_style}>Available Orders</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'space-between'
    },

    horizontal_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    name_style: {
        color: '#444',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4
    },

    map_style: {
        height: '75%',
    },

    button_style: {
        width: '50%',
    },

    my_order_style: {
        color: '#fdfdfd',
        backgroundColor: '#FF8844',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8
    },

    available_order_style: {
        color: '#fdfdfd',
        backgroundColor: '#44AAff',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8
    },
});

