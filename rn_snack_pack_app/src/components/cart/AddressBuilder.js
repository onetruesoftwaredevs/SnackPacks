/**
 * @author Stephen Davis
 *
 * @description the view for building an address
 */

import React, {Component} from 'react';
import {Alert,Text, TextInput, TouchableOpacity, View} from 'react-native';
import {global_stylesheet} from "../../stylesheet";
import ScreenHeader from "../misc/ScreenHeader";
import Cart from "../../function/Cart";

export default class AddressBuilder extends Component {

    subtotal; // number, pass-through

    constructor(props) {
        super(props);
        this.state = {street: "", city: "", state: "", zip: ""}
    }

    _nextScreen = () => {
        this.props.navigation.navigate("CheckoutView", {
            title: "Checkout",
            subtotal: this.props.navigation.state.params.subtotal,
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip
        });
    };

    _handleCash = () => {
        Alert.alert("Send order to server", "");

        let cart = Cart.getInstance().getItemsInCart();

        //Variable to store cart keys and quantities
        let cartKQ = [];

        //Add keys and quantities to cart
        cart.forEach(function (item) {
            cartKQ.push({"key": item.spkey, "quantity": item.spquantity});
        });

        (async () => {
            let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/lambdaIntegration/payment?command=checkout2";
            const rawResponse = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    "cart": cartKQ,
                    "address":{
                        "street":this.props.navigation.state.params.street,
                        "city":this.props.navigation.state.params.city,
                        "state":this.props.navigation.state.params.state,
                        "zip":this.props.navigation.state.params.zip,
                    },
                })
            });
            const content = await rawResponse;

            //TODO: check status of payment

            console.log(content);
        })();
        //Confirmation page?
    };

    render() {
        return (
            <View style={global_stylesheet.screen_container}>
                <View>
                    <ScreenHeader title={"Enter Delivery Location"} navigation={this.props.navigation} isDefaultScreen={false}/>

                    <InputField title={"Street Address"} value={this.state.street}
                                onChanged={(value) => this.setState({street: value})}/>
                    <InputField title={"City"} value={this.state.city}
                                onChanged={(value) => this.setState({city: value})}/>
                    <InputField title={"State"} value={this.state.state}
                                onChanged={(value) => this.setState({state: value})}/>
                    <InputField title={"Zip Code"} value={this.state.zip}
                                onChanged={(value) => this.setState({zip: value})}/>

                    <View style={{marginBottom: 6}}>
                        <TouchableOpacity onPress={this._handleCash} style={global_stylesheet.full_width_margin_style}>
                            <Text style={global_stylesheet.green_button_style}>Checkout With Cash</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={this._nextScreen} style={global_stylesheet.full_width_margin_style}>
                        <Text style={global_stylesheet.green_button_style}>Checkout With Card</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

class InputField extends Component {

    title;
    value;
    onChanged;

    constructor(props) {
        super(props);
        this.state = {value: props.value};
    }

    onChange(value) {
        this.setState({value: value});
        if (this.props.onChanged !== undefined) {
            this.props.onChanged(value);
        }
    };

    render() {
        return (
            <View>
                <View style={global_stylesheet.basic_container}>
                    <Text style={global_stylesheet.data_title_style}>{this.props.title}</Text>
                </View>
                <View style={global_stylesheet.basic_container}>
                    <TextInput
                        multiline={true}
                        value={this.state.value}
                        onChangeText={(value) => this.onChange(value)}
                        editable={true}
                        placeholder={"Insert " + this.props.title + " here"}
                        placeholderTextColor={"#AAA"}
                        style={global_stylesheet.data_style_thin}
                    />
                </View>
            </View>
        );
    }
}
