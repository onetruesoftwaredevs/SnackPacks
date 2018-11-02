/**
 * @author Stephen Davis
 *
 * @description this is a view for all of the payment information
 * and handles the pay action
 */

import React,{Component} from 'react';
import {Alert,TouchableOpacity,Platform,StyleSheet,Text,View} from 'react-native';
import NumberFormat from 'react-number-format'
import CheckoutView from '../../payment/CheckoutView'

export default class PaymentView extends Component{
    subtotal;
    deliveryFee;
    navigator;
    checkout;

    _handlePayment=()=>{
        //Alert.alert("Payment button pressed", "test");
        this.props.navigator.navigate('CheckoutView',{
            subtotal:this.props.subtotal,
        });
    };
    _handleCash=()=>{
        Alert.alert("Send order to server");
    };

    render(){
        let deliveryFee=Number(this.props.deliveryFee).toFixed(2);
        let tax=Number(Number(this.props.subtotal)*0.06).toFixed(2);
        let roundedTotal=Number(Number(this.props.subtotal)+Number(tax)+Number(this.props.deliveryFee)).toFixed(2);

        if(CheckoutView.checkout===true){
            return (
                <View>
                    <View style={styles.horizontal_container}>
                        <Text style={styles.price_style}>Subtotal:</Text>
                        <NumberFormat
                            value={this.props.subtotal}
                            displayType={'text'}
                            prefix={'$'}
                            renderText={value=><Text style={styles.price_style}>{value}</Text>}
                        />
                    </View>
                    <View style={styles.horizontal_container}>
                        <Text style={styles.price_style}>Tax:</Text>
                        <NumberFormat
                            value={tax}
                            displayType={'text'}
                            prefix={'$'}
                            renderText={value=><Text style={styles.price_style}>{value}</Text>}
                        />
                    </View>
                    <View style={styles.horizontal_container}>
                        <Text style={styles.price_style}>Service Fee:</Text>
                        <NumberFormat
                            value={deliveryFee}
                            displayType={'text'}
                            prefix={'$'}
                            renderText={value=><Text style={styles.price_style}>{value}</Text>}
                        />
                    </View>
                    <View style={styles.horizontal_container}>
                        <Text style={styles.price_style}>Total:</Text>
                        <NumberFormat
                            value={roundedTotal}
                            displayType={'text'}
                            prefix={'$'}
                            renderText={value=><Text style={styles.price_style}>{value}</Text>}
                        />
                    </View>
                    <TouchableOpacity onPress={this._handlePayment} style={styles.button_style}>
                        <Text style={styles.button_text_style}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else{
            return (
                <View>
                    <View style={styles.horizontal_container}>
                        <Text style={styles.price_style}>Subtotal:</Text>
                        <NumberFormat
                            value={this.props.subtotal}
                            displayType={'text'}
                            prefix={'$'}
                            renderText={value=><Text style={styles.price_style}>{value}</Text>}
                        />
                    </View>
                    <View style={styles.horizontal_container}>
                        <Text style={styles.price_style}>Tax:</Text>
                        <NumberFormat
                            value={tax}
                            displayType={'text'}
                            prefix={'$'}
                            renderText={value=><Text style={styles.price_style}>{value}</Text>}
                        />
                    </View>
                    <View style={styles.horizontal_container}>
                        <Text style={styles.price_style}>Service Fee:</Text>
                        <NumberFormat
                            value={deliveryFee}
                            displayType={'text'}
                            prefix={'$'}
                            renderText={value=><Text style={styles.price_style}>{value}</Text>}
                        />
                    </View>
                    <View style={styles.horizontal_container}>
                        <Text style={styles.price_style}>Total:</Text>
                        <NumberFormat
                            value={roundedTotal}
                            displayType={'text'}
                            prefix={'$'}
                            renderText={value=><Text style={styles.price_style}>{value}</Text>}
                        />
                    </View>
                    <TouchableOpacity onPress={this._handleCash} style={styles.button_style}>
                        <Text style={styles.button_text_style}>Checkout With Cash</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._handlePayment} style={styles.button_style}>
                        <Text style={styles.button_text_style}>Checkout With Card</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles=StyleSheet.create({
    horizontal_container:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#DEDEDE'
    },

    price_style:{
        color:'#444',
        fontSize:16,
        fontStyle:'normal',
        fontWeight:'bold',
        textAlign:'justify',
        textDecorationLine:'none',
        textAlignVertical:'center',
        textTransform:'none',
        padding:4,
    },


    button_style:{
        backgroundColor:'#008844',
    },

    button_text_style:{
        color:'#FFF',
        fontSize:18,
        fontStyle:'normal',
        fontWeight:'bold',
        textAlign:'center',
        textDecorationLine:'none',
        textAlignVertical:'center',
        textTransform:'none',
        padding:8,
    }

});