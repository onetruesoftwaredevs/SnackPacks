// snackpacks.js
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SnackPackComponent from './components/SnackPackComponent'

export default class SnackPacks extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SnackPackComponent name={"snack-packs-test-0"}></SnackPackComponent>
                <SnackPackComponent name={"snack-packs-test-1"}></SnackPackComponent>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});