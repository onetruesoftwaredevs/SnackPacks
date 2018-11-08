/**
 * @author Stephen Davis
 *
 * @description the container view for a custom snack-pack
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import CustomSnackPackPriceView from "./CustomSnackPackPriceView";
import CustomSnackPackComponentPreview from "./CustomSnackPackComponentPreview";

export default class CustomSnackPackView extends Component {
    // display
    name;       // string
    price;      // number (initial value)
    components; // list (snackpack components)
    // metadata
    id;         // number

    _goBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.name_style}>{this.props.navigation.state.params.name}</Text>

                <ScrollView style={styles.scroll_container}>
                    <CustomSnackPackComponentPreview name={"meat"} price={1.00} quantity={2}/>
                    <CustomSnackPackComponentPreview name={"cheese"} price={3.5} quantity={4}/>
                    <CustomSnackPackComponentPreview name={"beans"} price={4.25} quantity={5}/>
                    <CustomSnackPackComponentPreview name={"bread"} price={9.99} quantity={1}/>
                    <CustomSnackPackComponentPreview name={"doritos"} price={6.75} quantity={8}/>
                    <CustomSnackPackComponentPreview name={"beans"} price={4.20} quantity={4}/>

                    <TouchableOpacity>
                        <Text style={styles.item_style}>Add New Items</Text>
                    </TouchableOpacity>
                </ScrollView>
                <View>
                    <CustomSnackPackPriceView price={this.props.navigation.state.params.price} quantity={1}/>

                    <TouchableOpacity style={styles.button_style} onPress={this._goBack}>
                        <Text style={styles.back_style}>Back</Text>
                    </TouchableOpacity>
                </View>
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

    scroll_container: {
        marginBottom: 6
    },

    name_style: {
        color: '#444',
        backgroundColor: '#fff',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'top',
        textTransform: 'none',
        padding: 4,
        marginBottom: 6,
        marginRight: 6,
        marginTop: 6
    },

    back_style: {
        color: '#fdfdfd',
        backgroundColor: '#44AAff',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8
    },

    item_style: {
        color: '#fdfdfd',
        backgroundColor: '#4A4',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8,
        marginRight: 6,
    },
});