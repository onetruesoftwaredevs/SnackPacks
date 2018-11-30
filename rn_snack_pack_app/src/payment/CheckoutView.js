import {View,TouchableOpacity,Text,Platform,StyleSheet,WebView,TextInput} from 'react-native';
import React,{Component} from "react";
import PaymentView from "../components/cart/PaymentView";
import Cart from "../function/Cart";

const payment=require('./payment.html');

export default class CheckoutView extends Component{
    constructor(props){
        super(props);
        this.onWebViewMessage=this.onWebViewMessage.bind(this);

        super();
        this.state={tip:0};
    }

    handleDataReceived(msgData){
        this.setState({
            text2:`Message from web view ${msgData.data}`
        });
        msgData.isSuccessfull=true;
        msgData.args=[msgData.data%2?"green":"red"];
        this.myWebView.postMessage(JSON.stringify(msgData));
    }

    onWebViewMessage(event){
        if(event.nativeEvent.data.charAt(0)=='{'){
            console.log("Message received from webview");
            let nonce=JSON.parse(event.nativeEvent.data).data;
            console.log("NONCE: "+nonce);//Nonce from payment
            let cart=Cart.getInstance().getItemsInCart();
            console.log("CART: "+"key: "+cart[0].spkey+" quantity"+cart[0].spquantity);

            //Variable to store cart keys and quantities
            let cartKQ=[];

            //Add keys and quantities to cart
            cart.forEach(function(item){
                cartKQ.push({"key":item.spkey,"quantity":item.spquantity});
            });

            console.log("body: "+JSON.stringify({"nonce":nonce,"tip":Number(this.state.tip),"cart":cartKQ}));
            //Fetch to api with cart in body
            //Example body of post: {"nonce":"nonce","tip":0,"cart":[{"key":0,"quantity":6},{"key":3,"quantity":10}]}
            let url="https://hz08tdry07.execute-api.us-east-2.amazonaws.com/lambdaIntegration/payment?command=checkout2";

            (async () => {
                const rawResponse = await fetch(url, {
                    method: 'POST',
                    body:JSON.stringify({"nonce":nonce,"tip":Number(this.state.tip),"cart":cartKQ})
                });
                const content = await rawResponse;

                //TODO: check status of payment

                console.log(content);
            })();
        }
        // let msgData=JSON.parse(event.nativeEvent.data);
        // try{
        //     msgData=JSON.parse(event.nativeEvent.data);
        // }catch(err){
        //     console.warn(err);
        //     return;
        // }

        // switch(msgData.targetFunc){
        //     case "handleDataReceived":
        //         this[msgData.targetFunc].apply(this,[msgData]);
        //         break;
        // }
    }

    _goBack=()=>{
        this.props.navigation.navigate("CartScreen");
    };

    _test=()=>{
        let cart=Cart.getInstance().getItemsInCart();
        console.log("CART: "+"key: "+cart[0].spkey+" quantity: "+cart[0].spquantity);

        let cartKQ=[];
        cart.forEach(function(item){
            cartKQ.push({"key":item.spkey,"quantity":item.spquantity});
        });

        let nonce="nonce";
        console.log(cartKQ);
        console.log("body: "+JSON.stringify({"nonce":nonce,"tip":this.state.tip,"cart":JSON.stringify(cartKQ)}));
        // console.log(JSON.stringify({"nonce":"nonce","tip":this.state.tip,"cart":cartKQ}));
    };

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title_style}>Checkout</Text>
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
                    style={{height:40}}
                    placeholder="Add a tip here"
                    onChangeText={(text)=>this.setState({tip:text})}
                />
                <PaymentView subtotal={this.props.navigation.state.params.subtotal} tip={this.state.tip}
                             serviceFee={1.00}
                             navigator={this.props.navigation} checkout={false}/>
                <TouchableOpacity onPress={this._test}>
                    <Text style={styles.back_style}>Test</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._goBack}>
                    <Text style={styles.back_style}>Back</Text>
                </TouchableOpacity>
            </View>
        );
    }
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
