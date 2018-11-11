/**
 *
 * @author Stephen Davis
 *
 * @description the default back button for a screen
 *
 *
 * */

import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {global_stylesheet} from "../../stylesheet";

export default class ScreenHeader extends Component {
    navigation; // object

    _goBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <TouchableOpacity style={global_stylesheet.full_width_style} onPress={this._goBack}>
                <Text style={global_stylesheet.back_style}>Back</Text>
            </TouchableOpacity>
        );
    }
}