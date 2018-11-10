/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack. this view displays
 * all of the information that can be viewed about a snack-pack including
 * price, health information, and customer ratings and reviews
 */

import React, {Component} from 'react';
import {Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Rating from "../misc/Rating";
import Cart from "../../function/Cart";
import {global_stylesheet} from "../../stylesheet";
import AllergyView from "../misc/AllergyView";
import NewQuantityComponent from "../misc/NewQuantityComponent";

export default class SnackPackView extends Component {
    spname;         // string
    sprating;       // number
    spprice;        // number
    spallergylist;  // list(string)
    spimage;        // string

    constructor(props) {
        super();
        this.state = {quantity: Cart.getInstance().getQuantity(props.spname)};
    }

    _pressed = () => {
        Alert.alert("Component Selected", "this component has been selected");
    };

    _onIncrease = (quantity) => {
        if (quantity === 1) {
            // item was added to the cart
            Cart.getInstance().addToCart(this.props.spname, this.props.spprice);
        }
        else {
            // item is already inside the cart
            Cart.getInstance().setQuantity(this.props.spname, quantity);
        }

        // set the state to force an update
        this.setState({quantity: quantity});
    };

    _onDecrease = (quantity) => {
        if (quantity < 1) {
            // item was removed from the cart
            Cart.getInstance().removeFromCart(this.props.spname);
        }
        else {
            Cart.getInstance().setQuantity(this.props.spname, quantity);
        }
        // set the state to force an update
        this.setState({quantity: quantity});
    };

    render() {
        let price = Number(this.props.spprice).toFixed(2);
        return (
            <View style={global_stylesheet.basic_container}>
                <TouchableOpacity onPress={this._pressed}>
                    <View style={global_stylesheet.horizontal_container_loose}>
                        <Text style={global_stylesheet.data_title_style}>{this.props.spname}</Text>
                        <Text style={global_stylesheet.data_style}>${price}</Text>
                    </View>
                    <Image style={styles.image_style} source={{uri: this.props.spimage}}/>
                    <View style={global_stylesheet.horizontal_container_loose}>
                        <FlatList
                            horizontal={true}
                            data={this.props.spallergylist}
                            renderItem={({item}) => <AllergyView allergy={item}/>}
                            keyExtractor={(item) => item}
                        />
                        <Rating starCount={this.props.sprating} editable={false}/>
                    </View>
                </TouchableOpacity>
                <NewQuantityComponent quantity={Cart.getInstance().getQuantity(this.props.spname)}
                                      navigation={this.props.navigation} onIncrease={this._onIncrease}
                                      onDecrease={this._onDecrease}/>
            </View>
        );
    }
}

const window = Dimensions.get('window');
const width = window.width - 6;
const height = width * 9 / 16;

const styles = StyleSheet.create({
    image_style: {
        width: width,
        height: height,
    },
});