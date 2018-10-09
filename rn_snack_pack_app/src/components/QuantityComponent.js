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

    parent;

    incrementQuantity = (name, price, quantity, parent) => {
        if (quantity === 0) {
            // add to cart
            Cart.getInstance().addToCart(name, price);
        }
        else {
            // update quantity
            Cart.getInstance().setQuantity(name, quantity + 1);
        }
        parent.forceUpdate();
    };

    decrementQuantity = (name, quantity, parent) => {
        if (quantity >= 1) {
            // update quantity
            Cart.getInstance().setQuantity(name, quantity - 1);
        }
        if (quantity - 1 <= 0) {
            // remove from cart
            Cart.getInstance().removeFromCart(name);
        }
        parent.forceUpdate();
    };

    render() {
        let quantity = Cart.getInstance().getQuantity(this.props.spname);

        if (quantity <= 0) {
            let combined_add_to_cart_style = [styles.add_to_cart_style, {fontSize: this.props.defaultTextSize}];

            return (
                <View>
                    <TouchableOpacity
                        onPress={() => this.incrementQuantity(this.props.spname, this.props.spprice, 0, this.props.parent)}
                    >
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
                        <TouchableOpacity
                            onPress={() => this.decrementQuantity(this.props.spname, quantity, this.props.parent)}
                            style={styles.button_style}
                        >
                            <Text style={combined_button_text_style}> - </Text>
                        </TouchableOpacity>
                        <Text style={combined_quantity_text_style}>Quantity: {quantity}</Text>
                        <TouchableOpacity
                            onPress={() => this.incrementQuantity(this.props.spname, this.props.spprice, quantity, this.props.parent)}
                            style={styles.button_style}
                        >
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