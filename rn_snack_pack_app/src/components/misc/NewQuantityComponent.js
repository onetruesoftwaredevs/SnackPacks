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
        return (
            <View style={global_stylesheet.horizontal_container_loose}>
                <View style={global_stylesheet.horizontal_container_tight}>
                    <Text style={styles.data_title_style}>Quantity: </Text>
                    <Text style={styles.data_style}>{this.state.quantity}</Text>
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
    data_title_style: {
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

    data_style: {
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
});