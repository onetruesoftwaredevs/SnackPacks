/**
 * @author Stephen Davis
 *
 * @description this is a view for the entire users cart
 */

import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import OrderItemView from "./OrderItemView";
import PaymentView from "./PaymentView";

export default class CartView extends Component {
    price; // the value of the price to be displayed

    // TODO change this method to populate with actual data
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title_style}>My Cart</Text>
                <FlatList
                    style={styles.flatlist_style}
                    data = {[
                        {key: 'sp1', spprice: 5.99, spquantity: 2},
                        {key: 'sp2', spprice: 6.99, spquantity: 3},
                        {key: 'sp3', spprice: 7.99, spquantity: 4},
                        {key: 'sp4', spprice: 8.99, spquantity: 5},
                        {key: 'sp5', spprice: 9.99, spquantity: 7},
                        {key: 'sp6', spprice: 10.99, spquantity: 9},
                        {key: 'sp7', spprice: 2.99, spquantity: 1},
                        {key: 'sp1', spprice: 5.99, spquantity: 2},
                        {key: 'sp2', spprice: 6.99, spquantity: 3},
                        {key: 'sp3', spprice: 7.99, spquantity: 4},
                        {key: 'sp4', spprice: 8.99, spquantity: 5},
                        {key: 'sp5', spprice: 9.99, spquantity: 7},
                        {key: 'sp6', spprice: 10.99, spquantity: 9},
                        {key: 'sp7', spprice: 2.99, spquantity: 1},
                    ]}
                    renderItem={({item}) => <OrderItemView spname={item.key} spprice={item.spprice} spquantity={item.spquantity}/>}
                />
                <PaymentView subtotal={50.00} tax={7.89} deliveryFee={6.99}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
        width: '90%',
        //backgroundColor: '#008844'
    },

    flatlist_style: {
        height: '50%'
    },

    title_style: {
        color: '#444',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
    },
});
