/**
 * @author Stephen Davis
 *
 * @description this is the view component to display a review given
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {global_stylesheet} from "../../stylesheet";
import NewRating from "./NewRating";
import VotingComponent from "./VotingComponent";

export default class Review extends Component {
    title;      // string
    author;     // string
    review;     // string
    rating;     // number

    showVotes;  // boolean
    upvotes;    // number
    downvotes;  // number
    id;         // number
    index;      // number

    renderVotingComponent() {
        if (this.props.showVotes) {
            return (<VotingComponent upvotes={this.props.upvotes} downvotes={this.props.downvotes} id={this.props.id}
                                     index={this.props.index}/>);
        }
    }

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
                    {this.renderVotingComponent()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
