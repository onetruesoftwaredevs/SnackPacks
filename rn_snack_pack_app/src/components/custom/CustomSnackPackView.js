/**
 * @author Stephen Davis
 *
 * @description the container view for a custom snack-pack
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import CustomSnackPackPriceView from "./CustomSnackPackPriceView";
import CustomSnackPackComponentPreview from "./CustomSnackPackComponentPreview";
import ScreenHeader from "../misc/ScreenHeader";
import BackButton from "../misc/BackButton";

export default class CustomSnackPackView extends Component {
    // display
    name;       // string
    price;      // number (initial value)
    components; // list (snackpack components)
    // metadata
    id;         // number

    _addNewItems = () => {
        this.props.navigation.navigate("CustomSnackPackComponentView");
    };

    render() {
        return (
            <View style={styles.container}>
                <ScreenHeader title={this.props.navigation.state.params.name} navigation={this.props.navigation}/>

                <ScrollView style={styles.scroll_container}>
                    <CustomSnackPackComponentPreview name={"meat"} price={1.00} quantity={2}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"cheese"} price={3.5} quantity={4}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"beans"} price={4.25} quantity={5}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"bread"} price={9.99} quantity={1}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"doritos"} price={6.75} quantity={8}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"beans"} price={4.20} quantity={4}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"snack"} price={1.00} quantity={2}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"chex mix"} price={3.5} quantity={4}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"pizza"} price={4.25} quantity={5}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"flatbread"} price={9.99} quantity={1}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"oreos"} price={6.75} quantity={8}
                                                     navigation={this.props.navigation}/>
                    <CustomSnackPackComponentPreview name={"bologna"} price={4.20} quantity={4}
                                                     navigation={this.props.navigation}/>

                    <TouchableOpacity onPress={this._addNewItems}>
                        <Text style={styles.item_style}>Add New Items</Text>
                    </TouchableOpacity>
                </ScrollView>
                <View>
                    <CustomSnackPackPriceView price={this.props.navigation.state.params.price} quantity={1}/>

                    <BackButton navigation={this.props.navigation}/>
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