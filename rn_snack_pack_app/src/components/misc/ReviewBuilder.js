/**
 * @author Stephen Davis
 *
 * @description the view for building a review
 */

import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {global_stylesheet} from "../../stylesheet";
import ScreenHeader from "./ScreenHeader";
import NewRating from "./NewRating";

export default class ReviewBuilder extends Component {
    navigation;

    constructor(props) {
        super();
        this.state = {title: "", review: "", rating: 0}
    }

    _submitReview = () => {
        // TODO: implement integration
        Alert.alert("Review", "Title: " + this.state.title + "\nReview: " + this.state.review + "\nRating: " + this.state.rating);
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={global_stylesheet.screen_container}>
                <View>
                    <ScreenHeader title={"Leave Review"} navigation={this.props.navigation} isDefaultScreen={false}/>
                    <View style={global_stylesheet.basic_container}>
                        <Text style={global_stylesheet.data_title_style}>Title</Text>
                    </View>
                    <View style={global_stylesheet.basic_container}>
                        <TextInput
                            multiline={false}
                            value={this.state.title}
                            onChangeText={(value) => this.setState({title: value})}
                            editable={true}
                            placeholder={"Insert title here"}
                            placeholderTextColor={"#AAA"}
                            style={global_stylesheet.data_style}
                        />
                    </View>
                    <View style={global_stylesheet.basic_container}>
                        <Text style={global_stylesheet.data_title_style}>Review</Text>
                    </View>
                    <View style={global_stylesheet.basic_container}>
                        <TextInput
                            multiline={true}
                            value={this.state.review}
                            onChangeText={(value) => this.setState({review: value})}
                            editable={true}
                            placeholder={"Insert review here"}
                            placeholderTextColor={"#AAA"}
                            style={global_stylesheet.data_style_thin}
                        />
                    </View>
                    <View style={global_stylesheet.basic_container}>
                        <View style={global_stylesheet.horizontal_container_loose}>
                            <Text style={global_stylesheet.data_title_style}>Rating</Text>
                            <View style={{justifyContent: 'center'}}>
                                <NewRating size={16} rating={this.state.rating} enabled={true}
                                           onPress={(index) => this.setState({rating: index})}/>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this._submitReview}>
                        <Text style={global_stylesheet.green_button_style}>Submit Review</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
