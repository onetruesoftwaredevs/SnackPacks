/**
 *
 * @author Stephen Davis
 *
 * @description view for information about a driver
 *
 */

import React, {Component} from 'react';
import {TouchableOpacity, ScrollView, FlatList, StyleSheet, Text, View} from 'react-native';
import Rating from "../misc/Rating";
import Review from "../misc/Review";

export default class DriverProfile extends Component {

    constructor(props) {
        super();
        this.state = {dataSource: [],};
    }

    _goBack = () => {
        this.props.navigation.navigate(this.props.navigation.state.params.last_screen);
    };

    _leaveReview = () => {
        this.props.navigation.navigate("ReviewBuilderView");
    };

    //
    render() {
        // temp until database is finished

        let review = this.props.navigation.state.params.isReviewable ? (<TouchableOpacity onPress={this._leaveReview}>
            <Text style={styles.review_style}>Review</Text></TouchableOpacity>) : (<View/>);

        return (
            <View style={styles.container}>
                <View style={styles.horizontal_container}>
                    <Text style={styles.title_style}>{this.props.navigation.state.params.name}</Text>
                    {review}
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.data_style}>Number: </Text>
                    <Text style={styles.data_style}>{this.props.navigation.state.params.number}</Text>
                </View>
                <Text style={styles.data_style}>Reviews:</Text>
                <Review
                    author={"steve"}
                    title={"Tasty"}
                    review={"this was a very delicious product"}
                    rating={4}
                />
                <Review
                    author={"jay"}
                    title={"yummy"}
                    review={"this was a very tasty product"}
                    rating={5}
                />
                <Review
                    author={"chen"}
                    title={"delicious"}
                    review={"this was a very yummy product"}
                    rating={3}
                />
                <TouchableOpacity onPress={this._goBack} style={styles.button_style}>
                    <Text style={styles.back_style}>Back</Text>
                </TouchableOpacity>
            </View>
        );
        /*
        // real
        return (
            <View style={styles.container}>
                <Text style={styles.title_style}>{this.props.navigation.state.params.name}</Text>
                <View style={styles.horizontal_container}>
                    <Text style={styles.data_style}>Number: </Text>
                    <Text style={styles.data_style}>{this.props.navigation.state.params.number}</Text>
                </View>
                <Text style={styles.data_style}>Reviews:</Text>
                <FlatList
                    horizontal={false}
                    data={this.state.dataSource}
                    keyExtractor={(item) => item}
                    extraData={this.state}
                    renderItem={({item}) =>
                        <Review
                            author={item.author}
                            title={item.title}
                            review={item.review}
                            rating={item.rating}
                        />
                    }
                />
                <TouchableOpacity onPress={this._goBack} style={styles.button_style}>
                    <Text style={styles.back_style}>Back</Text>
                </TouchableOpacity>
            </View>
        );
        */
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 0,
    },

    horizontal_container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    flatlist_style: {
        height: '30%'
    },

    title_style: {
        color: '#444',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
    },

    data_style: {
        color: '#444',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
    },

    button_style: {
        width: '100%',
    },

    review_style: {
        color: '#44AAff',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8
    },

    back_style: {
        color: '#fdfdfd',
        backgroundColor: '#44AAff',
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
