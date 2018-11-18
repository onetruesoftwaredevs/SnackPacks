import dropin from "braintree-web-drop-in";
import renderIf from 'render-if';
import RNMessageChannel from "react-native-webview-messaging/web";
import React from 'react';
import {View,Button} from 'react-native'

const util=require("util");

// print passed information in an html element; useful for debugging
// since console.log and debug statements won't work in a conventional way
const PrintElement=data=>{
    if(typeof data==="object"){
        let el=document.createElement("pre");
        el.innerHTML=util.inspect(data,{showHidden:false,depth:null});
        document.getElementById("messages").appendChild(el);
    }else if(typeof data==="string"){
        let el=document.createElement("pre");
        el.innerHTML=data;
        document.getElementById("messages").appendChild(el);
    }
};

export default class BraintreeReactHTML extends React.Component{
    constructor(){
        super();
        this.state={
            currentPaymentStatus:null
        };
    }

    componentDidMount=()=>{
        // PrintElement("componentDidMount success");
        this.registerMessageListeners();
    };

    /*******************************
     * register message listeners to receive events from parent
     */
    registerMessageListeners=()=>{
        // PrintElement("registering message listeners");

        // will receive client token as a prop immediately upon mounting
        RNMessageChannel.on("TOKEN_RECEIVED",event=>{
            //PrintElement(event);
            // if (event.payload.options.creditCard) {
            this.createCreditCardUI(event.payload.clientToken);
            /*  }
             if (event.payload.options.paypal) {
               this.createPaypalUI(event.payload.clientToken);
             } */
        });

        // when the call is made to the braintree purchasing server
        // used to show the user some feedback that the purchase is in process
        RNMessageChannel.on("PURCHASE_PENDING",event=>{
            // PrintElement("PURCHASE_PENDING");
            this.setState({currentPaymentStatus:"PURCHASE_FULFILLED"});
        });

        // when the purchase succeeds
        // used to show the user some feedback that the purchase has completed successfully
        RNMessageChannel.on("PURCHASE_FULFILLED",event=>{
            //PrintElement("PURCHASE_FULFILLED");
            this.setState({currentPaymentStatus:"PURCHASE_FULFILLED"});
        });

        // when the purchase succeeds
        // used to show the user some feedback that the purchase has failed to complete
        RNMessageChannel.on("PURCHASE_REJECTED",event=>{
            this.setState({currentPaymentStatus:"PURCHASE_REJECTED"});
            PrintElement("PURCHASE_REJECTED");
        });

        // PrintElement("registering message listeners - completed");
    };

    /*******************************
     * create the Paypal payment UI element
     */
    createPaypalUI=clientToken=>{
        console.log("Not implmented");
    };

    /*******************************
     * create the Braintree UI element
     */
    createCreditCardUI=clientToken=>{
        //PrintElement(`createCreditCardUI: ${clientToken}`);

        dropin.create({
            authorization:clientToken,
            container:"#dropin-container"
        })
            .then(instance=>{
                this.setState({instance});
            })
            .catch(function(err){
                // Handle any errors that might've occurred when creating Drop-in
                RNMessageChannel.sendJSON({
                    type:"error",
                    err
                });
            });
    };
    /***********************************************
     *  handler for when the purchase button is clicke
     */
    handleSubmitPurchaseButtonClicked=()=>{
        // PrintElement(`handleSubmitPurchaseButtonClicked: ${this.state.instance}`);
        this.setState({currentPaymentStatus:"PAYMENT_PENDING"});

        // send a message to the parent WebView so that it
        // can display feedback to user
        RNMessageChannel.emit("RETRIEVE_NONCE_PENDING",{
            payload:{
                type:"success"
            }
        });

        // request a purchase nonce from the Braintree server
        this.state.instance.requestPaymentMethod(function(err,response){
            if(err){
                // notify the parent WebView if there is an error
                RNMessageChannel.emit("RETRIEVE_NONCE_REJECTED",{
                    payload:{
                        type:"error",
                        err
                    }
                });
            }else{
                // pass the nonce to the parent WebView if the purchase is successful
                RNMessageChannel.emit("RETRIEVE_NONCE_FULFILLED",{
                    payload:{
                        type:"success",
                        response
                    }
                });
            }
        });
    };

    handleGoBackButtonSubmit=()=>{
        RNMessageChannel.emit("GO_BACK");
    };

    render=()=>{
        return (
            <View
                ref={component=>{
                    this.webComponent=component;
                }}
            >
                <View>
                    <View id="dropin-container"/>
                </View>
                <View>

                    <Button
                        title="Submit Purchase"
                        id="submit-button"
                        onClick={this.handleSubmitPurchaseButtonClicked}
                    />

                    <View id="messages"/>
                </View>
            </View>
        );
    };
}

