import {connectToRemote} from "react-native-webview-messaging";
import React,{Component} from 'react';
import {Text,View,WebView} from 'react-native';
// import Payment2HTML from 'payment2HTML';

export default class NewCheckoutView extends Component{

    /*async componentDidMount() {
        connectToRemote(this.webview)
            .then(remote=>{
                this.remote=remote;
            })
            .catch(console.log);
        console.log("component did mount");

        this.remote.on('text', text =>{
            fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/lambdaIntegration/payment?command=checkout",{
                method:'POST',
                body:text//nonce
            });//.then(function(response){
                // document.getElementById("console").innerHTML=response.body;
            // });
        });
    }*/

    render=()=>{
        return (
            <View>
                {/*<Payment2HTML/>*/}
                {/*<WebView*/}
                    {/*ref={webview=>{*/}
                        {/*this.webview=webview;*/}
                    {/*}}*/}
                    {/*source={require('./payment2.html')}*/}
                    {/*javaScriptEnabled={true}*/}
                    {/*domStorageEnabled={true}*/}
                {/*/>*/}
                <Text>hi</Text>
            </View>
        );
    };
}

