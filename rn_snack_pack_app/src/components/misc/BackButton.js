/**
 *
 * @author Stephen Davis
 *
 * @description the default back button for a screen
 *
 *
 * */

import React, {Component} from 'react';
import {TouchableOpacity, Alert, StyleSheet, Text, View, Image} from 'react-native';
import Cart from '../../function/Cart'
import {global_stylesheet} from "../../stylesheet";

export default class ScreenHeader extends Component {
    navigation; // object

    _goBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <TouchableOpacity style={global_stylesheet.back_button_style} onPress={this._goBack}>
                <Text style={global_stylesheet.back_style}>Back</Text>
            </TouchableOpacity>
        );
    }
}