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
import VotingComponent from "./VotingComponent";

export default class Review extends Component {
    title;  // string
    author; // string
    review; // string
    rating; // number

    render() {
        return (
            <View style={global_stylesheet.thick_basic_container}>
                <View style={global_stylesheet.horizontal_container_loose}>
                    <View style={global_stylesheet.horizontal_container_tight}>
                        <Text style={global_stylesheet.header_style}>{this.props.title}</Text>
                        <Text style={global_stylesheet.data_style}>- {this.props.author}</Text>
                    </View>
                    <NewRating size={12} rating={this.props.rating} enabled={false}/>
                </View>
                <View style={global_stylesheet.horizontal_container_loose}>
                    <Text style={styles.review_style}>{this.props.review}</Text>
                    <VotingComponent upvotes={10} downvotes={5}/>
                </View>
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
