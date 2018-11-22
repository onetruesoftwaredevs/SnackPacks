/**
 * @author Stephen Davis
 *
 * @description the container view for a list of a users custom snack-packs
 */

import React, {Component} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import CustomSnackPackPreview from "../components/custom/CustomSnackPackPreview";
import {global_stylesheet} from "../stylesheet";
import ScreenHeader from "../components/misc/ScreenHeader";

export default class CustomSnackPackScreen extends Component {
    // display
    custom_snackpacks;  // list (snackpack components)

    _createNew = () => {
        this.props.navigation.navigate("CustomSnackPackCreatorView");
    };

    render() {
        return (
            <View style={global_stylesheet.screen_container}>
                <View>
                    <ScreenHeader title={"My Custom SnackPacks"} navigation={this.props.navigation}
                                  isDefaultScreen={true}/>

                    <CustomSnackPackPreview name={"steve's sandwiches"} price={1.00}
                                            navigation={this.props.navigation}/>
                    <CustomSnackPackPreview name={"steve's sandwiches"} price={1.00}
                                            navigation={this.props.navigation}/>
                    <CustomSnackPackPreview name={"steve's sandwiches"} price={1.00}
                                            navigation={this.props.navigation}/>
                    <CustomSnackPackPreview name={"steve's sandwiches"} price={1.00}
                                            navigation={this.props.navigation}/>
                    <CustomSnackPackPreview name={"steve's sandwiches"} price={1.00}
                                            navigation={this.props.navigation}/>

                    <TouchableOpacity style={global_stylesheet.full_width_margin_style} onPress={this._createNew}>
                        <Text style={global_stylesheet.green_button_style}>Create new custom SnackPack</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
