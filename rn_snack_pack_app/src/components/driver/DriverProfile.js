/**
 *
 * @author Stephen Davis
 *
 * @description view for information about a driver
 *
 */

import React, {Component} from 'react';
import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Review from "../misc/Review";
import Driver from '../../function/Driver';
import {global_stylesheet} from "../../stylesheet";
import ScreenHeader from "../misc/ScreenHeader";
import NewRating from "../misc/NewRating";

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
        this._goBack();
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
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks?command=review&id=" + this.driver.getId();
        this.props.navigation.navigate("ReviewBuilder", {
            url: url
        });
    };

    renderReviewButton = () => {
        return this.props.navigation.state.params.isReviewable ? (
                <TouchableOpacity onPress={this._leaveReview}>
                    <Text style={styles.review_style}>Review</Text>
                </TouchableOpacity>)
            : (<View/>);
    };

    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text style={global_stylesheet.loading_text}>Loading . . .</Text>
                </View>
            );
        }

        let reviews = this.driver.getReviews().length > 0 ?
            (<View>
                {this.driver.getReviews().map((item) =>
                    <Review
                        title={item.title}
                        author={item.author}
                        review={item.review}
                        rating={Number(item.rating)}
                        upvotes={Number(item.upvotes)}
                        downvotes={Number(item.downvotes)}
                    />)
                }
            </View>) :
            (<View>
                <Text style={global_stylesheet.loading_text}>No reviews for this driver</Text>
            </View>);

        return (
            <View style={global_stylesheet.screen_container}>
                <ScreenHeader title={this.driver.getName()} navigation={this.props.navigation} isDefaultScreen={false}/>

                <ScrollView>
                    <Field title={"Number"} value={this.driver.getId()}/>
                    <Field title={"Phone"} value={this.driver.getPhone()}/>
                    <Field title={"Car Model"} value={this.driver.getCarModel()}/>
                    <Field title={"Car Make"} value={this.driver.getCarMake()}/>

                    <View style={global_stylesheet.basic_container}>
                        <View style={global_stylesheet.horizontal_container_loose}>
                            <Text style={global_stylesheet.data_title_style}>Rating </Text>
                            <View style={{justifyContent: 'center'}}>
                                <NewRating size={16} rating={this.driver.getRating()} enabled={false}/>
                            </View>
                        </View>
                    </View>

                    <View style={global_stylesheet.basic_container}>
                        <View style={global_stylesheet.horizontal_container_loose}>
                            <Text style={global_stylesheet.data_title_style}>Reviews</Text>
                            {this.renderReviewButton()}
                        </View>
                    </View>

                    {reviews}
                </ScrollView>
            </View>
        );
    }

}

class Field extends Component {
    title;  // string
    value;  // string

    render() {
        return (
            <View style={global_stylesheet.thick_basic_container}>
                <View style={global_stylesheet.horizontal_container_loose}>
                    <Text style={global_stylesheet.data_title_style}>{this.props.title} </Text>
                    <Text style={global_stylesheet.data_style}>{this.props.value}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        padding: 0,
    },

    review_style: {
        color: '#4AF',
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
