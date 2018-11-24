/**
 *
 * @author Stephen Davis
 *
 * @description screen for drivers to view a list of orders
 *
 */

import React, {Component} from 'react';
import {FlatList, Text, View} from 'react-native';
import OrderPreview from "./OrderPreview";
import OrderManager from '../../function/OrderManager'
import Driver from "../../function/Driver";
import ScreenHeader from "../misc/ScreenHeader";
import {global_stylesheet} from "../../stylesheet";

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
                <View style={global_stylesheet.screen_container}>
                    <Text style={global_stylesheet.loading_text}>Loading</Text>
                </View>
            );
        }

        let swipe_option = this.props.navigation.state.params.isDriver ? "none" : "available_option";
        let message = this.orderManager.getOrders(this.props.navigation.state.params.isDriver, Driver.getInstance().getId()).length === 0 ?
            <View>
                <Text style={global_stylesheet.error_message_style}>No orders to display</Text>
            </View> : <View/>;

        return (
            <View style={global_stylesheet.screen_container}>
                <View>
                    <ScreenHeader title={this.props.navigation.state.params.title} navigation={this.props.navigation}
                                  isDefaultScreen={false}/>
                    <FlatList
                        horizontal={false}
                        data={this.orderManager.getOrders(this.props.navigation.state.params.isDriver, Driver.getInstance().getId())}
                        keyExtractor={(item) => item}
                        extraData={this.state}
                        renderItem={({item}) =>
                            <OrderPreview
                                name={item._recipient}
                                number={item._id}
                                driver={item._driver}
                                order_status={item._status}
                                delivery_time={item._time}
                                payment_info={item._paymentInfo}
                                address={item._address}
                                subtotal={item._subtotal}
                                tax={item._tax}
                                total={item._total}
                                last_screen={'OrdersView'}
                                navigation={this.props.navigation}
                                swipe_handler={swipe_option}
                                order_manager={this.orderManager}
                                parent={this}
                                is_reviewable={false}
                            />
                        }
                    />
                    {message}
                </View>
            </View>
        );
    }
};