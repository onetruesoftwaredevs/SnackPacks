/**
 * @author Stephen Davis
 *
 * @description this is a view for the order information of a snack-pack item
 *
 */

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Cart from '../../function/Cart.js'
import NewQuantityComponent from "../misc/NewQuantityComponent";
import {global_stylesheet} from "../../stylesheet";

export default class OrderItemView extends Component {
    name;       // string
    price;      // number
    parent;     // object
    
    constructor(props) {
        super();
        this.state = {quantity: Cart.getInstance().getQuantity(props.name)};
    }

    _onIncrease = (quantity) => {
        if (quantity === 1) {
            // item was added to the cart
            Cart.getInstance().addToCart(this.props.name, this.props.price);
        }
        else {
            // item is already inside the cart
            Cart.getInstance().setQuantity(this.props.name, quantity);
        }

        // set the state to force an update
        this.setState({quantity: quantity});
        this.props.parent.forceUpdate();
    };

    _onDecrease = (quantity) => {
        if (quantity < 1) {
            // item was removed from the cart
            Cart.getInstance().removeFromCart(this.props.name);
        }
        else {
            Cart.getInstance().setQuantity(this.props.name, quantity);
        }
        // set the state to force an update
        this.setState({quantity: quantity});
        this.props.parent.forceUpdate();
    };

    render() {
        let price = Number(this.props.price).toFixed(2);

        return (
            <View style={global_stylesheet.basic_container}>
                <View style={global_stylesheet.horizontal_container_loose}>
                    <Text style={global_stylesheet.header_style}>{this.props.name}</Text>
                    <Text style={global_stylesheet.data_style}>${price}</Text>
                </View>
                <NewQuantityComponent quantity={this.state.quantity} onIncrease={this._onIncrease}
                                      onDecrease={this._onDecrease}/>
            </View>
        );
    }
}


