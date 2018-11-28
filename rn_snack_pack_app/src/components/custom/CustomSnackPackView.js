/**
 * @author Stephen Davis
 *
 * @description the container view for a custom snack-pack
 */

import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import CustomSnackPackPriceView from "./CustomSnackPackPriceView";
import CustomSnackPackComponentPreview from "./CustomSnackPackComponentPreview";
import ScreenHeader from "../misc/ScreenHeader";
import {global_stylesheet} from "../../stylesheet";

export default class CustomSnackPackView extends Component {
    // display
    name;       // string
    price;      // number (initial value)
    components; // list (snackpack components)
    // metadata
    id;         // number

    _addNewItems = () => {
        this.props.navigation.navigate("CustomSnackPackComponentView", {components: this.props.navigation.state.params.components});
    };

    render() {
        return (
            <View style={global_stylesheet.screen_container}>
                <ScreenHeader title={this.props.navigation.state.params.name} navigation={this.props.navigation}
                              isDefaultScreen={false}/>

                <ScrollView style={global_stylesheet.scroll_container}>
                    <CustomSnackPackComponentPreview name={"meat"} price={1.00} quantity={2}
                                                     navigation={this.props.navigation}/>
                    <View style={{marginBottom: 6}}>
                        <TouchableOpacity style={global_stylesheet.full_width_margin_style} onPress={this._addNewItems}>
                            <Text style={global_stylesheet.green_button_style}>Add New Items</Text>
                        </TouchableOpacity>
                    </View>

                    <CustomSnackPackPriceView price={this.props.navigation.state.params.price} quantity={1}/>
                </ScrollView>
            </View>
        );
    }
}