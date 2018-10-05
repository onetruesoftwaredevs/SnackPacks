/**
 * @author Stephen Davis
 *
 * @description this is a view for each individual snack-pack
 */

import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import SnackPackView from "./SnackPackView";

export default class SnackPackMenuView extends Component {
    spdata; // the snack-pack data json object

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title_style}>Snack Packs</Text>
                <FlatList
                    style={styles.flatlist_style}
                    data={this.props.spdata}
                    renderItem={({item}) => <SnackPackView
                        spname={item._name}
                        spprice={item._cost}
                        sprating={3}
                        spallergylist={item._allergens}
                    />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
        width: '90%',
    },

    flatlist_style: {
        height: '45%'
    },

    title_style: {
        color: '#444',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
    },
});