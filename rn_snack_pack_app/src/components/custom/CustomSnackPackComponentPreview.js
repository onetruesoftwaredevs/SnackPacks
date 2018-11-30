/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack component
 */

import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import NewQuantityComponent from "../misc/NewQuantityComponent";
import {global_stylesheet} from "../../stylesheet";
import User from "../../function/User";

export default class CustomSnackPackComponentPreview extends Component {
    // display
    name;       // string
    price;      // number
    quantity;   // number (initial value)
    calories;   // number
    allergens;  // list (string)

    // metadata
    id;             // number
    navigation;     // object
    parent_name;    // string
    parent;         // object

    constructor(props) {
        super(props);
        this.state = {quantity: props.quantity};
    }

    _displayDetailedView = () => {
        this.props.navigation.navigate("CustomSnackPackComponent", {
            name: this.props.name,
            price: this.props.price,
            quantity: this.state.quantity,
            calories: this.props.calories,
            allergens: this.props.allergens,
            onQuantityChanged: this._onQuantityChanged,
        });
    };

    _onQuantityChanged = (q) => {
        // add to custom snackpack here
        if (q === 0) {
            // remove
            User.getInstance().removeSnackFromCustomSnackPack(this.props.parent_name, this.props.name);
        } else if (q > 0) {
            // add, auto blocks so it can be called every time
            User.getInstance().addSnackToCustomSnackPack(this.props.parent_name, {
                _name: this.props.name,
                _price: this.props.price,
                _calories: this.props.calories,
                _allergens: this.props.allergens,
            });
            // set quantity
            User.getInstance().setSnackQuantityInCustomSnackPack(this.props.parent_name, this.props.name, q);
        }

        this.setState({quantity: q});
        this.props.parent.forceUpdate();
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
