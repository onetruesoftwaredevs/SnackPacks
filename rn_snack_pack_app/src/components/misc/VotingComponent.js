/**
 *
 * @author Stephen Davis
 *
 * @description the default voting component
 *
 *
 * */

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {global_stylesheet} from "../../stylesheet";

export default class VotingComponent extends Component {


    vote;       // number (1 is upvote, 0 is no vote, -1 is downvote);
    upvotes;    // number
    downvotes;  // number
    id;         // number
    index;      // number
    onUpvote;   // function
    onDownvote; // function

    constructor(props) {
        super(props);
        this.state = {
            upvotes: props.upvotes,
            downvotes: props.downvotes,
            vote: 0 //props.vote,
        }
    }

    // TODO: refactor to execute only when the vote was changed from an initial 0 and the screen was navigated away from

    _on_upvote = () => {
        if (this.state.vote === -1) {
            this.setState({downvotes: this.state.downvotes - 1});
        }
        if (this.state.vote === 1) {
            this.setState({upvotes: this.state.upvotes - 1, vote: 0});
        } else {
            let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks";
            url += "?command=upvote";
            url += "&id=" + this.props.id;
            url += "&rev=" + this.props.index;

            fetch(url, {method: "GET"});

            this.setState({upvotes: this.state.upvotes + 1, vote: 1});
        }
    };

    _on_downvote = () => {
        if (this.state.vote === 1) {
            this.setState({upvotes: this.state.upvotes - 1});
        }
        if (this.state.vote === -1) {
            this.setState({downvotes: this.state.downvotes - 1, vote: 0});
        } else {
            let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks";
            url += "?command=downvote";
            url += "&id=" + this.props.id;
            url += "&rev=" + this.props.index;

            fetch(url, {method: "GET"});
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