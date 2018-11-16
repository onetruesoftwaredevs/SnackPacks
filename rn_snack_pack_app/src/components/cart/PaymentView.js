/**
 * @author Stephen Davis
 *
 * @description this is a view for all of the payment information
 * and handles the pay action
 */

import React,{Component} from 'react';
import {Alert,TouchableOpacity,Platform,StyleSheet,Text,TextInput,View} from 'react-native';
import NumberFormat from 'react-number-format'
import CheckoutView from '../../payment/CheckoutView'
import {global_stylesheet} from "../../stylesheet";

export default class PaymentView extends Component{
    subtotal;
    tip;
    serviceFee;

    _handlePayment=()=>{//TODO react-native create new instance?
        //Alert.alert("Payment button pressed", "test");
        this.props.navigation.navigate('CheckoutView', {
            title: 'Checkout',
            subtotal:this.props.subtotal,
        });
    };
    _handleCash=()=>{
        Alert.alert("Send order to server");
    };

    render(){
        let serviceFee=Number(this.props.serviceFee).toFixed(2);
        let tax=Number(Number(Number(this.props.subtotal)*0.06).toFixed(2));

        if(this.props.checkout==true){
            let roundedTotal=Number(Number(this.props.subtotal)+Number(tax)+Number(this.props.serviceFee)).toFixed(2);//TODO: total has 2 extra zeros
            return (
                <View>
                    <View style={global_stylesheet.basic_container}>
                        <Field title={"Subtotal"} value={this.props.subtotal}/>
                        <Field title={"Tax"} value={tax}/>
                        <Field title={"Service Fee"} value={serviceFee}/>
                        <Field title={"Total"} value={roundedTotal}/>
                    </View>

                    {/*Payment*/}
                    <TouchableOpacity onPress={this._handleCash} style={global_stylesheet.green_button_style}>
                        <Text style={global_stylesheet.green_button_style}>Checkout With Cash</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._handlePayment} style={global_stylesheet.full_width_style}>
                        <Text style={global_stylesheet.green_button_style}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            );
        }else{
            let roundedTotal=Number(Number(this.props.subtotal)+Number(tax)+Number(this.props.serviceFee)+Number(this.props.tip)).toFixed(2);
            return (
                <View>
                    <View style={global_stylesheet.basic_container}>
                        <Field title={"Subtotal"} value={this.props.subtotal}/>
                        <Field title={"Tax"} value={tax}/>
                        <Field title={"Tip"} value={this.props.tip}/>
                        <Field title={"Service Fee"} value={serviceFee}/>
                        <Field title={"Total"} value={roundedTotal}/>
                    </View>
                </View>
            );
        }
    }
}

class Field extends Component{
    title;  // string
    value;  // number

    render(){
        return (
            <View style={global_stylesheet.horizontal_container_loose}>
                <Text style={global_stylesheet.data_title_style}>{this.props.title}</Text>
                <NumberFormat
                    value={this.props.value}
                    displayType={'text'}
                    prefix={'$'}
                    renderText={value=><Text style={global_stylesheet.data_style}>{value}</Text>}
                />
            </View>
        );
    }
}

