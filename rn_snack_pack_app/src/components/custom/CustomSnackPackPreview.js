/**
 * @author Stephen Davis
 *
 * @description the preview for a custom snackpack
 */

import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';

export default class CustomSnackPackPreview extends Component {
    // display
    name;       // string
    price;      // number
    // metadata
    id;         // number
    navigation; // object
    // pass-through
    components; // list (snackpack-components)

    _openDetailedView = () => {
        this.props.navigation.navigate("CustomSnackPack", {
            name: this.props.name,
            price: this.props.price,
        });
    };

    render() {
        let price = Number(this.props.price).toFixed(2);
        return (
            <TouchableOpacity onPress={this._openDetailedView}>
                <View style={styles.container}>
                    <View style={styles.horizontal_container}>
                        <Text style={styles.name_style}>{this.props.name}</Text>
                        <Text style={styles.price_style}>${price}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 32,
        marginBottom: 6,
        marginRight: 6,
        //width: '100%',
        backgroundColor: '#fff'
    },

    horizontal_container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    name_style: {
        color: '#444',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'top',
        textTransform: 'none',
        padding: 4
    },

    price_style: {
        color: '#44aa44',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 2
    },
});