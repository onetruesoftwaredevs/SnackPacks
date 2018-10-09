/**
 * @author Stephen Davis
 *
 * @description the component that handles the functionality the
 */

import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import Cart from '../function/Cart'

export default class QuantityComponent extends Component {
    spname;  // the name of the snack-pack
    spprice; // the price of the snack-pack

    defaultText;     // the default text of the button
    defaultTextSize; // the default text size

    buttonPressedFunction;
    increaseFunction;
    decreaseFunction;

    constructor(props) {
        super(props);

        let initial_quantity = Cart.getInstance().getQuantity(this.props.spname);

        this.state = {
            quantity: initial_quantity
        };
    }

    render() {
        if (this.state.quantity <= 0) {
            let combined_add_to_cart_style = [styles.add_to_cart_style, {fontSize: this.props.defaultTextSize}];

            return (
                <View>
                    <TouchableOpacity onPress={() => this.props.buttonPressedFunction(this)}>
                        <Text style={combined_add_to_cart_style}>{this.props.defaultText}</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            let combined_button_text_style = [styles.button_text_style, {fontSize: this.props.defaultTextSize}];
            let combined_quantity_text_style = [styles.quantity_text_style, {fontSize: this.props.defaultTextSize}];

            return (
                <View>
                    <View style={styles.information_bar}>
                        <TouchableOpacity onPress={() => this.props.decreaseFunction(this)} style={styles.button_style}>
                            <Text style={combined_button_text_style}> - </Text>
                        </TouchableOpacity>
                        <Text style={combined_quantity_text_style}>Quantity: {this.state.quantity}</Text>
                        <TouchableOpacity onPress={() => this.props.increaseFunction(this)} style={styles.button_style}>
                            <Text style={combined_button_text_style}> + </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({

    information_bar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#88CCEE',
    },

    add_to_cart_style: {
        color: '#FFF',
        backgroundColor: '#4488AA',
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4
    },

    quantity_text_style: {
        color: '#222',
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
    },

    button_style: {
        backgroundColor: '#4488AA',
    },

    button_text_style: {
        color: '#FFF',
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
        paddingRight: 12,
        paddingLeft: 12
    }
});