/**
 *
 * @author Stephen Davis
 *
 * @description view for information about a driver
 *
 */

import React, {Component} from 'react';
import {Alert, TouchableOpacity, ScrollView, FlatList, StyleSheet, Text, View} from 'react-native';
import Rating from "../misc/Rating";
import Review from "../misc/Review";
import Driver from '../../function/Driver';
import DriverReview from "./DriverReview";

export default class DriverProfile extends Component {

    driver;

    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            data: null,
        };
    }

    componentDidMount() {
        this._refresh();
    }


    loadData(responseJson) {
        for (let i = 0; i < responseJson.length; i++) {
            let driver = responseJson[i];
            if (driver._id === Number(this.props.navigation.state.params.number)) {
                this.driver = new Driver(
                    driver._name,
                    driver._id,
                    driver._phone,
                    driver._carmodel,
                    driver._carmake,
                    driver._rating,
                    driver._status,
                    driver._reviews
                );
                this.setState({isLoading: false});
                return;
            }
        }
        Alert.alert("Something went wrong", "please try again later");
    }

    _refresh = () => {
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers?command=list";
        fetch(url, {method: "GET"})
            .then(response => response.json())
            .then(responseJson => this.loadData(responseJson))
    };

    _goBack = () => {
        this.props.navigation.navigate(this.props.navigation.state.params.last_screen);
    };

    _leaveReview = () => {
        this.props.navigation.navigate("ReviewBuilderView", {
            has_title: false,
            driver_id: this.props.navigation.state.params.number,
        });
    };

    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.loading_text}>Loading . . .</Text>
                </View>
            );
        }

        let review = this.props.navigation.state.params.isReviewable ? (<TouchableOpacity onPress={this._leaveReview}>
            <Text style={styles.review_style}>Review</Text></TouchableOpacity>) : (<View/>);

        let reviews = this.driver.getReviews().length > 0 ?
            (<View>
                <FlatList
                    horizontal={false}
                    data={this.driver.getReviews()}
                    keyExtractor={(item) => item}
                    extraData={this.state}
                    renderItem={({item}) =>
                        <DriverReview
                            description={item._value}
                        />
                    }
                />
            </View>) :
            (<View>
                <Text style={styles.loading_text}>No reviews for this driver</Text>
            </View>);

        return (
            <ScrollView style={styles.container}>
                <View style={styles.horizontal_container_space}>
                    <Text style={styles.title_style}>{this.driver.getName()}</Text>
                    {review}
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.data_style}>Number: </Text>
                    <Text style={styles.data_style}>{this.driver.getId()}</Text>
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.data_style}>Phone: </Text>
                    <Text style={styles.data_style}>{this.driver.getPhone()}</Text>
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.data_style}>Car Model: </Text>
                    <Text style={styles.data_style}>{this.driver.getCarModel()}</Text>
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.data_style}>Car Make: </Text>
                    <Text style={styles.data_style}>{this.driver.getCarMake()}</Text>
                </View>
                <View style={styles.horizontal_container}>
                    <Text style={styles.data_style}>Rating: </Text>
                    <Rating starCount={this.driver.getRating()} editable={false}/>
                </View>
                <Text style={styles.data_style}>Reviews:</Text>
                {reviews}
                <TouchableOpacity onPress={this._goBack} style={styles.button_style}>
                    <Text style={styles.back_style}>Back</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        //justifyContent: "space-between",
        padding: 0,
    },

    loading_text: {
        flex: 1,
        color: '#444',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
    },

    horizontal_container_space: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    horizontal_container: {
        flexDirection: 'row',
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
