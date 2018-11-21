/**
 *
 * @author Stephen Davis
 *
 * @description the default rating component
 *
 *
 * */

import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {global_stylesheet} from "../../stylesheet";

export default class NewRating extends Component {

    size;       // number
    rating;     // number
    enabled;    // boolean

    constructor(props) {
        super();
        this.state = {rating: props.rating};
    }

    _onPress = (index) => {
        this.setState({rating: index});
    };

    styleRating(index) {
        let filled = index <= this.state.rating;
        let _style = [filled ? styles.filled_star : styles.empty_star, {
            width: this.props.size,
            height: this.props.size
        }];

        if (this.props.enabled) {
            return (<TouchableOpacity onPress={this._onPress.bind(this, index)} style={_style}/>);
        }
        else {
            return (<View style={_style}/>);
        }
    }

    render() {
        return (
            <View style={[global_stylesheet.horizontal_container_tight, {paddingLeft: 6}]}>
                {this.styleRating(1)}
                {this.styleRating(2)}
                {this.styleRating(3)}
                {this.styleRating(4)}
                {this.styleRating(5)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    filled_star: {
        backgroundColor: "#FD0",
        marginVertical: 6,
        marginRight: 6,
    },

    empty_star: {
        backgroundColor: "#DDD",
        marginVertical: 6,
        marginRight: 6,
    }
});