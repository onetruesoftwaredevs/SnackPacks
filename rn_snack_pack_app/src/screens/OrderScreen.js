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
        let url = "";
        fetch(url, {method: "GET"})
            .then(response => response.json())
            .then(responseJson => this.loadOrders(responseJson));
    }

    componentDidMount() {
        // this.refresh();
    }


    // have render dummy order preview until backend is complete
    render() {
        // temp
        return (
            <View style={styles.container}>
                <Text style={styles.title_style}>My Orders</Text>
                <OrderPreview
                    name={User.getInstance().getName()}
                    number={"1"}
                    driver={"4"}
                    order_status={"not delivered"}
                    payment_info={"credit card"}
                    address={"1016 W. Stadium Ave."}
                    subtotal={8.59}
                    tax={0.52}
                    total={10.11}
                    last_screen={'Orders'}
                    navigation={this.props.navigation}
                    swipe_handler={"none"}
                    parent={this}
                    is_reviewable={true}
                />

            </View>
        );
        /* real
        return (
            <View style={styles.container}>
                <Text style={styles.title_style}>My Orders</Text>
                <FlatList
                    horizontal={false}
                    data={User.getInstance().getOrders()}
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
                            last_screen={'OrderScreen'}
                            navigation={this.props.navigation}
                            swipe_handler={"none"}
                            parent={this}
                        />
                    }
                />
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
        //width: '100%',
        //height: "100%",
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
});
