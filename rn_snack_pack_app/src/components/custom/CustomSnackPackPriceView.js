/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack component prices
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default class CustomSnackPackPriceView extends Component {
    // display
    price;      // number
    quantity;   // number (initial)
    // metadata
    id;         // number

    constructor(props) {
        super();
        this.state = {quantity: props.quantity,};
    }

    _decreaseQuantity = () => {
        if (this.state.quantity < 1) {
            return;
        }
        this.setState({
            quantity: this.state.quantity - 1
        });
    };

    _increaseQuantity = () => {
        this.setState({
            quantity: this.state.quantity + 1
        });
    };


    render() {
        let price = Number(this.props.price).toFixed(2);
        let subtotal = Number(Number(this.props.price) * Number(this.state.quantity)).toFixed(2);
        return (
            <View style={styles.container}>
                <View style={styles.horizontal_container}>
                    <Text style={styles.text_style}>Price</Text>
                    <Text style={styles.value_style}>${price}</Text>
                </View>
                <View style={styles.horizontal_container}>
                    <View style={styles.horizontal_container}>
                        <Text style={styles.text_style}>Quantity:</Text>
                        <Text style={styles.value_style}>{this.state.quantity}</Text>
                    </View>
                    <View style={styles.horizontal_container}>
                        <View style={styles.horizontal_container}>
                            <TouchableOpacity onPress={this._decreaseQuantity}>
                                <Text style={styles.decrease_style}>-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._increaseQuantity}>
                                <Text style={styles.increase_style}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View/>
                    </View>
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.text_style}>Subtotal</Text>
                    <Text style={styles.value_style}>{subtotal}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        //width: '100%',
        backgroundColor: '#fff',
        marginBottom: 6,
        marginRight: 6
    },

    horizontal_container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    text_style: {
        color: '#444',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'top',
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
        textAlignVertical: 'top',
        textTransform: 'none',
        paddingVertical: 4,
        paddingHorizontal: 24,

    },

    value_style: {
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
});