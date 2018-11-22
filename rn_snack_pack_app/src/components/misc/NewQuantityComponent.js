/**
 *
 * @author Stephen Davis
 *
 * @description the default quantity component
 *
 *
 * */

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {global_stylesheet} from "../../stylesheet";

export default class NewQuantityComponent extends Component {
    quantity;   // number
    navigation; // object
    onIncrease; // function (int [new quantity])
    onDecrease; // function (int [new quantity])

    constructor(props) {
        super();
        this.state = {quantity: props.quantity};
    }

    _decreaseQuantity = () => {
        if (this.state.quantity < 1) {
            return;
        }
        this.setState({
            quantity: this.state.quantity - 1
        });

        if (this.props.onDecrease !== undefined) {
            this.props.onDecrease(this.state.quantity - 1);
        }
    };

    _increaseQuantity = () => {
        this.setState({
            quantity: this.state.quantity + 1
        });

        if (this.props.onIncrease !== undefined) {
            this.props.onIncrease(this.state.quantity + 1);
        }
    };

    render() {
        if (this.state.quantity === 0) {
            return (
                <TouchableOpacity onPress={this._increaseQuantity}>
                    <Text style={styles.add_to_cart_style}>Add to Cart</Text>
                </TouchableOpacity>
            );
        }

        return (
            <View style={global_stylesheet.horizontal_container_loose}>
                <View style={global_stylesheet.horizontal_container_tight}>
                    <Text style={global_stylesheet.data_title_style}>Quantity: </Text>
                    <Text style={global_stylesheet.data_style}>{this.state.quantity}</Text>
                </View>
                <View style={global_stylesheet.horizontal_container_tight}>
                    <TouchableOpacity onPress={this._decreaseQuantity}>
                        <Text style={styles.decrease_style}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._increaseQuantity}>
                        <Text style={styles.increase_style}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    increase_style: {
        color: '#fff',
        backgroundColor: "#4A4",
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        paddingVertical: 4,
        paddingHorizontal: 24,

    },

    decrease_style: {
        color: '#fff',
        backgroundColor: "#F44",
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        paddingVertical: 4,
        paddingHorizontal: 24,

    },

    add_to_cart_style: {
        color: '#fff',
        backgroundColor: "#4AF",
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        paddingVertical: 4,
        paddingHorizontal: 24,

    },
});