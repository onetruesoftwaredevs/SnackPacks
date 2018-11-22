/**
 *
 * @author Stephen Davis
 *
 * @description screen for drivers when they open the application
 *
 */

import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import OrderPreview from "../components/driver/OrderPreview";
import Driver from "../function/Driver";
import OrderManager from "../function/OrderManager";
import ScreenHeader from "../components/misc/ScreenHeader";
import {global_stylesheet} from "../stylesheet";
import Mapbox from '@mapbox/react-native-mapbox-gl';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import { PermissionsAndroid } from 'react-native';

Mapbox.setAccessToken('pk.eyJ1Ijoic3RlcGhlbmQwMTciLCJhIjoiY2pvZXpzNDh6MWRmMzNxbzRjaGwzcHIzMCJ9.EILVrZZjETyxqQVPk_h8Cg');

export default class DriverScreen extends Component {

    constructor(props) {
        super();
        this.state = {previousOrder: null}
    }

    loadData(responseJson) {
        this.orderManager = new OrderManager(responseJson);
        Driver.getInstance().setOrderManager(this.orderManager);
        this.setState({
            previousOrder: null,
        });
    }


    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            this.setState({previousOrder: null});
        });

        PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
            {
                title: 'Give Location Permission',
                message: 'App needs location permission to find your position.'
            }
        ).then(granted => {
            console.log(granted);
            resolve();
        }).catch(err => {
            console.warn(err);
            reject(err);
        });

        this.forceUpdate();

        return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers?command=list", {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => this.loadData(responseJson));
    }

    validateDeletion = (responseJson, order_id) => {
        Alert.alert("Deletion of order [" + order_id + "]", responseJson ? "succeeded" : "failed");
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
        this.setState({previousOrder: currentOrder});
    }

    completeOrderOption = {
        text: 'complete',
        style: {
            backgroundColor: '#44aa44',
            padding: 2,
        },
        onPress: () => {
            this.completeCurrentOrder();
        },
    };

    showMyOrders = () => {
        this.props.navigation.navigate('OrdersView', {
            title: 'My Orders',
            url: "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers?command=list",
            isDriver: true,
        });
    };

    showAvailableOrders = () => {
        this.props.navigation.navigate('OrdersView', {
            title: 'Available Orders',
            url: "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers?command=list",
            isDriver: false,
        });
    };

    render() {
        let currentOrder = Driver.getInstance().getCurrentOrder();
        let display = (currentOrder === null) ? (
            <View>
                <Text style={global_stylesheet.error_message_style}>No current orders :(</Text>
            </View>
        ) : (
            <View>
                <OrderPreview
                    name={currentOrder._recipient}
                    number={currentOrder._id}
                    driver={currentOrder._driver}
                    order_status={currentOrder._status}
                    delivery_time={currentOrder._time}
                    payment_info={currentOrder._paymentInfo}
                    address={currentOrder._address}
                    subtotal={currentOrder._subtotal}
                    tax={currentOrder._tax}
                    total={currentOrder._total}
                    last_screen={'DriversScreen'}
                    navigation={this.props.navigation}
                    swipe_handler={"complete_order_option"}
                    parent={this}
                    is_reviewable={false}
                />
            </View>
        );

        return (
            <View style={global_stylesheet.screen_container}>
                <ScreenHeader title={Driver.getInstance().getName()} navigation={this.props.navigation}
                              isDefaultScreen={true}/>
                {display}
                <Mapbox.MapView
                    styleURL={Mapbox.StyleURL.Street}
                    zoomLevel={15}
                    centerCoordinate={[11.256, 43.770]}
                    showUserLocation={true}
                    userTrackingMode={MapboxGL.UserTrackingModes.FollowWithHeading}
                    style={styles.container}>
                </Mapbox.MapView>
                <TouchableOpacity style={global_stylesheet.full_width_margin_style} onPress={this.showMyOrders}>
                    <Text style={styles.my_order_style}> My Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={global_stylesheet.full_width_margin_style} onPress={this.showAvailableOrders}>
                    <Text style={styles.available_order_style}>Available Orders</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginRight: 6,
        marginBottom: 6,
    },

    my_order_style: {
        color: '#fdfdfd',
        backgroundColor: '#4AA',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8,
        marginBottom: 6,
    },

    available_order_style: {
        color: '#fdfdfd',
        backgroundColor: '#4AF',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8,
        marginBottom: 6,

    },
});

