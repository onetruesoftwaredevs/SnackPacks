/**
 * @author Stephen Davis
 *
 * @description the container view for a custom snack-pack
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomSnackPackPriceView from "./CustomSnackPackPriceView";
import CustomSnackPackComponentPreview from "./CustomSnackPackComponentPreview";
import ScreenHeader from "../misc/ScreenHeader";
import BackButton from "../misc/BackButton";
import {global_stylesheet} from "../../stylesheet";

export default class CustomSnackPackView extends Component {
    // display
    name;       // string
    price;      // number (initial value)
    components; // list (snackpack components)
    // metadata
    id;         // number

    _addNewItems = () => {
        this.props.navigation.navigate("CustomSnackPackComponentView");
    };

    render() {
        return (
            <View style={global_stylesheet.screen_container}>
                <ScreenHeader title={this.props.navigation.state.params.name} navigation={this.props.navigation} isDefaultScreen={false}/>

                <ScrollView style={styles.scroll_container}>
                    <CustomSnackPackComponentPreview name={"meat"} price={1.00} quantity={2}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"cheese"} price={3.5} quantity={4}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"beans"} price={4.25} quantity={5}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"bread"} price={9.99} quantity={1}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"doritos"} price={6.75} quantity={8}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"beans"} price={4.20} quantity={4}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"snack"} price={1.00} quantity={2}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"chex mix"} price={3.5} quantity={4}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"pizza"} price={4.25} quantity={5}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"flatbread"} price={9.99} quantity={1}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"oreos"} price={6.75} quantity={8}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"bologna"} price={4.20} quantity={4}
                                                     navigation={this.props.navigation}/>

                    <TouchableOpacity onPress={this._addNewItems}>
                        <Text style={global_stylesheet.green_button_style}>Add New Items</Text>
                    </TouchableOpacity>
                </ScrollView>
                <View>
                    <CustomSnackPackPriceView price={this.props.navigation.state.params.price} quantity={1}/>

                    <BackButton navigation={this.props.navigation}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scroll_container: {
        marginBottom: 6
    },
});