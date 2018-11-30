import {Platform, StyleSheet, TextInput, View, WebView} from 'react-native';
import React, {Component} from "react";
import PaymentView from "../components/cart/PaymentView";
import Cart from "../function/Cart";
import ScreenHeader from "../components/misc/ScreenHeader";
import AWSUser from "../cognito/awsUser";

const payment = require('./payment.html');

export default class CheckoutView extends Component {
    constructor(props) {
        super(props);
        this.onWebViewMessage = this.onWebViewMessage.bind(this);

        this.state = {tip: 0};
    }

    handleDataReceived(msgData) {
        this.setState({
            text2: `Message from web view ${msgData.data}`
        });
        msgData.isSuccessfull = true;
        msgData.args = [msgData.data % 2 ? "green" : "red"];
        this.myWebView.postMessage(JSON.stringify(msgData));
    }

    onWebViewMessage(event) {
        if (event.nativeEvent.data.charAt(0) == '{') {
            console.log("Message received from webview");
            let nonce = JSON.parse(event.nativeEvent.data).data;
            console.log("NONCE: " + nonce);//Nonce from payment
            let cart = Cart.getInstance().getItemsInCart();
            console.log("CART: " + "key: " + cart[0].spkey + " quantity" + cart[0].spquantity);
            let user=AWSUser.getInstance().getUser();
            console.log("AWSUSER:");
            console.log(user);

            //Variable to store cart keys and quantities
            let cartKQ = [];

            //Add keys and quantities to cart
            cart.forEach(function (item) {
                cartKQ.push({"key": item.spkey, "quantity": item.spquantity});
            });

            console.log("body: " + JSON.stringify({"nonce": nonce, "tip": Number(this.state.tip), "cart": cartKQ}));
            //Fetch to api with cart in body
            //Example body of post: 
            //{
            //  "nonce":"nonce",
            //  "tip":0,
            //  "address":{
            //      "street":"street",
            //      "city":"city",
            //      "state":"state",
            //      "zip":"zip"
            //  }
            //  "recipient":"username",
            //  "cart":
            //  [
            //      {
            //          "key":0,
            //          "quantity":6
            //      },
            //      {
            //          "key":3,
            //          "quantity":10
            //      }
            //  ],
            //}
            let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/lambdaIntegration/payment?command=checkout";
            (async () => {
                const rawResponse = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        "nonce": nonce,
                        "tip": Number(this.state.tip),
                        "recipient":user,
                        "address":{
                            "street":this.props.navigation.state.params.street,
                            "city":this.props.navigation.state.params.city,
                            "state":this.props.navigation.state.params.state,
                            "zip":this.props.navigation.state.params.zip,
                        },
                        "cart": cartKQ,
                    })
                });
                const content = await rawResponse;

                //TODO: check status of payment

                console.log(content);
            })();
        }
    }

    _goBack = () => {
        this.props.navigation.goBack();
    };

    test = () => {
        let cart = Cart.getInstance().getItemsInCart();

        let cartKQ = [];
        cart.forEach(function (item) {
            cartKQ.push({"key": item.spkey, "quantity": item.spquantity});
        });

        let nonce = "nonce";
        let user=AWSUser.getInstance().getUser();
        console.log("body: " + JSON.stringify({
                        "nonce": nonce,
                        "tip": Number(this.state.tip),
                        "recipient":user,
                        "address":{
                            "street":this.props.navigation.state.params.street,
                            "city":this.props.navigation.state.params.city,
                            "state":this.props.navigation.state.params.state,
                            "zip":this.props.navigation.state.params.zip,
                        },
                        "cart": cartKQ,
                    }));
        // console.log(JSON.stringify({"nonce":"nonce","tip":this.state.tip,"cart":cartKQ}));
        //console.log(this.props.navigation.state.params.subtotal);
        //console.log(this.props.navigation.state.params.street);
        //console.log(this.props.navigation.state.params.city);
        //console.log(this.props.navigation.state.params.state);
        //console.log(this.props.navigation.state.params.zip);
    };

    render() {
        return (
            <View style={styles.container}>
                <ScreenHeader title={"Checkout"} navigation={this.props.navigation} isDefaultScreen={false}/>
                {/*<Text>{JSON.stringify(Cart.getInstance().getItemsInCart())}</Text>*/}
                <WebView
                    // ref={ref=>(this.webview=ref)}
                    style={styles.WebViewStyle}
                    source={payment}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onMessage={this.onWebViewMessage}
                />
                <TextInput
                    style={{height: 40}}
                    placeholder="Add a tip here"
                    onChangeText={(text) => this.setState({tip: text})}
                />
                <PaymentView subtotal={this.props.navigation.state.params.subtotal} tip={this.state.tip}
                             serviceFee={1.00}
                             navigator={this.props.navigation} checkout={false}/>
            {/*<View style={{marginBottom: 6}}>
                    <TouchableOpacity onPress={this.test} style={global_stylesheet.full_width_margin_style}>
                        <Text style={styles.back_style}>Test</Text>
                    </TouchableOpacity>
                </View>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between'
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

    WebViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        height: '90%',
        marginTop: (Platform.OS) === 'ios' ? 20 : 0
    },
    checkout_style: {
        width: 50,
        color: '#fdfdfd',
        backgroundColor: '#44AAff',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8
    },

    back_style: {
        color: '#fdfdfd',
        backgroundColor: '#44AAff',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8
    },
});
