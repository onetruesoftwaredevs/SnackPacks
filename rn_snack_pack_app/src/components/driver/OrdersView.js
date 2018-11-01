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
import OrderManager from '../../function/OrderManager'
import Driver from "../../function/Driver";

export default class OrdersView extends Component {

    orderManager; //object

    constructor(props) {
        super();
        this.state = {
            isLoading: true,
        }
    }

    loadData(responseJson) {
        this.orderManager = new OrderManager(responseJson);
        if (this.props.navigation.state.params.isDriver) {
            Driver.getInstance().setOrderManager(this.orderManager);
        }
        this.setState({
            isLoading: false,
        });
    }

    refresh() {
        return fetch(this.props.navigation.state.params.url, {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => this.loadData(responseJson));
    }

    _goBack = () => {
        this.props.navigation.navigate('DriversScreen');
    };

    componentDidMount() {
        return this.refresh();
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.loading_text}>Loading</Text>
                </View>
            );
        }

        let swipe_option = null;
        if (!this.props.navigation.state.params.isDriver) {
            swipe_option = this.available_option;
        }

        return (
            <View style={styles.container}>
                <Text style={styles.name_style}>{this.props.navigation.state.params.title}</Text>
                <FlatList
                    horizontal={false}
                    data={this.orderManager.getOrders(this.props.navigation.state.params.isDriver, Driver.getInstance().getId())}
                    keyExtractor={(item) => item}
                    extraData={this.state}
                    renderItem={({item}) =>
                        <OrderPreview
                            name={item._recipient}
                            number={item._id}
                            order_status={"not delivered"}
                            payment_info={item._paymentInfo}
                            address={item._address}
                            subtotal={item._subtotal}
                            tax={item._tax}
                            total={item._total}
                            last_screen={'OrdersView'}
                            navigation={this.props.navigation}
                            swipe_handler={"available_option"}
                            order_manager={this.orderManager}
                            parent={this}
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
        width: '100%',
        height: '100%',
        justifyContent: 'space-between'
    },

    horizontal_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    loading_text: {
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

