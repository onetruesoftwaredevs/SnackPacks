/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import PriceView from "./src/components/PriceView";
import Review from "./src/components/Review";
import Rating from "./src/components/Rating";
import NutritionView from "./src/components/NutritionView";
import SnackPackView from "./src/components/SnackPackView";

//ref: https://docs.aws.amazon.com/aws-mobile/latest/developerguide/mobile-hub-react-native-getting-started.html#mobile-hub-react-native-getting-started-configure-aws-amplify
import Amplify, {API, Analytics,Storage} from 'aws-amplify';
import {ConfirmSignUp, ForgotPassword, SignIn, SignUp, VerifyContact, withAuthenticator} from 'aws-amplify-react-native';
import ConfirmSignIn from "aws-amplify-react-native/dist/Auth/ConfirmSignIn"; //Can be put into upper import statement, but this includes path to files
import aws_exports from './src/aws-exports';
import PaymentView from "./src/components/PaymentView";
import OrderItemView from "./src/components/OrderItemView";
import CartView from "./src/components/CartView";
import SnackPackMenuView from "./src/components/SnackPackMenuView";
import SnackPacks from "./src/snackpacks";
import MySignIn from "./src/mySignIn";

//Allow analytics & other aws backend to connect to mobile hub
Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
                <SnackPackView spname='Snack-pack-1' sprating={3.5} spprice={10.99}/>
      </View>
    );
  }
}
//(TODO later)To edit this location is: /rn_snack_pack_app/node_modules/aws-amplify-react-native/dist/
//export default withAuthenticator(App);
export default withAuthenticator(App, false, [
    <MySignIn/>,
    //<SignIn/>,
    <ConfirmSignIn/>,
    <VerifyContact/>,
    <SignUp/>,//TODO custom sign up that doesn't make you use the '+' at the begnning
    <ConfirmSignUp/>,
    <ForgotPassword/>
]);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});


