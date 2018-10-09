/**
 * @author Stephen Davis
 *
 * @description this is a view for the entire users cart
 */

import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import OrderItemView from "./OrderItemView";
import PaymentView from "./PaymentView";
import Cart from '../function/Cart'

export default class CartView extends Component {

    constructor(props) {
        super(props);
        this.state = {cartData: Cart.getInstance().getItemsInCart()};
        this.removeFromCart = this.removeFromCart.bind(this);
        this.setQuantityCallback = this.setQuantityCallback.bind(this);
    }

    removeFromCart = (name) => {
        Cart.getInstance().removeFromCart(name);
        this.setState((prevState) => {
            return {
                cartData: Cart.getInstance().getItemsInCart()
            }
        });
    };

    setQuantityCallback = (name, quantity) => {
        Cart.getInstance().setQuantity(name, quantity);
        this.setState((prevState) => {
            return {
                cartData: Cart.getInstance().getItemsInCart()
            }
        });
    };

    render() {
        let cartSubtotal = Number(Cart.getInstance().total_cost).toFixed(2);

        return (
            <View style={styles.container}>
                <Text style={styles.title_style}>My Cart</Text>
                <FlatList
                    style={styles.flatlist_style}
                    data={this.state.cartData}
                    renderItem={({item}) =>
                        <OrderItemView
                            spname={item.spname}
                            spprice={item.spprice}
                            spquantity={item.spquantity}
                            removeFromCartFunction={this.removeFromCart}
                            setQuantityCallback={this.setQuantityCallback}
                        />
                    }
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
