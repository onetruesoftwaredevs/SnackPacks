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
                    {this.props.navigation.state.params.components.map((item) =>
                        <CustomSnackPackComponentPreview
                            name={item._name}
                            price={Number(item._price)}
                            calories={Number(item._calories)}
                            allergens={item._allergens}
                            quantity={0}
                            navigation={this.props.navigation}
                        />
                    )}
                </ScrollView>
            </View>
        );
    }
}