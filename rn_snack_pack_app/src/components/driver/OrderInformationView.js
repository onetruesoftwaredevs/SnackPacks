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
import {Alert, StyleSheet, Text, View} from 'react-native';
import Swipeout from "rn-swipe-out";

export default class OrderInformationView extends Component {
    name;           // string
    number;         // number
    order_status;   // string
    address;        // string

    option = {
        text: 'complete',
        style: {
            backgroundColor: '#44aa44',
            padding: 2,
        },
        onPress: () => {Alert.alert('complete pressed', '');},
    };

    render() {
        // create method or dictionary to dynamically change background color based on status
        let order_status_style = [styles.status_style, {backgroundColor: '#44AAff'}];

        return (
            <Swipeout style={styles.container} right={this.option}>

                <View style={styles.horizontal_container}>
                    <Text style={styles.name_style}>{this.props.name}</Text>
                    <Text style={styles.number_style}>{this.props.number}</Text>
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.address_style}>{this.props.address}</Text>
                    <Text style={order_status_style}>{this.props.order_status}</Text>
                </View>

            </Swipeout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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