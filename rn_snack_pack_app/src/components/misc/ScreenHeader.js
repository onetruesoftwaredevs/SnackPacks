/**
 *
 * @author Stephen Davis
 *
 * @description the header for a screen
 *
 *
 * */

import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {global_stylesheet} from "../../stylesheet";

export default class ScreenHeader extends Component {
    title;              // string
    navigation;         // object
    isDefaultScreen;    // boolean

    _openDrawer = () => {
        if (this.props.isDefaultScreen) {
            this.props.navigation.openDrawer();
        }
        else {
            this.props.navigation.goBack();
        }
    };

    render() {
        let button_text = this.props.isDefaultScreen ? ">" : "<";

        return (
            <View style={global_stylesheet.horizontal_container_tight}>
                <TouchableOpacity onPress={this._openDrawer}>
                    <Text style={global_stylesheet.menu_style}>{button_text}</Text>
                </TouchableOpacity>
                <Text style={global_stylesheet.title_style}>{this.props.title}</Text>
            </View>
        );
    }
}
