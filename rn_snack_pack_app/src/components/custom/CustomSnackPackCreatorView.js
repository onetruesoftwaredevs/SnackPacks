/**
 * @author Stephen Davis
 *
 * @description the creator view for a custom snackpack
 */

import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {global_stylesheet} from "../../stylesheet";
import ScreenHeader from "../misc/ScreenHeader";
import User from "../../function/User";

export default class CustomSnackPackCreatorView extends Component {

    constructor(props) {
        super(props);
        this.state = {name: ""};
    }

    _submit = () => {
        User.getInstance().createCustomSnackPack(this.state.name);
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
                            value={this.state.name}
                            onChangeText={(value) => this.setState({name: value})}
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