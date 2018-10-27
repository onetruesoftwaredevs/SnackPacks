/**
 *
 * @author Stephen Davis
 *
 * @description screen for drivers to view a list of orders
 *
 */

import React, {Component} from 'react';
import {TouchableOpacity, Alert, StyleSheet, Text, View, Image, FlatList} from 'react-native';
import OrderPreview from "./OrderPreview";
import NutritionView from "../menu/NutritionView";


export default class OrdersView extends Component {

    constructor(props) {
        super();
        this.state = {
            dataSource: [],
            title: props.navigation.state.params.title,
        }
    }

    refresh() {
        return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers?command=list", {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => this.setState({
                dataSource: responseJson
            }));
    }

    _goBack = () => {
        this.props.navigation.navigate('DriversScreen');
    };

    componentDidMount() {
        return this.refresh();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.name_style}>{this.state.title}</Text>
                <FlatList
                    horizontal={false}
                    data={this.state.dataSource}
                    keyExtractor={(item) => item}
                    extraData={this.state}
                    renderItem={({item}) =>
                        <OrderPreview
                            name={item._driver}
                            number={item._id}
                            order_status={"not delivered"}
                            payment_info={item._paymentInfo}
                            address={item._address}
                            subtotal={item._subtotal}
                            tax={item._tax}
                            total={item._total}
                            last_screen={'OrdersView'}
                            navigation={this.props.navigation}
                        />
                    }
                />
                <TouchableOpacity style={styles.button_style} onPress={this._goBack}>
                    <Text style={styles.back_style}>Back</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    horizontal_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    name_style: {
        color: '#444',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4
    },

    map_style: {
        height: '75%',
    },

    button_style: {
        width: '100%',
    },

    back_style: {
        color: '#fdfdfd',
        backgroundColor: '#44AAff',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 6
    },
});

