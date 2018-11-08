/**
 * @author Stephen Davis
 *
 * @description this is a view for each individual snack-pack
 */

import React, {Component} from 'react';
import {FlatList, Alert, StyleSheet, Text, View} from 'react-native';
import SnackPackView from "../components/menu/SnackPackView";
import Menu from "../function/Menu";
import Driver from "../function/Driver";
import ScreenHeader from "../components/misc/ScreenHeader";
import {global_stylesheet} from "../stylesheet";

export default class MenuScreen extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            dataSource: [],
        };
    }

    loadData(responseJson) {
        Menu.getInstance().setData(responseJson);
        this.setState({
            isLoading: false,
            dataSource: responseJson
        });
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            this.setState({dataSource: this.state.dataSource});
        });

        return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks?command=list", {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => this.loadData(responseJson));
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={global_stylesheet.screen_container}>
                    <Text style={global_stylesheet.loading_text}>Loading Screen</Text>
                </View>
            );
        }

        return (
            <View style={global_stylesheet.screen_container}>
                <ScreenHeader title={"SnackPacks"} navigation={this.props.navigation}/>
                <FlatList
                    data={Menu.getInstance().getData()}
                    extraData={this.state}
                    keyExtractor={(item) => item._name}
                    renderItem={({item}) => <SnackPackView
                        spname={item._name}
                        spprice={item._cost}
                        sprating={3}
                        spallergylist={item._allergens}
                        spimage={item.image_path}
                    />}
                />
            </View>
        );
    }
}