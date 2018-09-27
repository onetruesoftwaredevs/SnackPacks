/**
 *
 * @author Stephen Davis
 *
 * @description displays allergy information related to nutrition
 *
 */

import React, {Component} from 'react';
import {Alert, TouchableOpacity, StyleSheet, Text, View} from 'react-native';

export default class NutritionView extends Component {
    allergy; // the allergy being displayed

    _onPress(text) {
        Alert.alert('Allergy Information', 'This product contains ' + `${text}`);
    }

    render() {
        return (
            <TouchableOpacity onPress={this._onPress.bind(this, this.props.allergy)}>
                <View style={styles.container}>
                    <Text style={styles.nutrition_style}>{this.props.allergy}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        padding: 2,
        backgroundColor: '#ff4444',

    },

    nutrition_style: {
        color: '#ffffff',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        // different for ios and android research proper way to use before implementing
        //fontFamily: 'normal',
        textAlignVertical: 'center',
        textTransform: 'none',
    }
});