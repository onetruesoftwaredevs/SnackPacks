/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {Platform,StyleSheet,Text,View,WebView} from 'react-native';
//import PriceView from "./src/components/menu/PriceView";
//import Review from "./src/components/menu/Review";
//import Rating from "./src/components/menu/Rating";
//import NutritionView from "./src/components/menu/NutritionView";
//import SnackPackView from "./src/components/menu/SnackPackView";

//ref: https://docs.aws.amazon.com/aws-mobile/latest/developerguide/mobile-hub-react-native-getting-started.html#mobile-hub-react-native-getting-started-configure-aws-amplify
import Amplify,{API,Analytics,Storage} from 'aws-amplify';
import {ConfirmSignUp,ForgotPassword,SignIn,SignUp,VerifyContact,withAuthenticator} from 'aws-amplify-react-native';
import ConfirmSignIn from "aws-amplify-react-native/dist/Auth/ConfirmSignIn"; //Can be put into upper import statement, but this includes path to files
import aws_exports from './src/aws-exports';
import MySignIn from "./src/mySignIn";

//import CartScreen from "./src/screens/CartScreen";
//import MenuScreen from "./src/screens/MenuScreen";
import OrderItemView from "./src/components/cart/OrderItemView";
import CartScreen from "./src/screens/CartScreen";
import MenuScreen from "./src/screens/MenuScreen";
import {SnackPacks} from "./src/snackpacks";
import Driver from "./src/function/Driver";
import CheckoutView from "./src/payment/CheckoutView";
//Allow analytics & other aws backend to connect to mobile hub
Amplify.configure(aws_exports);

class App extends Component{
    constructor(props){
        super();
        // temporary
        Driver.setInstance("daddy daniels","0");
    }


    render(){
        // return <SnackPacks/>
        return (
            <CheckoutView/>
        );
    }
}

//(TODO later)To edit this location is: /rn_snack_pack_app/node_modules/aws-amplify-react-native/dist/
//export default withAuthenticator(App);
export default withAuthenticator(App,false,[
    <MySignIn/>,
    //<SignIn/>,
    <ConfirmSignIn/>,
    <VerifyContact/>,
    <SignUp/>,//TODO custom sign up that doesn't make you use the '+' at the begnning
    <ConfirmSignUp/>,
    <ForgotPassword/>
]);

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F5FCFF',
    },
});


