/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack allergies
 */

import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class ContentView extends Component {
    // display
    content;    // string

    _onPress = () => {
        Alert.alert('Content Information', 'This product contains ' + this.props.content);
    };

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this._onPress}>
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
