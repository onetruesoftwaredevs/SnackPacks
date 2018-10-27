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

export default class DriverScreen extends Component {

    showMyOrders = () => {
        this.props.navigation.navigate('OrdersView', {
            title: 'My Orders',
            url: Driver.getInstance().getOrderURL(),
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
        return (
            <View style={styles.container}>
                <Text style={styles.name_style}>{Driver.getInstance().getName()}</Text>

                <OrderPreview
                    name={'test'}
                    number={1}
                    order_status={'not delivered'}
                    payment_info={'payment info'}
                    address={'1016 W. Stadium Ave.'}
                    subtotal={10.00}
                    tax={2.00}
                    total={12.00}
                    last_screen={'DriversScreen'}
                    navigation={this.props.navigation}
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
        fontSize: 20,
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
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 6
    },

    available_order_style: {
        color: '#fdfdfd',
        backgroundColor: '#44AAff',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 6
    },
});

