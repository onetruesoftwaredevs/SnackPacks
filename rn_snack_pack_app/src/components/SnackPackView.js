/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack. this view displays
 * all of the information that can be viewed about a snack-pack including
 * price, health information, and customer ratings and reviews
 */

import React, {Component} from 'react';
import {TouchableOpacity, Alert, StyleSheet, Text, View, Image} from 'react-native';
import NutritionView from "./NutritionView";
import PriceView from "./PriceView";
import Rating from "./Rating";

export default class SnackPackView extends Component {
    spname;   // the name of the snack-pack
    sprating; // the rating of the snack-pack
    spprice;  // the price of the snack-pack

    _onImagePressed() {
        Alert.alert('image was pressed', 'test')
    }

    _onRatingPressed() {
        Alert.alert('rating was pressed', 'test')
    }

    _onAddToCartPressed() {
        Alert.alert('added to cart was pressed', 'test')
    }

    _onNutritionPressed() {
        Alert.alert('nutrition was pressed', 'test')
    }

    _onNamePressed() {
        Alert.alert('name was pressed', 'test')
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._onImagePressed}>
                    <Image style={styles.image_style} source={require('./image.png')}></Image>
                </TouchableOpacity>
                <View style={styles.information_bar}>
                    <TouchableOpacity onPress={this._onNamePressed}>
                        <Text style={styles.name_style}>{this.props.spname}</Text>
                    </TouchableOpacity>
                    <View style={styles.rating_style}>
                        <TouchableOpacity onPress={this._onRatingPressed}>
                            <Rating starCount={this.props.sprating}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.information_bar}>

                    <View style={styles.information_bar}>
                        <NutritionView allergy='Peanuts'/>
                        <NutritionView allergy='Soy'/>
                    </View>

                    <PriceView price={this.props.spprice}/>
                </View>
                <TouchableOpacity onPress={this._onAddToCartPressed}>
                    <Text style={styles.add_to_cart_style}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 4,
        width: '90%',
        borderWidth: 0,
        //backgroundColor: 'blue',
    },

    image_style: {
        width: 316,
        height: 200,
    },

    information_bar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EEEEEE'
    },

    name_style: {
        color: '#444',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        paddingTop: 4,
        paddingBottom: 4,
    },

    rating_style: {
        justifyContent: 'center'
    },

    add_to_cart_style: {
        color: '#FFF',
        backgroundColor: '#4488AA',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        paddingTop: 4,
        paddingBottom: 4,
    }
});