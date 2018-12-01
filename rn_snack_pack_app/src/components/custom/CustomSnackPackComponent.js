/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack component
 */

import React, {Component} from 'react';
import {FlatList, Text, View} from 'react-native';
import {global_stylesheet} from "../../stylesheet";
import ScreenHeader from "../misc/ScreenHeader";
import AllergyView from "../misc/AllergyView";

export default class CustomSnackPackComponent extends Component {
    // display
    name;               // string
    price;              // number
    quantity;           // number (initial value)
    calories;           // number
    allergens;          // list (string)
    navigation;         // object

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
                        <View style={global_stylesheet.horizontal_container_loose}>
                            <Text style={global_stylesheet.data_title_style}>Calories</Text>
                            <Text style={global_stylesheet.data_style}>{props.calories}</Text>
                        </View>
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
