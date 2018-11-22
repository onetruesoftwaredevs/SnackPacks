/**
 * @author Stephen Davis
 *
 * @description the creator view for a custom snackpack
 */

import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, View, Text, TextInput} from 'react-native';
import {global_stylesheet} from "../../stylesheet";
import ScreenHeader from "../misc/ScreenHeader";

export default class CustomSnackPackCreatorView extends Component {

    _submit = () => {
        // TODO: submit new custom snackpack to the database
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={global_stylesheet.screen_container}>
                <View>
                    <ScreenHeader title={"Create new SnackPack"} navigation={this.props.navigation}
                                  isDefaultScreen={false}/>
                    <View style={global_stylesheet.basic_container}>
                        <Text style={global_stylesheet.data_title_style}>Name</Text>
                    </View>
                    <View style={global_stylesheet.basic_container}>
                        <TextInput
                            multiline={false}
                            editable={true}
                            placeholder={"Enter the Custom SnackPack name here"}
                            placeholderTextColor={"#AAA"}
                            style={global_stylesheet.data_style}
                        />
                    </View>
                    <TouchableOpacity style={global_stylesheet.full_width_margin_style} onPress={this._submit}>
                        <Text style={global_stylesheet.green_button_style}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}