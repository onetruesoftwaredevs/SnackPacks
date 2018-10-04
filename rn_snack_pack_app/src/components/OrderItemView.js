/**
 * @author Stephen Davis
 *
 * @description this is a view for the order information of a snack-pack item
 *
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class OrderItemView extends Component {
    spname;     // the name of the snack-pack
    spprice;    // the value of the price
    spquantity; // the quantity of the snack-pack

    render() {
        let roundedPrice = Number(`${this.props.spprice * this.props.spquantity}`).toFixed(2);

        return (
            <View style={styles.container}>
                <View style={styles.horizontal_container}>
                    <View>
                        <Text style={styles.name_style}>{this.props.spname}</Text>
                        <Text/>
                    </View>
                    <View>
                        <View style={styles.horizontal_container}>
                            <Text style={styles.information_style}>Quantity: </Text>
                            <Text style={styles.information_style}>{this.props.spquantity}</Text>
                        </View>
                        <View style={styles.horizontal_container}>
                            <Text style={styles.information_style}>Price: </Text>
                            <Text style={styles.information_style}>${roundedPrice}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        padding: 4,
        width: '90%',
    },

    horizontal_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#DEDEDE'

    },

    name_style: {
        color: '#444',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',

    },

    information_style: {
        color: '#444',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',

    }

});
