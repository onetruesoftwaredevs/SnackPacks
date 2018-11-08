/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack allergies
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import NewQuantityComponent from "../misc/NewQuantityComponent";

export default class ContentView extends Component {
    // display
    content;    // string

    _onPress = (text) => {
        Alert.alert('Content Information', 'This product contains ' + `${text}`);
    };

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this._onPress.bind(this.props.content)}>
                <Text style={styles.text_style}>{this.props.content}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: '#4Af'
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
