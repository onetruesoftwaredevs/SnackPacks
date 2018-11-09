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
    spname;         // the name of the snack-pack
    sprating;       // the rating of the snack-pack
    spprice;        // the price of the snack-pack
    spallergylist;  // a the list of allergies contained in this snack-pack
    spimage;

    _onImagePressed() {
        Alert.alert('image was pressed', 'test')
    }

    _onRatingPressed() {
        Alert.alert('rating was pressed', 'test')
    }

    _onNutritionPressed() {
        Alert.alert('nutrition was pressed', 'test')
    }

    _onNamePressed() {
        Alert.alert('name was pressed', 'test')
    }

    /*name         price*/
    /*image             */
    /*image             */
    /*image             */
    /*allergies   rating*/

    /*quantity component*/

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
        //this.props.parent.forceUpdate();
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
        //this.props.parent.forceUpdate();
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

    // legacy code
    /*
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._onImagePressed}>
                    <Image style={styles.image_style} source={{uri: this.props.spimage}}></Image>
                </TouchableOpacity>
                <View style={styles.information_bar}>
                    <TouchableOpacity onPress={this._onNamePressed}>
                        <Text style={styles.name_style}>{this.props.spname}</Text>
                    </TouchableOpacity>
                    <View style={styles.rating_style}>
                        <TouchableOpacity onPress={this._onRatingPressed}>
                            <Rating starCount={this.props.sprating} editable={false}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.information_bar}>
                    <FlatList
                        horizontal={true}
                        data={this.props.spallergylist}
                        renderItem={({item}) => <NutritionView allergy={item}/>}
                        keyExtractor={(item) => item}
                    />
                    <PriceView price={this.props.spprice}/>
                </View>
                <QuantityComponent
                    spname={this.props.spname}
                    spprice={this.props.spprice}
                    defaultText={'Add to Cart'}
                    defaultTextSize={18}
                    parent={this}
                />
            </View>
        );
    }
    */
}

const window = Dimensions.get('window');
const width = window.width - 6;
const height = width * 9 / 16;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 8,
        borderWidth: 0,
    },

    image_style: {
        width: width,
        height: height,
    },

    information_bar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EEEEEE',
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
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        paddingTop: 8,
        paddingBottom: 8,
    }
});