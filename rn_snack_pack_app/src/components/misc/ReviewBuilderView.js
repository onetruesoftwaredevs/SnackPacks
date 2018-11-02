/**
 * @author Stephen Davis
 *
 * @description this is the view component to display a review given
 */

import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, TextInput, View} from 'react-native';
import Rating from "./Rating";

export default class Review extends Component {

    constructor(props) {
        super();
        this.state = {
            title_text: "insert title here",
            description_text: "insert description here",
        };
    }

    _submit = () => {
        this.props.navigation.navigate("DriverProfile");
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title_style}>Leave Review</Text>
                <Text style={styles.header_style}>Title:</Text>
                <TextInput
                    onChangeText={(text) => this.setState({title_text: text})}
                    value={this.state.title_text}
                    style={styles.field_style}
                    editable={true}
                    maxLength={32}
                />
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
