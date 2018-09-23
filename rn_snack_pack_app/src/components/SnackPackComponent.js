// SnackPackComponent.js
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class SnackPackComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>{this.props.name}</Text>
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