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
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Swipeout from "../../rn-swipe-out";

export default class DetailedOrderView extends Component {

    _goBack = () => {
        this.props.navigation.navigate(this.props.navigation.state.params.last_screen);
    };

    render() {
        let params = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <View style={styles.horizontal_container}>
                    <Text style={styles.text_style}>Recipient: </Text>
                    <Text style={styles.text_style}>{params.name}</Text>
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.text_style}>Number: </Text>
                    <Text style={styles.text_style}>{params.number}</Text>
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.text_style}>Status: </Text>
                    <Text style={styles.text_style}>{params.order_status}</Text>
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.text_style}>Payment Info: </Text>
                    <Text style={styles.text_style}>{params.payment_info}</Text>
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.text_style}>Address: </Text>
                    <Text style={styles.text_style}>{params.address}</Text>
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.text_style}>Subtotal: </Text>
                    <Text style={styles.text_style}>{params.subtotal}</Text>
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.text_style}>Tax: </Text>
                    <Text style={styles.text_style}>{params.tax}</Text>
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.text_style}>Total: </Text>
                    <Text style={styles.text_style}>{params.total}</Text>
                </View>
                <TouchableOpacity style={styles.button_style} onPress={this._goBack}>
                    <Text style={styles.back_style}>Back</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'space-between',
        backgroundColor: '#DEDEDE'
    },

    horizontal_container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    text_style: {
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

    button_style: {
        width: '100%',
    },

    back_style: {
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
