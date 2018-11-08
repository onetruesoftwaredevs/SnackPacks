/**
 * @author Stephen Davis
 *
 * @description the container view for a list of a users custom snack-packs
 */

import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import CustomSnackPackPreview from "../components/custom/CustomSnackPackPreview";

export default class CustomSnackPackScreen extends Component {
    // display
    custom_snackpacks;  // list (snackpack components)

    // TODO: implement this method go to custom snack pack creation screen
    _createNew = () => {
        Alert.alert("test", "testing");
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title_style}>My Custom SnackPacks</Text>

                    <CustomSnackPackPreview name={"steve's sandwiches"} price={1.00} navigation={this.props.navigation}/>
                    <CustomSnackPackPreview name={"steve's sandwiches"} price={1.00} navigation={this.props.navigation}/>
                    <CustomSnackPackPreview name={"steve's sandwiches"} price={1.00} navigation={this.props.navigation}/>
                    <CustomSnackPackPreview name={"steve's sandwiches"} price={1.00} navigation={this.props.navigation}/>
                    <CustomSnackPackPreview name={"steve's sandwiches"} price={1.00} navigation={this.props.navigation}/>

                </View>

                <TouchableOpacity style={styles.button_style} onPress={this._createNew}>
                    <Text style={styles.create_style}>Create new custom SnackPack</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
    },

    title_style: {
        color: '#444',
        backgroundColor: '#fff',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
        marginBottom: 6,
        marginRight: 6,
        marginTop: 6
    },

    message_style: {
        flex: 1,
        color: '#dd4444',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
    },

    button_style: {
        width: '100%',
    },

    create_style: {
        color: '#fdfdfd',
        backgroundColor: '#44AA44',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8
    },
});