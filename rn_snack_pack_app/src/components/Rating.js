/**
 * @author Stephen Davis
 *
 * @description
 */

import React, {Component} from 'react';
import StarRating from 'react-native-star-rating';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Rating extends Component {
    starCount; // the number of stars to give the rating

    render() {
        return (
            <StarRating fullStarColor={'gold'}
                        starSize={16}
                        disabled={true}
                        maxStars={5}
                        rating={this.props.starCount}
            />
        );
    }
}

