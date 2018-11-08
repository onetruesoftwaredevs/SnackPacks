/**
 *
 * @author Stephen Davis
 *
 * @description the header for a screen
 *
 *
 * */

import React, {Component} from 'react';
import {TouchableOpacity, Alert, StyleSheet, Text, View, Image} from 'react-native';
import Cart from '../../function/Cart'
import {global_stylesheet} from "../../stylesheet";

export default class ScreenHeader extends Component {
    title;      // string
    navigation; // object

    _openDrawer = () => {
        this.props.navigation.openDrawer();
    };

    render() {
        return (
            <View style={global_stylesheet.horizontal_container_tight}>
                <TouchableOpacity onPress={this._openDrawer}>
                    <Text style={global_stylesheet.menu_style}>></Text>
                </TouchableOpacity>
                <Text style={global_stylesheet.title_style}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({


});