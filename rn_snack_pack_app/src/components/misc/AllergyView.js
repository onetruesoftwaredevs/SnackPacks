/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack allergies
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import NewQuantityComponent from "../misc/NewQuantityComponent";

export default class AllergyView extends Component {
    // display
    allergy;    // string

    _onPress = (text) => {
        Alert.alert('Allergy Information', 'This product contains ' + `${text}`);
    };

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this._onPress.bind(this.props.allergy)}>
                <Text style={styles.text_style}>{this.props.allergy}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: '#F44'
    },

    text_style: {
        color: '#FFF',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4
    },
});
