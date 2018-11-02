/**
 * @author Stephen Davis
 *
 * @description
 */

import React, {Component} from 'react';
import StarRating from 'react-native-star-rating';
import {Platform, StyleSheet, Text, View} from 'react-native';
import DriverRating from "../../function/DriverRating";

export default class Rating extends Component {
    starCount; // the number of stars to give the rating
    editable;

    constructor(props)
    {
        super();
        this.state = {starCount: props.starCount};
    }

    onStarRatingPress(rating) {
        DriverRating.getInstance().setRating(rating);
        this.setState({
            starCount: rating
        });
    }

    render() {
        return (
            <StarRating fullStarColor={'gold'}
                        starSize={16}
                        disabled={!this.props.editable}
                        maxStars={5}
                        rating={this.state.starCount}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
        );
    }
}

