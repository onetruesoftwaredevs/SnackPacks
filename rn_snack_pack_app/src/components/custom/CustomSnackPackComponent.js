/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack component
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import BackButton from "../misc/BackButton";
import {global_stylesheet} from "../../stylesheet";
import ScreenHeader from "../misc/ScreenHeader";

export default class CustomSnackPackComponent extends Component {
    // display
    name;       // string
    price;      // number
    image;      // string
    quantity;   // number (initial value)
    allergens;  // list (string)
    contents;   // list (string)
    navigation; // object

    /*name              */
    /*price             */
    /*quantity          */
    /*image             */
    /*allergens         */
    /*contents          */
    /*                  */
    /*back              */

    render() {
        let props = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <ScreenHeader title={props.name} navigation={this.props.navigation}/>

                <BackButton navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
    }
});