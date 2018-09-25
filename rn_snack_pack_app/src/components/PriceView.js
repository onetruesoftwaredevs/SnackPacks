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
        return (
            <View style={styles.container}>
                <Text style={styles.price_style}>${this.props.price}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        padding: 16,
        backgroundColor: '#008844'
    },

    // style of the text displaying the price
    price_style: {
        color: '#ffffff',
        fontSize: 16,
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



