/**
 * @author Stephen Davis
 *
 * @description this is a view for all of the payment information
 * and handles the pay action
 */

import React, {Component} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import NumberFormat from 'react-number-format'
import {global_stylesheet} from "../../stylesheet";

export default class PaymentView extends Component {
    subtotal;
    serviceFee;

    _handlePayment = () => {
        Alert.alert("Payment button pressed", "test");
    };

    render() {
        let serviceFee = Number(this.props.serviceFee).toFixed(2);
        let tax = Number(Number(this.props.subtotal) * 0.06).toFixed(2);
        let roundedTotal = Number(Number(this.props.subtotal) + Number(tax) + Number(this.props.serviceFee)).toFixed(2);

        return (
            <View>
                <View style={global_stylesheet.basic_container}>
                    <Field title={"Subtotal"} value={this.props.subtotal}/>
                    <Field title={"Tax"} value={tax}/>
                    <Field title={"Service Fee"} value={serviceFee}/>
                    <Field title={"Total"} value={roundedTotal}/>
                </View>
                <TouchableOpacity onPress={this._handlePayment} style={global_stylesheet.full_width_style}>
                    <Text style={global_stylesheet.green_button_style}>Checkout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class Field extends Component {
    title;  // string
    value;  // number

    render() {
        return (
            <View style={global_stylesheet.horizontal_container_loose}>
                <Text style={global_stylesheet.data_title_style}>{this.props.title}</Text>
                <NumberFormat
                    value={this.props.value}
                    displayType={'text'}
                    prefix={'$'}
                    renderText={value => <Text style={global_stylesheet.data_style}>{value}</Text>}
                />
            </View>
        );
    }

}
