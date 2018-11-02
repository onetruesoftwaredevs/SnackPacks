/**
 * @author Stephen Davis
 *
 * @description this is the view component to display a review given
 */

import React, {Component} from 'react';
import {Alert, TouchableOpacity, StyleSheet, Text, TextInput, View} from 'react-native';
import Rating from "./Rating";
import DriverRating from "../../function/DriverRating";

export default class ReviewBuilderView extends Component {

    constructor(props) {
        super();
        this.state = {
            title_text: "insert title here",
            description_text: "insert description here",
        };
    }

    _submit = () => {
        let review_url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers?command=review&id=";
        review_url += this.props.navigation.state.params.driver_id;
        fetch(review_url, {
            method: "POST",
            body: {
                review: this.state.description_text,
            }
        });

        let rating_url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers?command=rating&id=";
        rating_url += this.props.navigation.state.params.driver_id;
        fetch(rating_url, {
            method: "POST",
            body: {
                rating: DriverRating.getInstance().getRating(),
            },
        });

        Alert.alert("Review submitted successfully", "thank you for submitting a review we appreciate your feedback");
        this.props.navigation.navigate("DriverProfile");
    };

    render() {
        let title_component = this.props.navigation.state.params.has_title ?
            (<View><Text style={styles.header_style}>Title:</Text>
                <TextInput onChangeText={(text) => this.setState({title_text: text})} value={this.state.title_text}
                           style={styles.field_style} editable={true} maxLength={32}/></View>) : (<View/>);

        return (
            <View style={styles.container}>
                <Text style={styles.title_style}>Leave Review</Text>
                {title_component}
                <Text style={styles.header_style}>Description:</Text>
                <TextInput
                    onChangeText={(text) => this.setState({description_text: text})}
                    value={this.state.description_text}
                    style={styles.field_style}
                    editable={true}
                    maxLength={128}
                />
                <View style={styles.horizontal_container}>
                    <Text style={styles.header_style}>Rating: </Text>
                    <Rating starCount={0} editable={true}/>
                </View>
                <TouchableOpacity onPress={this._submit} style={styles.button_style}>
                    <Text style={styles.submit_style}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        height: '100%',
        justifyContent: 'space-between'
    },

    horizontal_container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button_style: {
        width: '100%',
    },

    title_style: {
        color: '#444444',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
    },

    header_style: {
        color: '#444444',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
    },

    field_style: {
        color: '#444444',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
    },

    submit_style: {
        color: '#fdfdfd',
        backgroundColor: '#44aa44',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8
    },
});
