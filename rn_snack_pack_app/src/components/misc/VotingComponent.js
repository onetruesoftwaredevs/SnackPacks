/**
 *
 * @author Stephen Davis
 *
 * @description the default voting component
 *
 *
 * */

import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {global_stylesheet} from "../../stylesheet";

export default class NewRating extends Component {


    vote;       // number (1 is upvote, 0 is no vote, -1 is downvote);
    upvotes;    // number
    downvotes;  // number
    onUpvote;   // function
    onDownvote; // function

    constructor(props) {
        super();
        this.state = {
            upvotes: props.upvotes,
            downvotes: props.downvotes,
            vote: 0 //props.vote,
        }
    }

    _on_upvote = () => {
        if (this.state.vote === -1) {
            this.setState({downvotes: this.state.downvotes - 1});
        }
        if (this.state.vote === 1) {
            this.setState({upvotes: this.state.upvotes - 1, vote: 0});
        }
        else {
            this.setState({upvotes: this.state.upvotes + 1, vote: 1});
        }
    };

    _on_downvote = () => {
        if (this.state.vote === 1) {
            this.setState({upvotes: this.state.upvotes - 1});
        }
        if (this.state.vote === -1) {
            this.setState({downvotes: this.state.downvotes - 1, vote: 0});
        }
        else {
            this.setState({downvotes: this.state.downvotes + 1, vote: -1});
        }
    };

    render() {
        let upstyle = styles.up_arrow;
        if (this.state.vote === 1) upstyle = [upstyle, {borderBottomColor: "#0A4"}];
        let downstyle = styles.down_arrow;
        if (this.state.vote === -1) downstyle = [downstyle, {borderTopColor: "#F40"}];

        return (
            <View style={global_stylesheet.horizontal_container_tight}>
                <TouchableOpacity onPress={this._on_upvote} style={upstyle}/>
                <View style={{paddingHorizontal: 6}}>
                    <Text style={global_stylesheet.data_style}>{this.state.upvotes - this.state.downvotes}</Text>
                </View>
                <TouchableOpacity onPress={this._on_downvote} style={downstyle}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    up_arrow: {
        top: 6,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 9,
        borderRightWidth: 9,
        borderBottomWidth: 18,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#DDD'
    },

    down_arrow: {
        top: 6,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 9,
        borderRightWidth: 9,
        borderTopWidth: 18,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#DDD'
    }
});