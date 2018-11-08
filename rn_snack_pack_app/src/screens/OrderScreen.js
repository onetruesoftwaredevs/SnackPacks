/**
 * @author Stephen Davis
 *
 * @description this is a view for the entire users cart
 */

import React, {Component} from 'react';
import {FlatList, Alert, StyleSheet, Text, View} from 'react-native';
import OrderItemView from "../components/cart/OrderItemView";
import PaymentView from "../components/cart/PaymentView";
import Cart from '../function/Cart'
import Driver from "../function/Driver";
import OrderPreview from "../components/driver/OrderPreview";
import User from "../function/User";
import ScreenHeader from "../components/misc/ScreenHeader";
import {global_stylesheet} from "../stylesheet";

export default class OrderScreen extends Component {

    constructor(props) {
        super();
        this.state = {isLoading: true,};
    }

    loadOrders(responseJson) {
        User.getInstance().loadOrders(responseJson);
        this.setState({isLoading: false});
    }

    refresh() {
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers?command=list";
        fetch(url, {method: "GET"})
            .then(response => response.json())
            .then(responseJson => this.loadOrders(responseJson));
    }

    componentDidMount() {
        this.refresh();
    }

    render() {
        let orders = User.getInstance().getOrders().length > 0 ?
            (<View>
                <FlatList
                    horizontal={false}
                    data={User.getInstance().getOrders()}
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
                            last_screen={'Orders'}
                            navigation={this.props.navigation}
                            swipe_handler={"none"}
                            parent={this}
                            is_reviewable={true}
                        />
                    }
                />
            </View>) :
            (<View>
                <Text style={global_stylesheet.error_message_style}>No current or past orders</Text>
            </View>);

        return (
            <View style={global_stylesheet.screen_container}>
                <View>
                    <ScreenHeader title={"My Orders"} navigation={this.props.navigation}/>
                    {orders}
                </View>
            </View>
        );
    }
}
