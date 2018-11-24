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
import {global_stylesheet} from "../../stylesheet";
import ScreenHeader from "../misc/ScreenHeader";
import Mapbox from "@mapbox/react-native-mapbox-gl";
import MapboxGL from "@mapbox/react-native-mapbox-gl";

export default class DetailedOrderView extends Component {

    _viewDriver = () => {
        this.props.navigation.navigate("DriverProfile", {
            name: "Dirty Dan",
            number: this.props.navigation.state.params.driver,
            last_screen: "DetailedOrderView",
            isReviewable: this.props.navigation.state.params.isReviewable
        });
    };

    render() {
        let params = this.props.navigation.state.params;
        let subtotal = Number(params.subtotal).toFixed(2);
        let tax = Number(params.tax).toFixed(2);
        let total = Number(params.total).toFixed(2);

        return (
            <View style={global_stylesheet.screen_container}>
                <ScreenHeader title={"Order Information"} navigation={this.props.navigation}
                              isDefaultScreen={false}/>
                <Field title={"Recipient"} value={params.name}/>
                <Field title={"Number"} value={params.number}/>

                <View style={global_stylesheet.basic_container}>
                    <View style={global_stylesheet.horizontal_container_loose}>
                        <TouchableOpacity onPress={this._viewDriver} style={styles.data_button_style}>
                            <Text style={styles.text_style}>Driver</Text>
                        </TouchableOpacity>
                        <Text style={global_stylesheet.data_style}>{params.driver}</Text>
                    </View>
                </View>

                <Field title={"Status"} value={params.order_status}/>
                <Field title={"ETA"} value={params.delivery_time}/>
                <Field title={"Payment Information"} value={params.payment_info}/>
                <Field title={"Address"} value={params.address}/>
                <Mapbox.MapView
                    styleURL={Mapbox.StyleURL.Street}
                    zoomLevel={15}
                    centerCoordinate={[11.256, 43.770]}
                    showUserLocation={true}
                    userTrackingMode={MapboxGL.UserTrackingModes.FollowWithHeading}
                    style={styles.container}>
                </Mapbox.MapView>
                <Field title={"Subtotal"} value={"$" + subtotal}/>
                <Field title={"Tax"} value={"$" + tax}/>
                <Field title={"Total"} value={"$" + total}/>
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
        marginBottom: 6,
        marginRight: 6
    },

    text_style: {
        color: '#FFF',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        paddingVertical: 10,
        paddingHorizontal: 18
    },

    data_button_style: {
        backgroundColor: '#44AAff',
    },
});
