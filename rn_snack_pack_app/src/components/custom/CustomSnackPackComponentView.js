/**
 * @author Stephen Davis
 *
 * @description the container view for a list of a users custom snack-packs
 */

import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import ScreenHeader from "../misc/ScreenHeader";
import CustomSnackPackComponentPreview from "./CustomSnackPackComponentPreview";
import {global_stylesheet} from "../../stylesheet";

export default class CustomSnackPackComponentView extends Component {
    // display
    components;  // list (snackpack components)


    render() {
        return (
            <View style={global_stylesheet.screen_container}>
                <ScreenHeader title={"All Components"} navigation={this.props.navigation} isDefaultScreen={false}/>

                <ScrollView style={global_stylesheet.scroll_container}>
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
                </ScrollView>
            </View>
        );
    }
}