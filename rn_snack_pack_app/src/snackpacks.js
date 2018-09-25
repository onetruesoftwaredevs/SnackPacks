// snackpacks.js
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SnackPackView from './components/SnackPackView'

export default class SnackPacks extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SnackPackView name={"snack-packs-test-0"}></SnackPackView>
                <SnackPackView name={"snack-packs-test-1"}></SnackPackView>
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