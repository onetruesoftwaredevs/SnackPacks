import {View,TouchableOpacity,Text,Platform,StyleSheet} from 'react-native';
import React,{Component} from "react";
import PaymentView from "../components/cart/PaymentView";
import Cart from "../function/Cart";

const payment=require('./payment.html');
const payment2=require('./payment2.html');//Custom payment screen\
// const braintree=require('https://js.braintreegateway.com/web/dropin/1.13.0/js/dropin.min.js');


import {connectToRemote,WebView} from 'react-native-webview-messaging';
import BraintreeReactHTML from "./paymentHTML";

export default class CheckoutView extends Component{
    _goBack=()=>{
        this.props.navigation.navigate("CartScreen");
    };

    render(){
        return (
            <View style={styles.container}>
                {/*<Text style={styles.title_style}>Checkout</Text>*/}
                <WebView
                    style={styles.WebViewStyle}
                    source={payment}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    ref={this._refWebView}
                />

                <PaymentView subtotal={this.props.navigation.state.params.subtotal} deliveryFee={1.00}
                             navigator={this.props.navigation} checkout={false}/>
                <TouchableOpacity onPress={this._goBack}>
                    <Text style={styles.back_style}>Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    bindListeners(){
        this.remote.on('text',text=>this.setState({
            message:`Recevied text from webview: ${text}`
        }));

        this.remote.on('json',json=>this.setState({
            message:`Received json from webview: ${JSON.stringify(json)}`
        }));

        this.remote.on('greetingFromWebview',event=>this.setState({
            message:`Received "greetingFromWebview" event: ${JSON.stringify(event)}`
        }));
    }


    sendHelloToWebView=()=>{
        this.remote.send('hello');
    };

    sendJsonToWebView=()=>{
        this.remote.sendJSON({payload:'hello'});
    };

    emitGreetingEventToWebView=()=>{
        this.remote.emit('greetingFromRN',{payload:'hello'});
    };
}

const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        justifyContent:'space-between'
    },

    title_style:{
        color:'#444',
        fontSize:30,
        fontStyle:'normal',
        fontWeight:'bold',
        textAlign:'justify',
        textDecorationLine:'none',
        textAlignVertical:'center',
        textTransform:'none',
        padding:4,
    },

    WebViewStyle:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        width:'100%',
        height:'90%',
        marginTop:(Platform.OS)==='ios'?20:0
    },
    checkout_style:{
        width:50,
        color:'#fdfdfd',
        backgroundColor:'#44AAff',
        fontSize:18,
        fontStyle:'normal',
        fontWeight:'bold',
        textAlign:'center',
        textDecorationLine:'none',
        textAlignVertical:'center',
        textTransform:'none',
        padding:8
    },

    back_style:{
        color:'#fdfdfd',
        backgroundColor:'#44AAff',
        fontSize:18,
        fontStyle:'normal',
        fontWeight:'bold',
        textAlign:'center',
        textDecorationLine:'none',
        textAlignVertical:'center',
        textTransform:'none',
        padding:8
    },
});
