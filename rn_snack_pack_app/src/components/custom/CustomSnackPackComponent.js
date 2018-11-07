/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack component
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class CustomSnackPackComponent extends Component {
    // display
    name;       // string
    price;      // number
    image;      // string
    quantity;   // number (initial value)

    // pass-through
    allergens;  // list (string)
    contents;   // list (string)

    render() {
        return (
            <View style={styles.container}>
                /*                  */
                /*      image       */
                /*                  */
                /*name         price*/
                /*quantity component*/
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
    }
});