/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack component
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import NewQuantityComponent from "../misc/NewQuantityComponent";

export default class CustomSnackPackComponentPreview extends Component {
    // display
    name;       // string
    price;      // number
    quantity;   // number (initial value)
    // metadata
    id;         // number

    render() {
        let price = Number(this.props.price).toFixed(2);
        return (
            <View style={styles.container}>
                <View style={styles.horizontal_container}>
                    <Text style={styles.name_style}>{this.props.name}</Text>
                    <Text style={styles.price_style}>${price}</Text>
                </View>
                <NewQuantityComponent quantity={this.props.quantity}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 6,
        marginRight: 6,
        backgroundColor: '#fff'
    },

    horizontal_container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    name_style: {
        color: '#444',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4
    },

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

    price_style: {
        color: '#444',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 2
    },
});