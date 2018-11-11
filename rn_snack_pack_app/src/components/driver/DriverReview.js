/**
 * @author Stephen Davis
 *
 * @description this is the view component to display a review given to a driver
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';

export default class DriverReview extends Component {
    description;

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.review_style}
                    editable={false}
                    multiline={true}
                    value={this.props.description}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        padding: 4,
        marginBottom: 8,
        backgroundColor: '#ffffff',
    },

    review_style: {
        color: '#444444',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
    }
});
