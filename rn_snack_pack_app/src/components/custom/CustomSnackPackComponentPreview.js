/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack component
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class CustomSnackPackComponentPreview extends Component {
    // display
    name;       // string
    price;      // number
    quantity;   // number
    // metadata
    id;         // number

    render() {
        return (
            <View style={styles.container}>
                /*name                  */
                /*+    -        quantity*/
                /*                 price*/
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        width: '100%',
    }
});