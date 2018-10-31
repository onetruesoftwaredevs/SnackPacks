import {Platform,WebView,StyleSheet} from 'react-native';
import {Component} from "react";
import React from "react";

const payment = require('./payment.html');
const payment2=require('./payment2.html');//Custom payment screen

export default class CheckoutView extends Component{
    render(){
        return (
            <WebView
                style={styles.WebViewStyle}
                source={payment}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        );
    }
}
const styles=StyleSheet.create({
    WebViewStyle:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        marginTop:(Platform.OS)==='ios'?20:0
    },
});
