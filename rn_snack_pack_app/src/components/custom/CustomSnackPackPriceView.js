/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack component prices
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import NewQuantityComponent from "../misc/NewQuantityComponent";

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

    onQuantityChanged = (q) => {
        this.setState({quantity: q});
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

                <NewQuantityComponent quantity={this.props.quantity} onIncrease={this.onQuantityChanged}
                                      onDecrease={this.onQuantityChanged}/>

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