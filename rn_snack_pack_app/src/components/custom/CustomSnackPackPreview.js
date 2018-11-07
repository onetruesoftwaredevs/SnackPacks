/**
 * @author Stephen Davis
 *
 * @description the preview for a custom snackpack
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class CustomSnackPackPreview extends Component {
    // display
    name;       // string
    price;      // number
    // metadata
    id;         // number
    // pass-through
    components; // list (snackpack-components)

    render() {
        return (
            <View style={styles.container}>
                /*                      */
                /*name             price*/
                /*                      */
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