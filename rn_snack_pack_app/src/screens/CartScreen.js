/**
 * @author Stephen Davis
 *
 * @description this is a view for the entire users cart
 */

import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import OrderItemView from "../components/cart/OrderItemView";
import PaymentView from "../components/cart/PaymentView";
import Cart from '../function/Cart'
import ScreenHeader from "../components/misc/ScreenHeader";
import {global_stylesheet} from "../stylesheet";

export default class CartScreen extends Component {

    constructor(props) {
        super();
        this.state = {lastItemRemoved: "null"}
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            this.setState({lastItemRemoved: "null"});
        });
    }

    render() {
        let cartSubtotal = Number(Cart.getInstance().total_cost).toFixed(2);

        return (
            <View style={global_stylesheet.screen_container}>
                <View>
                    <ScreenHeader title={"My Cart"} navigation={this.props.navigation}/>
                    <FlatList
                        data={Cart.getInstance().getItemsInCart()}
                        keyExtractor={(item) => item.spname}
                        extraData={this.state}
                        renderItem={({item}) =>
                            <OrderItemView
                                name={item.spname}
                                price={item.spprice}
                                parent={this}
                            />
                        }
                    />
                </View>
                <PaymentView subtotal={cartSubtotal} deliveryFee={1.00}/>
            </View>
        );
    }
}
