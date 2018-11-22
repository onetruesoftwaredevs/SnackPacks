/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack component
 */

import React, {Component} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import BackButton from "../misc/BackButton";
import {global_stylesheet} from "../../stylesheet";
import ScreenHeader from "../misc/ScreenHeader";
import NewQuantityComponent from "../misc/NewQuantityComponent";
import AllergyView from "../misc/AllergyView";
import ContentView from "../misc/ContentView";

export default class CustomSnackPackComponent extends Component {
    // display
    name;               // string
    price;              // number
    image;              // string
    quantity;           // number (initial value)
    allergens;          // list (string)
    navigation;         // object
    onQuantityChanged;  // function

    render() {
        let props = this.props.navigation.state.params;
        let price = Number(props.price).toFixed(2);

        return (
            <View style={global_stylesheet.screen_container}>
                <View>
                    <ScreenHeader title={props.name} navigation={this.props.navigation} isDefaultScreen={false}/>
                    <View style={global_stylesheet.basic_container}>
                        <View style={global_stylesheet.horizontal_container_loose}>
                            <Text style={global_stylesheet.data_title_style}>Price</Text>
                            <Text style={global_stylesheet.data_style}>${price}</Text>
                        </View>
                    </View>
                    <View style={global_stylesheet.basic_container}>
                        <View style={global_stylesheet.horizontal_container_loose}>
                            <Text style={global_stylesheet.data_title_style}>Quantity</Text>
                            <Text style={global_stylesheet.data_style}>{props.quantity}</Text>
                        </View>
                    </View>
                    <View style={global_stylesheet.basic_container}>
                        <Image style={global_stylesheet.image_style} source={{uri: this.props.image}}/>
                    </View>
                    <View style={global_stylesheet.basic_container}>
                        <Text style={global_stylesheet.data_title_style}>Allergy Information</Text>
                        <FlatList
                            horizontal={true}
                            data={props.allergens}
                            keyExtractor={(item) => item}
                            extraData={this.state}
                            renderItem={({item}) => <AllergyView allergy={item}/>}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
