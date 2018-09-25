/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack. this view displays
 * all of the information that can be viewed about a snack-pack including
 * price, health information, and customer ratings and reviews
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class SnackPackView extends Component {
    /* the name of the snack pack */
    spname;

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>{this.props.spname}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        flex: 1,
        justifyContent: 'center',
        color: 'blue',
        fontSize: 30,
    }
});