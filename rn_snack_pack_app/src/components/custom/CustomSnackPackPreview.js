/**
 * @author Stephen Davis
 *
 * @description the preview for a custom snackpack
 */

import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {global_stylesheet} from "../../stylesheet";
import NewQuantityComponent from "../misc/NewQuantityComponent";
import Cart from "../../function/Cart";

export default class CustomSnackPackPreview extends Component {
    // display
    name;       // string
    price;      // number
    // metadata
    id;         // number
    navigation; // object
    // pass-through
    components; // list (snackpack-components)

    _openDetailedView = () => {
        this.props.navigation.navigate("CustomSnackPackView", {
            name: this.props.name,
            price: this.props.price,
            components: this.props.components
        });
    };

    _onIncrease = (q) => {
        if (q === 1) {
            // add
            Cart.getInstance().addToCart(this.props.name, this.props.price, this.props.index, true);
        } else {
            // update
            Cart.getInstance().setQuantity(this.props.name, q, true);
        }

        this.forceUpdate();
    };

    _onDecrease = (q) => {
        if (q === 0) {
            // remove
            Cart.getInstance().removeFromCart(this.props.name, true);
        } else {
            // update
            Cart.getInstance().setQuantity(this.props.name, q, true);
        }

        this.forceUpdate();
    };

    render() {
        let price = Number(this.props.price).toFixed(2);
        return (
            <TouchableOpacity onPress={this._openDetailedView}>
                <View style={global_stylesheet.basic_container}>
                    <View style={global_stylesheet.horizontal_container_loose}>
                        <Text style={global_stylesheet.data_title_style}>{this.props.name}</Text>
                        <Text style={global_stylesheet.data_style}>${price}</Text>
                    </View>
                    <NewQuantityComponent quantity={Cart.getInstance().getQuantity(this.props.name, true)}
                                          navigation={this.props.navigation} onIncrease={this._onIncrease}
                                          onDecrease={this._onDecrease}/>
                </View>
            </TouchableOpacity>

        );
    }
}

