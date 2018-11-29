import React,{Component} from 'react';
import {Button,StyleSheet,Text,View} from 'react-native';

//ref: https://docs.aws.amazon.com/aws-mobile/latest/developerguide/mobile-hub-react-native-getting-started.html#mobile-hub-react-native-getting-started-configure-aws-amplify
import Amplify,{API,Analytics,Storage} from 'aws-amplify';
import MySignIn from "./src/cognito/mySignIn";
import MySignUp from "./src/cognito/mySignUp";
import MyRequireNewPassword from "./src/cognito/myRequireNewPassword";
import {ConfirmSignIn,ConfirmSignUp,ForgotPassword,SignIn,SignUp,VerifyContact,withAuthenticator} from './src/aws-amplify-react-native'; 
import aws_exports from './src/aws-exports';
import {Auth} from 'aws-amplify';
import AWSUser from "./src/cognito/awsUser";

import {SnackPacks} from "./src/snackpacks";
import Driver from "./src/function/Driver";

import User from "./src/function/User";


//Allow analytics & other aws backend to connect to mobile hub
Amplify.configure(aws_exports);

class App extends Component{
    constructor(props){
        super();
        this.state = {isLoading: true};
        User.setInstance("Steve", "16");

        //Set current AWSUser data
        Auth.currentSession()
            .then(user=>{
                console.log("user from app.js: ");
                console.log(user);
                AWSUser.setInstance(user);
            })
            .catch(err=>{
                console.log(err);
            });
    }

    componentDidMount() {
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers?command=list";
        fetch(url, {method: "GET"})
            .then(response => response.json())
            .then(responseJson => this.loadData(responseJson));
    }

    loadData = (responseJson) => {
        let driver = responseJson[0]; // load the first driver (temporary but more complete)
        Driver.setInstance(
            driver._name,
            driver._id,
            driver._phone,
            driver._carmodel,
            driver._carmake,
            driver._rating,
            driver._status,
            driver._reviews
        );
        this.setState({isLoading: false});
    };

    test(){
        let user=AWSUser.getInstance();
        console.log("AWSUSER:");
        console.log(user.getUser());
        console.log("Group:");
        console.log(user.getGroup());
        console.log("Email:");
        console.log(user.getEmail());
        console.log("Phone:");
        console.log(user.getPhone());
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.loading_text}>Loading metadata</Text>
                </View>
            );
        }

        return <SnackPacks/>//<Button onPress={this.test} title="AWSUser Test"/>
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:0,
        width:'100%',
        height:'100%',
    },

    loading_text:{
        flex:1,
        color:'#444',
        fontSize:20,
        fontStyle:'normal',
        fontWeight:'bold',
        textAlign:'center',
        textDecorationLine:'none',
        textAlignVertical:'center',
        textTransform:'none',
        padding:4,
    }
});

export default withAuthenticator(App,false,[
    <MySignIn/>,
    <MySignUp/>,
    <MyRequireNewPassword/>,
    <ConfirmSignIn/>,
    <VerifyContact/>,
    <ConfirmSignUp/>,
    <ForgotPassword/>
]);

