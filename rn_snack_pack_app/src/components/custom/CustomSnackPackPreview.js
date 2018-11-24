/**
 * @author Stephen Davis
 *
 * @description the preview for a custom snackpack
 */

import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {global_stylesheet} from "../../stylesheet";
import NewQuantityComponent from "../misc/NewQuantityComponent";

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
        this.props.navigation.navigate("CustomSnackPack", {
            name: this.props.name,
            price: this.props.price,
        });
    };

    // TODO: integrate with functionality and server
    render() {
        let price = Number(this.props.price).toFixed(2);
        return (
            <TouchableOpacity onPress={this._openDetailedView}>
                <View style={global_stylesheet.basic_container}>
                    <View style={global_stylesheet.horizontal_container_loose}>
                        <Text style={global_stylesheet.data_title_style}>{this.props.name}</Text>
                        <Text style={global_stylesheet.data_style}>${price}</Text>
                    </View>
                    <NewQuantityComponent quantity={0} navigation={this.props.navigation}/>
                </View>
            </TouchableOpacity>

        );
    }
}

