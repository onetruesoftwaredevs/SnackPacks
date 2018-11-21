/**
 * @author Stephen Davis
 *
 * @description this is the view component to display a review given
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Rating from "./Rating";
import {global_stylesheet} from "../../stylesheet";
import NewRating from "./NewRating";

export default class Review extends Component {
    review; // the review the author wrote
    rating; // the rating of the review

    render() {
        return (
            <View style={global_stylesheet.thick_basic_container}>
                <NewRating size={12} rating={this.props.rating} enabled={false}/>
                <Text style={styles.review_style}>{this.props.review}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        padding: 16,
        backgroundColor: '#ffffff',
    },

    title_bar: {
        flex: 0,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    author_style: {
        color: '#444444',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
    },

    title_style: {
        color: '#444444',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
    },

    review_style: {
        color: '#444444',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
    }
});
