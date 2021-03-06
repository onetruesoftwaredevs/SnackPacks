/**
 * @author Stephen Davis
 *
 * @description the container view for a list of a users custom snack-packs
 */

import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import CustomSnackPackPreview from "../components/custom/CustomSnackPackPreview";
import {global_stylesheet} from "../stylesheet";
import ScreenHeader from "../components/misc/ScreenHeader";
import User from "../function/User";

export default class CustomSnackPackScreen extends Component {
    // display
    custom_snackpacks;  // list (snackpacks)

    constructor(props) {
        super(props);
        this.state = {isLoading: true, components: []};
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            this.setState({isLoading: true});
            let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snacks?command=list";
            fetch(url, {method: "GET"})
                .then(response => response.json())
                .then(responseJson => this.setState({components: responseJson, isLoading: false}));
        });

        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snacks?command=list";
        fetch(url, {method: "GET"})
            .then(response => response.json())
            .then(responseJson => this.setState({components: responseJson, isLoading: false}));
    }

    _createNew = () => {
        this.props.navigation.navigate("CustomSnackPackCreatorView");
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={global_stylesheet.screen_container}>
                    <Text style={global_stylesheet.loading_text}>Loading . . .</Text>
                </View>

            );
        }

        return (
            <View style={global_stylesheet.screen_container}>
                <View>
                    <ScreenHeader title={"My Custom SnackPacks"} navigation={this.props.navigation}
                                  isDefaultScreen={true}/>

                    {User.getInstance().getCustomSnackPacks().map((item, index) =>
                        <CustomSnackPackPreview
                            name={item.name}
                            price={User.getInstance().getCustomSnackPackPrice(item.name)}
                            navigation={this.props.navigation}
                            components={this.state.components}
                            id={index}
                        />)
                    }

                    <TouchableOpacity style={global_stylesheet.full_width_margin_style} onPress={this._createNew}>
                        <Text style={global_stylesheet.green_button_style}>Create new custom SnackPack</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
