/**
 * @author Stephen Davis
 *
 * @description this is the view component to display a review given
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Rating from "./Rating";

export default class Review extends Component {
    author; // the review author
    title;  // the title of the review
    review; // the review the author wrote
    rating; // the rating of the review

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title_bar}>
                    <Text style={styles.title_style}>{this.props.title}</Text>
                    <Rating starCount={this.props.rating}/>
                </View>
                <Text style={styles.author_style}>{this.props.author}</Text>
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
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        // different for ios and android research proper way to use before implementing
        //fontFamily: 'normal',
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
        // different for ios and android research proper way to use before implementing
        //fontFamily: 'normal',
        textAlignVertical: 'center',
        textTransform: 'none',
    },

    review_style: {
        color: '#444444',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'justify',
        textDecorationLine: 'none',
        // different for ios and android research proper way to use before implementing
        //fontFamily: 'normal',
        textAlignVertical: 'center',
        textTransform: 'none',
    }
});
