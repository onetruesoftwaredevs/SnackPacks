/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack component
 */

import React, {Component} from 'react';
import {Alert, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import NewQuantityComponent from "../misc/NewQuantityComponent";

export default class CustomSnackPackComponentPreview extends Component {
    // display
    name;       // string
    price;      // number
    quantity;   // number (initial value)
    // metadata
    id;         // number
    navigation; // object

    constructor(props) {
        super();
        this.state = {quantity: props.quantity};
    }

    _displayDetailedView = () => {
        this.props.navigation.navigate("CustomSnackPackComponent", {
            name: this.props.name,
            price: this.props.price,
            quantity: this.state.quantity,
            allergens: ["rice", "beans", "toast"],
            onQuantityChanged: this._onQuantityChanged,
        });
    };

    _onQuantityChanged = (q) => {
        this.setState({quantity: q});
    };

    render() {
        let price = Number(this.props.price).toFixed(2);
        return (
            <TouchableOpacity style={styles.container} onPress={this._displayDetailedView}>
                <View style={styles.horizontal_container}>
                    <Text style={styles.name_style}>{this.props.name}</Text>
                    <Text style={styles.price_style}>${price}</Text>
                </View>
                <NewQuantityComponent quantity={this.state.quantity} onIncrease={this._onQuantityChanged}
                                      onDecrease={this._onQuantityChanged}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 6,
        marginRight: 6,
        backgroundColor: '#fff'
    },

    horizontal_container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        padding: 4
    },

    price_style: {
        color: '#444',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 2
    },
});