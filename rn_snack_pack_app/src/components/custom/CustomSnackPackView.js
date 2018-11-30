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
import User from "../../function/User";

export default class CustomSnackPackView extends Component {
    // display
    name;       // string
    price;      // number (initial value)
    components; // list (snackpack components)
    // metadata
    id;         // number

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            this.forceUpdate();
        });
    }

    _addNewItems = () => {
        this.props.navigation.navigate("CustomSnackPackComponentView", {
            components: this.props.navigation.state.params.components,
            parent_name: this.props.navigation.state.params.name
        });
    };

    render() {
        return (
            <View style={global_stylesheet.screen_container}>
                <ScreenHeader title={this.props.navigation.state.params.name} navigation={this.props.navigation}
                              isDefaultScreen={false}/>

                <ScrollView style={global_stylesheet.scroll_container}>
                    {User.getInstance().getCustomSnackPack(this.props.navigation.state.params.name).snacks.map((item) =>
                        <CustomSnackPackComponentPreview
                            name={item._name}
                            price={Number(item._price)}
                            calories={Number(item._calories)}
                            allergens={item._allergens}
                            quantity={item._quantity}
                            navigation={this.props.navigation}
                            parent_name={this.props.navigation.state.params.name}
                            parent={this}

                        />)
                    }

                    <View style={{marginBottom: 6}}>
                        <TouchableOpacity style={global_stylesheet.full_width_margin_style} onPress={this._addNewItems}>
                            <Text style={global_stylesheet.green_button_style}>Add New Items</Text>
                        </TouchableOpacity>
                    </View>

                    <CustomSnackPackPriceView
                        price={User.getInstance().getCustomSnackPackPrice(this.props.navigation.state.params.name)}
                        quantity={1}/>
                </ScrollView>
            </View>
        );
    }
}