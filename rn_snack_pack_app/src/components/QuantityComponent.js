/**
 * @author Stephen Davis
 *
 * @description the component that handles the functionality the
 */

import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import Cart from '../function/Cart'

export default class QuantityComponent extends Component {
    spname; // the name of the snack-pack
    spprice; // the price of the snack-pack

    constructor(props) {
        super(props);

        let initial_quantity = Cart.getInstance().getQuantity(this.props.spname);

        this.state = {
            quantity: initial_quantity
        };
    }

    incrementQuantity = () => {
        this.setState(prevState => ({quantity: prevState.quantity + 1}));
        if (this.state.quantity === 0) {
            // add to cart
            Cart.getInstance().addToCart(this.props.spname, this.props.spprice);
        }
        Cart.getInstance().setQuantity(this.props.spname, this.state.quantity + 1);
    };

    decrementQuantity = () => {
        if (this.state.quantity > 0) {
            this.setState(prevState => ({quantity: prevState.quantity - 1}));
        }
        Cart.getInstance().setQuantity(this.props.spname, this.state.quantity);
        if (this.state.quantity === 1) {
            // remove from cart
            Cart.getInstance().removeFromCart(this.props.spname);
        }
    };

    render() {
        if (this.state.quantity <= 0) {
            return (
                <View>
                    <TouchableOpacity onPress={this.incrementQuantity}>
                        <Text style={styles.add_to_cart_style}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View>
                    <View style={styles.information_bar}>
                        <TouchableOpacity onPress={this.decrementQuantity} style={styles.button_style}>
                            <Text style={styles.button_text_style}>   -   </Text>
                        </TouchableOpacity>
                        <Text style={styles.quantity_text_style}>Quantity: {this.state.quantity}</Text>
                        <TouchableOpacity onPress={this.incrementQuantity} style={styles.button_style}>
                            <Text style={styles.button_text_style}>   +   </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

const
    styles = StyleSheet.create({

        information_bar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#88CCEE',
        },

        add_to_cart_style: {
            color: '#FFF',
            backgroundColor: '#4488AA',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: 'bold',
            textAlign: 'center',
            textDecorationLine: 'none',
            textAlignVertical: 'center',
            textTransform: 'none',
            paddingTop: 4,
            paddingBottom: 4,
        },

        quantity_text_style: {
            color: '#222',
            fontSize: 16,
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
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: 'bold',
            textAlign: 'center',
            textDecorationLine: 'none',
            textAlignVertical: 'center',
            textTransform: 'none',
            padding: 4,
        }
    });