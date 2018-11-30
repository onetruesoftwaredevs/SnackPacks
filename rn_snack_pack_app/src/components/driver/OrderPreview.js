/**
 *
 * @author Stephen Davis
 *
 * @description a view for the order information including ...
 * - name
 * - number
 * - status
 * - address
 *
 */

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Swipeout from "../../rn-swipe-out";
import Driver from "../../function/Driver";
import {global_stylesheet} from "../../stylesheet";
import StatusManager from '../../function/StatusManager';
import User from "../../function/User";

export default class OrderPreview extends Component {
    name;                   // string
    number;                 // number
    driver;                 // string
    order_status;           // string
    delivery_time;          // string
    payment_info;           // string
    address;                // string
    subtotal;               // number
    tax;                    // number
    total;                  // number
    last_screen;            // string
    navigation;             // object
    swipe_handler;          // string
    order_manager;          // object
    parent;                 // Component
    is_reviewable;          // boolean

    constructor(props) {
        super(props);
        this.state = {order: null, status: props.order_status};
    }


    getName() {
        if (this.props.name.length <= 0) {
            return "No Driver";
        }
        return this.props.name;
    }

    getNumber() {
        if (this.props.number === null || this.props.number === undefined) {
            return 0;
        }
        return this.props.number;
    }

    showDetailedView = () => {
        this.props.navigation.navigate('DetailedOrderView', {
            name: this.getName(),
            number: this.getNumber(),
            driver: this.props.driver,
            order_status: this.props.order_status,
            delivery_time: this.props.delivery_time,
            payment_info: this.props.payment_info,
            address: this.props.address,
            subtotal: this.props.subtotal,
            tax: this.props.tax,
            total: this.props.total,
            last_screen: this.props.last_screen,
            isReviewable: this.props.is_reviewable
        });
    };

    takeOrder(id) {
        // get order from orderManager
        let order = this.props.order_manager.getOrderById(id);
        // remove order by id
        this.props.order_manager.removeOrderById(id);
        // patch order to the server
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers?command=edit&id=";
        url = url + order._id;
        fetch(url, {
            method: "PATCH",
            body: JSON.stringify({
                _recipient: order._recipient,
                _paymentInfo: order._paymentInfo,
                _address: order._address,
                _driver: Driver.getInstance().getId(),
                _subtotal: order._subtotal,
                _tax: order._tax,
                _total: order._total,
            }),
        });
        // update the order locally
        order._driver = Driver.getInstance().getId();
        // update the drivers order list
        Driver.getInstance().getOrderManager().insertOrder(order);
        // refresh the ui
        this.props.parent.forceUpdate();
    }

    available_option = {
        text: 'Take Order',
        style: {
            backgroundColor: '#4A4',
            padding: 4,
            fontWeight: 'bold'

        },
        onPress: () => {
            this.takeOrder(this.getNumber());
        },
    };

    completeCurrentOrder() {
        // create query string
        let currentOrder = Driver.getInstance().getCurrentOrder();
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers?command=delete&id=";
        url = url + currentOrder._id;
        // delete from database
        fetch(url, {method: "GET"})
            .then(response => response.json())
            .then(responseJson => this.validateDeletion(responseJson, currentOrder._id));
        // update driver order manager
        Driver.getInstance().removeCurrentOrder();
        // update ui
        this.props.parent.forceUpdate();
    }

    completeOrderOption = {
        text: 'complete',
        style: {
            backgroundColor: '#4A4',
            padding: 4,
            fontWeight: 'bold'
        },
        onPress: () => {
            this.completeCurrentOrder();
        },
    };

    setStatus(status) {
        let order = User.getInstance().getOrderById(this.props.number);
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers";
        url += "?command=edit";
        url += "&id=" + order._id;
        fetch(url, {
            method: "POST", body: JSON.stringify({"status": status})
        });
        order._status = status;
        this.setState({status: status});
        this.props.parent.forceUpdate();
    }

    cancelOrderOption = {
        text: 'cancel',
        style: {
            backgroundColor: '#F44',
            padding: 4,
            fontWeight: 'bold'

        },
        onPress: () => {
            this.setStatus(3);
        },
    };

    reportDamaged = {
        text: 'Report Damaged',
        style: {
            backgroundColor: '#F44',
            padding: 4,
            fontWeight: 'bold'
        },
        onPress: () => {
            this.setStatus(4);
        },
    };

    reportNonDelivered = {
        text: 'Report Not Delivered',
        style: {
            backgroundColor: '#F44',
            padding: 4,
            fontWeight: 'bold'
        },
        onPress: () => {
            this.setStatus(5);
        },
    };

    render() {
        // create method or dictionary to dynamically change background color based on status
        let order_status_style = [styles.status_style, {backgroundColor: StatusManager.getColor(this.state.status)}];
        let swipe_handler = null;
        if (this.props.swipe_handler === "available_option") {
            swipe_handler = this.available_option;
        } else if (this.props.swipe_handler === "complete_order_option") {
            swipe_handler = this.completeOrderOption;
        } else if (this.props.swipe_handler === "user_options" && this.state.status < 2) {
            swipe_handler = [this.reportDamaged, this.reportNonDelivered, this.cancelOrderOption];
        }

        return (
            <TouchableOpacity style={global_stylesheet.basic_container} onPress={this.showDetailedView}>
                <Swipeout right={swipe_handler}>
                    <View style={global_stylesheet.horizontal_container_loose}>
                        <Text style={global_stylesheet.data_title_style}>{this.getName()}</Text>
                        <Text style={global_stylesheet.data_style}>{this.getNumber()}</Text>
                    </View>
                    <View style={global_stylesheet.horizontal_container_loose}>
                        <Text style={global_stylesheet.data_style}>{this.props.address}</Text>
                        <Text style={order_status_style}>{StatusManager.getString(this.state.status)}</Text>
                    </View>
                </Swipeout>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    status_style: {
        color: '#FFF',
        backgroundColor: '#4AF',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8,
    }
});
