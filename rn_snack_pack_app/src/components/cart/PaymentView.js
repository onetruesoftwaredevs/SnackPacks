/**
 * @author Stephen Davis
 *
 * @description this is a view for all of the payment information
 * and handles the pay action
 */

import React, {Component} from 'react';
import {Alert, TouchableOpacity, Platform, StyleSheet, Text, View} from 'react-native';
import NumberFormat from 'react-number-format'

export default class PaymentView extends Component {
    subtotal;
    tax;
    deliveryFee;

    _handlePayment()
    {
        Alert.alert("Payment button pressed", "test");
    }

    render() {
        let roundedTotal = Number(Number(this.props.subtotal) + Number(this.props.tax) + Number(this.props.deliveryFee)).toFixed(2);

        return (
            <View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.price_style}>Subtotal:</Text>
                    <NumberFormat
                        value={this.props.subtotal}
                        displayType={'text'}
                        prefix={'$'}
                        renderText={value =><Text style={styles.price_style}>{value}</Text>}
                    />
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.price_style}>Tax:</Text>
                    <NumberFormat
                        value={this.props.tax}
                        displayType={'text'}
                        prefix={'$'}
                        renderText={value =><Text style={styles.price_style}>{value}</Text>}
                    />
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.price_style}>Delivery Fee:</Text>
                    <NumberFormat
                        value={this.props.deliveryFee}
                        displayType={'text'}
                        prefix={'$'}
                        renderText={value =><Text style={styles.price_style}>{value}</Text>}
                    />
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.price_style}>Total:</Text>
                    <NumberFormat
                        value={roundedTotal}
                        displayType={'text'}
                        prefix={'$'}
                        renderText={value => <Text style={styles.price_style}>{value}</Text>}
                    />
                </View>
                <TouchableOpacity onPress={this._handlePayment} style={styles.button_style}>
                    <Text style={styles.button_text_style}>Checkout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    horizontal_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#DEDEDE'
    },

    price_style: {
        color: '#444',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
    },


    button_style: {
        backgroundColor: '#008844',
    },

    button_text_style: {
        color: '#FFF',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8,
    }

});