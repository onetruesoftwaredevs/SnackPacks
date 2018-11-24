/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack component
 */

import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import NewQuantityComponent from "../misc/NewQuantityComponent";
import {global_stylesheet} from "../../stylesheet";

export default class CustomSnackPackComponentPreview extends Component {
    // display
    name;       // string
    price;      // number
    quantity;   // number (initial value)
    // metadata
    id;         // number
    navigation; // object

    constructor(props) {
        super();
        this.state = {quantity: props.quantity};
    }

    _displayDetailedView = () => {
        this.props.navigation.navigate("CustomSnackPackComponent", {
            name: this.props.name,
            price: this.props.price,
            quantity: this.state.quantity,
            allergens: ["rice", "beans", "toast"],
            onQuantityChanged: this._onQuantityChanged,
        });
    };

    _onQuantityChanged = (q) => {
        this.setState({quantity: q});
    };

    render() {
        let price = Number(this.props.price).toFixed(2);
        return (
            <TouchableOpacity style={global_stylesheet.basic_container} onPress={this._displayDetailedView}>
                <View style={global_stylesheet.horizontal_container_loose}>
                    <Text style={global_stylesheet.data_title_style}>{this.props.name}</Text>
                    <Text style={global_stylesheet.data_style}>${price}</Text>
                </View>
                <NewQuantityComponent quantity={this.state.quantity} onIncrease={this._onQuantityChanged}
                                      onDecrease={this._onQuantityChanged}/>
            </TouchableOpacity>
        );
    }
}
