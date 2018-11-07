/**
 * @author Stephen Davis
 *
 * @description the container view for a custom snack-pack
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class CustomSnackPackView extends Component {
    // display
    name;       // string
    components; // list (snackpack components)
    // metadata
    id;         // number

    render() {
        return (
            <View style={styles.container}>
                /*name                  */
                /*component preview     */
                /*component preview     */
                /*component preview     */
                /*component preview     */
                /*add new component     */
                /*                      */
                /*                      */
                /*price component       */
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