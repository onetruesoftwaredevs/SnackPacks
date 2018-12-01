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
import StatusManager from "../../function/StatusManager";
import ETAModule from "../../function/ETAModule";
import {GMAP_API_KEY} from "../../function/Constants";


export default class DetailedOrderView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            driver_longitude: 0.0,
            driver_latitude: 0.0,
            address_longitude: 0.0,
            address_latitude: 0.0,
            time: "unknown"
        };
    }

    loadCoordinates() {
        let formatted_address = this.props.navigation.state.params.address;
        formatted_address.replace(" ", "+");
        let url = "https://maps.googleapis.com/maps/api/geocode/json";
        url += "?address=" + formatted_address;
        url += "&key=" + GMAP_API_KEY;
        fetch(url, {method: 'GET'})
            .then(response => response.json())
            .then(responseJSON => this.setState({
                address_longitude: responseJSON.geometry.location.lng,
                address_latitude: responseJSON.geometry.location.lat
            }));

        url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers";
        url += "?command=getloc";
        url += "&id=" + this.props.navigation.state.params.number;
        fetch(url, {method: 'GET'})
            .then(response => response.json())
            .then(responseJSON => this.setState({
                driver_longitude: responseJSON.long,
                driver_latitude: responseJSON.lat
            }));
        ETAModule.getTime(this.state.driver_latitude, this.state.driver_longitude, this.state.address_latitude, this.state.address_longitude);
        if (!ETAModule.time) {
            ETAModule.time = "unknown";
        }
        this.setState({time: ETAModule.time});

    }

    renderAnnotations() {
        return (
            <Mapbox.PointAnnotation
                key='pointAnnotation'
                id='pointAnnotation'
                coordinate={[this.state.driver_longitude, this.state.driver_latitude]}>

                <View style={styles.annotationContainer}>
                    <View style={styles.annotationFill}/>
                </View>
                <Mapbox.Callout title='Look! An annotation!'/>
            </Mapbox.PointAnnotation>
        )
    }

    componentDidMount() {
        this.props.navigation.addListener("willFocus", () => {
            this.loadCoordinates();
        });
        this.loadCoordinates();
    }

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

                <Field title={"Status"} value={StatusManager.getString(params.order_status)}/>
                <Field title={"ETA"} value={this.state.time}/>
                <Field title={"Payment Information"} value={params.payment_info}/>
                <Field title={"Address"} value={params.address}/>
                <Mapbox.MapView
                    styleURL={Mapbox.StyleURL.Street}
                    zoomLevel={15}
                    centerCoordinate={[this.state.driver_longitude, this.state.driver_latitude]}
                    showUserLocation={true}
                    style={styles.container}>
                    {this.renderAnnotations()}
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
    annotationContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
    },
    annotationFill: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'orange',
        transform: [{scale: 0.6}],
    }
});
