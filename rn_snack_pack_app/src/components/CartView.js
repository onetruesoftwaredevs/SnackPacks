/**
 * @author Stephen Davis
 *
 * @description this is a view for the entire users cart
 */

import React, {Component} from 'react';
import {FlatList, Alert, StyleSheet, Text, View} from 'react-native';
import OrderItemView from "./OrderItemView";
import PaymentView from "./PaymentView";
import Cart from '../function/Cart'

export default class CartView extends Component {

    constructor(props) {
        super();
        this.state = {lastItemRemoved: "null"}
    }

    removeItemFromCart = (name) => {
        Cart.getInstance().removeFromCart(name);
        this.setState({lastItemRemoved: name});
    };

    render() {
        let cartSubtotal = Number(Cart.getInstance().total_cost).toFixed(2);

        return (
            <View style={styles.container}>
                <Text style={styles.title_style}>My Cart</Text>
                <FlatList
                    style={styles.flatlist_style}
                    data={Cart.getInstance().getItemsInCart()}
                    renderItem={({item}) =>
                        <OrderItemView
                            spname={item.spname}
                            spprice={item.spprice}
                            removeFromCartFunction={this.removeItemFromCart}
                            parent={this}
                        />
                    }
                    keyExtractor={(item) => item.spname}
                />
                <PaymentView subtotal={cartSubtotal} tax={7.89} deliveryFee={6.99}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
        width: '90%',
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
