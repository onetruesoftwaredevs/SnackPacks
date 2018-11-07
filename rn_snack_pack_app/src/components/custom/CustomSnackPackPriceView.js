/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack component prices
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class CustomSnackPackPriceView extends Component {
    // display
    subtotal;   // number
    // metadata
    id;         // number

    render() {
        return (
            <View style={styles.container}>
                /*price            value*/
                /*  quantity component  */
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