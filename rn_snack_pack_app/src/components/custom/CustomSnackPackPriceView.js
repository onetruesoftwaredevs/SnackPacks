/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack component prices
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import NewQuantityComponent from "../misc/NewQuantityComponent";
import {global_stylesheet} from "../../stylesheet";

export default class CustomSnackPackPriceView extends Component {
    // display
    price;      // number
    quantity;   // number (initial)
    // metadata
    id;         // number

    render() {
        let price = Number(this.props.price).toFixed(2);
        let subtotal = Number(Number(this.props.price) * Number(this.props.quantity)).toFixed(2);
        return (
            <View style={global_stylesheet.basic_container}>
                <View style={global_stylesheet.horizontal_container_loose}>
                    <Text style={global_stylesheet.data_title_style}>Price</Text>
                    <Text style={global_stylesheet.data_style}>${price}</Text>
                </View>
                <View style={global_stylesheet.horizontal_container_loose}>
                    <Text style={global_stylesheet.data_title_style}>Quantity</Text>
                    <Text style={global_stylesheet.data_style}>{this.props.quantity}</Text>
                </View>
                <View style={global_stylesheet.horizontal_container_loose}>
                    <Text style={global_stylesheet.data_title_style}>Subtotal</Text>
                    <Text style={global_stylesheet.data_style}>{subtotal}</Text>
                </View>
            </View>
        );
    }
}