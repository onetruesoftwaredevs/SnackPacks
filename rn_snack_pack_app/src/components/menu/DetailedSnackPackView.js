/**
 * @author Stephen Davis
 *
 * @description the container view for a snack-pack
 */

import React, {Component} from 'react';
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {global_stylesheet} from "../../stylesheet";
import ScreenHeader from "../misc/ScreenHeader";
import AllergyView from "../misc/AllergyView";
import ContentView from "../misc/ContentView";
import Review from "../misc/Review";

export default class DetailedSnackPackView extends Component {
    // display
    name;               // string
    price;              // number
    image;              // string
    quantity;           // number (initial value)
    allergens;          // list (string)
    contents;           // list (string)
    reviews;            // list (object);
    navigation;         // object
    parent;             // object
    id;                 // number

    constructor(props) {
        super(props);
        this.state = {quantity: props.navigation.state.params.quantity};
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            this.setState({quantity: this.props.navigation.state.params.quantity});
        });
    }

    _showReviewBuilder = () => {
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks?command=review&id=" + this.props.navigation.state.params.id;
        this.props.navigation.navigate("ReviewBuilder", {
            url: url
        });
    };

    render() {
        let props = this.props.navigation.state.params;
        let price = Number(props.price).toFixed(2);

        return (
            <View style={global_stylesheet.screen_container}>
                <ScrollView>
                    <ScreenHeader title={props.name} navigation={this.props.navigation} isDefaultScreen={false}/>

                    <View style={global_stylesheet.basic_container}>
                        <Image style={global_stylesheet.image_style} source={{uri: props.image}}/>
                    </View>

                    <View style={global_stylesheet.basic_container}>
                        <View style={global_stylesheet.horizontal_container_loose}>
                            <Text style={global_stylesheet.data_title_style}>Price</Text>
                            <Text style={global_stylesheet.data_style}>${price}</Text>
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
                    <View style={global_stylesheet.basic_container}>
                        <Text style={global_stylesheet.data_title_style}>Contents</Text>
                        <FlatList
                            horizontal={true}
                            data={props.contents}
                            keyExtractor={(item) => item}
                            extraData={this.state}
                            renderItem={({item}) => <ContentView content={item}/>}
                        />
                    </View>
                    <View style={global_stylesheet.basic_container}>
                        <View style={global_stylesheet.horizontal_container_loose}>
                            <Text style={global_stylesheet.data_title_style}>Reviews</Text>
                            <TouchableOpacity onPress={this._showReviewBuilder}>
                                <Text style={global_stylesheet.data_style}>Leave Review</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    {props.reviews.map((item, index) =>
                        <Review
                            title={item.title}
                            author={item.author}
                            rating={item.rating}
                            review={item.review}
                            showVotes={true}
                            upvotes={item.upvotes}
                            downvotes={item.downvotes}
                            id={props.id}
                            index={index}
                        />
                    )}
                </ScrollView>
            </View>
        );
    }
}
