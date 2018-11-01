/**
 *
 * @author Stephen Davis
 *
 * @description a view for the order information including ...
 * - name
 * - number
 * - status
 * - address
 *
 */

import React, {Component} from 'react';
import {TouchableOpacity, Alert, StyleSheet, Text, View} from 'react-native';
import Swipeout from "../../rn-swipe-out";
import OrderManager from "../../function/OrderManager";
import Driver from "../../function/Driver";

export default class OrderPreview extends Component {
    name;                   // string
    number;                 // number
    order_status;           // string
    payment_info;           // string
    address;                // string
    subtotal;               // number
    tax;                    // number
    total;                  // number
    last_screen;            // string
    navigation;             // object
    swipe_handler;          // string
    order_manager;          // object
    parent;                 // Component

    constructor(props) {
        super();
        this.state = {order: null};
    }


    getName() {
        if (this.props.name.length <= 0) {
            return "No Driver";
        }
        return this.props.name;
    }

    getNumber() {
        if (this.props.number === null || this.props.number === undefined) {
            return 0;
        }
        return this.props.number;
    }

    showDetailedView = () => {
        this.props.navigation.navigate('DetailedOrderView', {
            name: this.getName(),
            number: this.getNumber(),
            order_status: this.props.order_status,
            payment_info: this.props.payment_info,
            address: this.props.address,
            subtotal: this.props.subtotal,
            tax: this.props.tax,
            total: this.props.total,
            last_screen: this.props.last_screen,
        });
    };

    takeOrder(id) {
        // get order from orderManager
        let order = this.props.order_manager.getOrderById(id);
        // remove order by id
        this.props.order_manager.removeOrderById(id);
        // patch order to the server
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers?command=edit&id=";
        url = url + order._id;
        fetch(url, {
            method: "PATCH",
            body: JSON.stringify({
                _recipient: order._recipient,
                _paymentInfo: order._paymentInfo,
                _address: order._address,
                _driver: Driver.getInstance().getId(),
                _subtotal: order._subtotal,
                _tax: order._tax,
                _total: order._total,
            }),
        });
        // update the order locally
        order._driver = Driver.getInstance().getId();
        // update the drivers order list
        Driver.getInstance().getOrderManager().insertOrder(order);
        // refresh the ui
        this.props.parent.forceUpdate();
    }

    available_option = {
        text: 'Take Order',
        style: {
            backgroundColor: '#44aa44',
            padding: 2,
        },
        onPress: () => {
            this.takeOrder(this.getNumber());
        },
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
        this.props.parent.forceUpdate();
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

    render() {
        // create method or dictionary to dynamically change background color based on status
        let order_status_style = [styles.status_style, {backgroundColor: '#44AAff'}];
        let swipe_handler = null;
        if (this.props.swipe_handler === "available_option") {
            swipe_handler = this.available_option;
        }
        else {
            swipe_handler = this.completeOrderOption;
        }
        return (
            <TouchableOpacity style={styles.container} onPress={this.showDetailedView}>
                <Swipeout right={swipe_handler}>
                    <View style={styles.horizontal_container}>
                        <Text style={styles.name_style}>{this.getName()}</Text>
                        <Text style={styles.number_style}>{this.getNumber()}</Text>
                    </View>
                    <View style={styles.horizontal_container}>
                        <Text style={styles.address_style}>{this.props.address}</Text>
                        <Text style={order_status_style}>{this.props.order_status}</Text>
                    </View>
                </Swipeout>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DEDEDE'
    },

    horizontal_container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    name_style: {
        color: '#444',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4
    },

    number_style: {
        color: '#444',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4

    },

    address_style: {
        color: '#444',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4

    },

    status_style: {
        color: '#fff',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
    }
});
