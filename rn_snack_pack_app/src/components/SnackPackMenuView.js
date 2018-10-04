/**
 * @author Stephen Davis
 *
 * @description this is a view for each individual snack-pack
 */

import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import SnackPackView from "./SnackPackView";

export default class SnackPackMenuView extends Component {
    data;

    // TODO change this method to populate with actual data
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title_style}>Snack Packs</Text>
                <FlatList
                    style={styles.flatlist_style}
                    data={[
                        {key: 'sp1', spprice: 5.99, sprating: 2, spallergylist: [{key: 'Peanuts'}, {key: 'Soy'}]},
                        {key: 'sp2', spprice: 6.99, sprating: 3, spallergylist: [{key: 'Peanuts'}]},
                        {key: 'sp3', spprice: 7.99, sprating: 4, spallergylist: [{key: 'Soy'}]},
                        {key: 'sp4', spprice: 8.99, sprating: 5, spallergylist: []},
                        {key: 'sp5', spprice: 9.99, sprating: 1.5, spallergylist: [{key: 'Peanuts'}, {key: 'Soy'}]},
                        {key: 'sp6', spprice: 10.99, sprating: 2.5, spallergylist: [{key: 'Peanuts'}]},
                        {key: 'sp7', spprice: 2.99, sprating: 3.5, spallergylist: [{key: 'Soy'}]},

                    ]}
                    renderItem={({item}) => <SnackPackView
                        spname={item.key}
                        spprice={item.spprice}
                        sprating={item.sprating}
                        spallergylist={item.spallergylist}
                    />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
        width: '90%'
    },

    flatlist_style: {
        height: '50%'
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