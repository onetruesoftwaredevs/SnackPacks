/**
 * @author Stephen Davis
 *
 * @description this is a view for the price of a snack-pack.
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class PriceView extends Component {
    price; // the value of the price to be displayed

    render() {
        let price = Number(this.props.price).toFixed(2);
        return (
            <View style={styles.container}>
                <Text style={styles.price_style}>${price}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        padding: 4,
        //backgroundColor: '#008844'
    },

    // style of the text displaying the price
    price_style: {
        color: '#008844',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        // different for ios and android research proper way to use before implementing
        //fontFamily: 'normal',
        textAlignVertical: 'center',
        textTransform: 'none',

    }
});



