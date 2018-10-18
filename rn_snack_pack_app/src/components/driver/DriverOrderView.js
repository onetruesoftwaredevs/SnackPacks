/**
 *
 * @author Stephen Davis
 *
 * @description a view for the drivers to see their current orders and take new ones
 *
 */

import React, {Component} from 'react';
import {Platform, FlatList, StyleSheet, Text, View} from 'react-native';
import NutritionView from "../menu/NutritionView";
import OrderInformationView from "./OrderInformationView";

export default class DriverOrderView extends Component {
    name; // string

    constructor(props) {
        super();
        this.state = {my_orders: [], available_orders: []};
    }

    componentDidMount() {
        // change the url and uncomment to bind
        /*return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks?command=list", {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => this.setState({
                my_orders: responseJson
            }));
        */
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.name_style}>{this.props.name}</Text>
                <View>
                    <Text style={styles.title_style}>My Orders</Text>
                    <FlatList
                        horizontal={true}
                        data={this.state.my_orders}
                        renderItem={({item}) =>
                            <OrderInformationView
                                name={item.name}
                                number={item.number}
                                order_status={item.order_status}
                                address={item.address}
                            />
                        }
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        padding: 4,
        backgroundColor: '#DEDEDE'
    },

    horizontal_container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    name_style: {
        color: '#444',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4
    },

    title_style: {
        color: '#444',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4
    },
});