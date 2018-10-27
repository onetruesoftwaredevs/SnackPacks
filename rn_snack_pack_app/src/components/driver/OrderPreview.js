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

export default class OrderPreview extends Component {
    name;           // string
    number;         // number
    order_status;   // string
    payment_info;   // string
    address;        // string
    subtotal;       // number
    tax;            // number
    total;          // number
    last_screen;    // string
    navigation;     // object

    option = {
        text: 'complete',
        style: {
            backgroundColor: '#44aa44',
            padding: 2,
        },
        onPress: () => {
            Alert.alert('complete pressed', '');
        },
    };

    getName() {
        if (this.props.name.length <= 0) { return "No Driver"; }
        return this.props.name;
    }

    getNumber()
    {
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

    render() {
        // create method or dictionary to dynamically change background color based on status
        let order_status_style = [styles.status_style, {backgroundColor: '#44AAff'}];

        return (
            <TouchableOpacity style={styles.container} onPress={this.showDetailedView}>
                <Swipeout right={this.option}>
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
