/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack. this view displays
 * all of the information that can be viewed about a snack-pack including
 * price, health information, and customer ratings and reviews
 */

import React, {Component} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Cart from "../../function/Cart";
import {global_stylesheet} from "../../stylesheet";
import AllergyView from "../misc/AllergyView";
import NewQuantityComponent from "../misc/NewQuantityComponent";
import NewRating from "../misc/NewRating";

export default class SnackPackView extends Component {
    spname;         // string
    sprating;       // number
    spprice;        // number
    spallergylist;  // list(string)
    spcontentlist;  // list(string)
    spimage;        // string
    spkey;          // the key of the snack-pack
    spreviews;      // list(object)
    navigation;     // object
    parent;

    constructor(props) {
        super();
        this.state = {quantity: Cart.getInstance().getQuantity(props.spname)};
    }

    _pressed = () => {
        this.props.navigation.navigate("DetailedSnackPackView", {
            name: this.props.spname,
            price: this.props.spprice,
            image: this.props.spimage,
            quantity: this.state.quantity,
            allergens: this.props.spallergylist,
            contents: this.props.spcontentlist,
            reviews: this.props.spreviews,
            parent: this.props.parent,
        })
    };

    _onIncrease = (quantity) => {
        if (quantity === 1) {
            // item was added to the cart
            Cart.getInstance().addToCart(this.props.spname, this.props.spprice, this.props.spkey);
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
                    <Image style={global_stylesheet.image_style} source={{uri: this.props.spimage}}/>
                    <View style={global_stylesheet.horizontal_container_loose}>
                        <FlatList
                            horizontal={true}
                            extraData={this.state}
                            data={this.props.spallergylist}
                            renderItem={({item}) => <AllergyView allergy={item}/>}
                            keyExtractor={(item) => item}
                        />
                        <NewRating size={12} rating={this.props.sprating} enabled={false}/>
                    </View>
                </TouchableOpacity>
                <NewQuantityComponent quantity={this.state.quantity} navigation={this.props.navigation}
                                      onIncrease={this._onIncrease} onDecrease={this._onDecrease}/>
            </View>
        );
    }
}
