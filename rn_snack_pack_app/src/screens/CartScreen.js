/**
 * @author Stephen Davis
 *
 * @description this is a view for the entire users cart
 */

import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
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

    _goToMenu = () => {
        this.props.navigation.navigate("Menu");
    };

    /*<FlatList
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
                    />*/

    render() {
        let cartSubtotal = Number(Cart.getInstance().total_cost).toFixed(2);

        return (
            <View style={global_stylesheet.screen_container}>
                <ScreenHeader title={"My Cart"} navigation={this.props.navigation} isDefaultScreen={true}/>
                <ScrollView style={global_stylesheet.scroll_container}>
                    {Cart.getInstance().getItemsInCart().map((item) =>
                        <OrderItemView
                            name={item.spname}
                            price={item.spprice}
                            parent={this}
                        />)
                    }
                    <TouchableOpacity style={global_stylesheet.full_width_margin_style} onPress={this._goToMenu}>
                        <Text style={global_stylesheet.blue_button_style}>Back to Menu</Text>
                    </TouchableOpacity>
                </ScrollView>
                <PaymentView subtotal={cartSubtotal} serviceFee={1.00}/>
            </View>
        );
    }
}
