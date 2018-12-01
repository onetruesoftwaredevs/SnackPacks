'use strict';

let braintree=require('braintree');
let gateway=require('./src/gateway');
let PaymentConnector=require('./src/paymentConnect');
let OrderConnector=require('./src/orderConnect');
let TRANSACTION_SUCCESS_STATUSES=[
    braintree.Transaction.Status.Authorizing,
    braintree.Transaction.Status.Authorized,
    braintree.Transaction.Status.Settled,
    braintree.Transaction.Status.Settling,
    braintree.Transaction.Status.SettlementConfirmed,
    braintree.Transaction.Status.SettlementPending,
    braintree.Transaction.Status.SubmittedForSettlement
];

function formatErrors(errors){
    let formattedErrors='';

    for(let i in errors){
        if(errors.hasOwnProperty(i)){
            formattedErrors+='Error: '+errors[i].code+': '+errors[i].message+'\n';
        }
    }
    return formattedErrors;
}

function createResultObject(transaction){
    let result;
    let status=transaction.status;

    if(TRANSACTION_SUCCESS_STATUSES.indexOf(status)!== -1){
        result={
            header:'Success!',
            icon:'success',
            message:'Your test transaction has been successfully processed. See the Braintree API response and try again.'
        };
    }else{
        result={
            header:'Transaction Failed',
            icon:'fail',
            message:'Your test transaction has a status of '+status+'. See the Braintree API response and try again.'
        };
    }

    return result;
}

exports.handler=function(event,context,callback){
    console.log(event);
    console.log(context);

    let queryString=event.queryStringParameters;
    if(queryString!=null){
        let command=queryString.command;
        if(command!=null){
            if(command.localeCompare("getClientToken")===0){//API CALL GET to getClientToken
                //Server with customer ID to save cards in "braintree vault"
                /*gateway.clientToken.generate({
                    customerId:aCustomerId
                }).then(function(err,response){
                    var clientToken=response.clientToken
                });*/

                gateway.clientToken.generate({}).then(function(res){
                    //Return client token
                    let response={
                        "statusCode":200,
                        "headers":{},
                        "body":JSON.stringify(res.clientToken),
                        "isBase64Encoded":"false"
                    };
                    callback(null,response);
                }).catch((err)=>{
                    console.log("INTO CLIENT TOKEN CATCH ERROR");
                    let response={
                        "statusCode":500,
                        "headers":{},
                        "body":JSON.stringify(err),
                        "isBase64Encoded":"false"
                    };
                    callback(null,response);
                });
            }else if(command.localeCompare("transaction")===0){//API CALL GET to checkout with ID of transaction ?id=id
                console.log("In transaction");
                if(queryString!==null&&queryString!==undefined){
                    if(queryString.id!==undefined&&
                        queryString.id!==null&&
                        queryString.id!==""){
                        console.log("Received id: "+queryString.id);
                        let id=queryString.id;

                        //update this to a db call by transaction id
                        gateway.transaction.find(id).then(function(transaction){
                            let result=createResultObject(transaction);

                            //Return transaction to the client to update the transaction page
                            let object={transaction,result};
                            let response={
                                "statusCode":200,
                                "headers":{},
                                "body":JSON.stringify(object),
                                "isBase64Encoded":"false"
                            };
                            callback(null,response);
                        }).catch((err)=>{
                            console.log("INTO TRANSACTION CATCH ERROR");
                            let response={
                                "statusCode":500,
                                "headers":{},
                                "body":JSON.stringify(err),
                                "isBase64Encoded":"false"
                            };
                            callback(null,response);
                        });
                    }else{
                        console.log("INTO NO ID IN QUERY");
                        let response={
                            "statusCode":500,
                            "headers":{},
                            "body":"No id in query",
                            "isBase64Encoded":"false"
                        };
                        callback(null,response);
                    }
                }else{
                    console.log("INTO NO QUERY STRING ERROR");
                    let response={
                        "statusCode":500,
                        "headers":{},
                        "body":"No query string",
                        "isBase64Encoded":"false"
                    };
                    callback(null,response);
                }
            }else if(command.localeCompare("checkout")===0){//API CALL POST to checkout with payment_nonce
                //Declare variables (initialized to undefined)
                let transactionErrors,tip,nonce,cart,amount,street,city,state,zip,recipient;
                let serviceFee=1; //Declare serviceFee variable

                console.log("EVENT BODY: "+JSON.stringify(event.body));
                //Query from app is a string data from lambda is already a JSON object
                try{
                    event.body=JSON.parse(event.body);
                }catch(e){
                    console.log("catch!")
                }

                if(event.body!=null&&event.body!==undefined){
                    //Get variables from event.body
                    nonce=event.body.nonce;
                    cart=event.body.cart;
                    street=event.body.address.street;
                    city=event.body.address.city;
                    state=event.body.address.state;
                    zip=event.body.address.zip;
                    recipient=event.body.recipient;

                    //Get absolute value of tip in float
                    if(event.body.tip==parseFloat(event.body.tip,10)&&event.body.tip!=null&&event.body.tip!==undefined) tip=Math.abs(event.body.tip);
                    else tip=0;

                    //Check to see if variables were proccessed properly
                    if(nonce===undefined){
                        console.log("INTO NO NONCE ERROR");
                        let response={
                            "statusCode":400,
                            "headers":{},
                            "body":"no nonce received",
                            "isBase64Encoded":"false"
                        };
                        callback(null,response);
                        return;
                    }else if(cart===undefined){
                        console.log("INTO NO CART ERROR");
                        let response={
                            "statusCode":400,
                            "headers":{},
                            "body":"no cart received",
                            "isBase64Encoded":"false"
                        };
                        callback(null,response);
                        return;
                    }else if(street===undefined){
                        console.log("INTO NO STREET ERROR");
                        let response={
                            "statusCode":400,
                            "headers":{},
                            "body":"no street received",
                            "isBase64Encoded":"false"
                        };
                        callback(null,response);
                        return;
                    }else if(city===undefined){
                        console.log("INTO NO CITY ERROR");
                        let response={
                            "statusCode":400,
                            "headers":{},
                            "body":"no city received",
                            "isBase64Encoded":"false"
                        };
                        callback(null,response);
                        return;
                    }else if(state===undefined){
                        console.log("INTO NO STATE ERROR");
                        let response={
                            "statusCode":400,
                            "headers":{},
                            "body":"no state received",
                            "isBase64Encoded":"false"
                        };
                        callback(null,response);
                        return;
                    }else if(zip===undefined){
                        console.log("INTO NO ZIP ERROR");
                        let response={
                            "statusCode":400,
                            "headers":{},
                            "body":"no zip received",
                            "isBase64Encoded":"false"
                        };
                        callback(null,response);
                        return;
                    }else if(recipient===undefined){
                        console.log("INTO NO RECIPIENT ERROR");
                        let response={
                            "statusCode":400,
                            "headers":{},
                            "body":"no recipient received",
                            "isBase64Encoded":"false"
                        };
                        callback(null,response);
                        return;
                    }

                    let paymentConnector=new PaymentConnector();
                    paymentConnector.getCartCost(cart).then(function(data){//Calculate cost of cart
                        amount=Number(data);//Amount

                        if(amount!==undefined){
                            let tax=Number(Number(amount*0.06).toFixed(2)); //Calculate tax

                            //Use Braintree gateway to complete the transaction
                            gateway.transaction.sale({
                                amount:Number(Number(amount)+Number(tip)+Number(serviceFee)+Number(tax)), //Calculate final cost
                                paymentMethodNonce:nonce, //Nonce from request
                                options:{
                                    submitForSettlement:true //Send payment
                                }
                            }).then(function(result){
                                console.log("braintree result:");
                                console.log(result);
                                if(result.success||result.transaction){//Payment submitted to braintree successfully
                                    console.log("success: "+result.success);
                                    console.log(result.transaction.id);
                                    //Submit order to server
                                    let orderConnector=new OrderConnector();

                                    //id (any #?)
                                    let id=null;
                                    //cart (done)
                                    //recipient (done)
                                    //paymentInfo (cash, card)
                                    let paymentInfo=result.transaction.id;
                                    //address (done)
                                    let address=""+street+", "+city+", "+state+", "+zip;
                                    //driver (done)
                                    let driver="-1";
                                    //subtotal (done)
                                    let subtotal=amount;
                                    //tax (done)
                                    //total (amount)
                                    let total=Number(amount)+Number(tip)+Number(serviceFee)+Number(tax);
                                    //status (done)
                                    let dbStatus="0";
                                        .then(dbResult => {
                                            console.log(result.success);
                                            console.log(result.transaction.id);
                                            console.log(result.transaction.creditCard.maskedNumber);
                                            console.log(result.transaction.processorResponseType);
                                            var bResult={
                                                "success":result.success,
                                                "id":result.transaction.id,
                                                "maskedNumber":result.transaction.creditCard.maskedNumber,
                                                "processorResponse":result.transaction.processorResponseType,
                                            }
                                            var response={
                                                "statusCode":200,
                                                "headers":{},
                                                "body":JSON.stringify(bResult),
                                                "isBase64Encoded":"false"
                                            };
                                            console.log(response);
                                            callback(null,response);
                                        }).catch((err) => {
                                            console.log(err)
                                            console.log("INTO CREATE ORDER CATCH");
                                                let response={
                                                    "statusCode":500,
                                                    "headers":{},
                                                    "body":JSON.stringify(err),
                                                    "isBase64Encoded":"false"
                                                };
                                                callback(null,response);
                                        });
                                }else{//Error submitting payment to braintree
                                    transactionErrors=result.errors.deepErrors();
                                    console.log("INTO CHECKOUT ERROR");
                                    let response={
                                        "statusCode":500,
                                        "headers":{},
                                        "body":JSON.stringify(formatErrors(transactionErrors)),
                                        "isBase64Encoded":"false"
                                    };
                                    callback(null,response);
                                }
                            }).catch((err)=>{
                                console.log("INTO CHECKOUT CATCH ERROR");
                                let response={
                                    "statusCode":500,
                                    "headers":{},
                                    "body":JSON.stringify(err),
                                    "isBase64Encoded":"false"
                                };
                                callback(null,response);
                            });
                        }else{
                            console.log("INTO NO AMOUNT ERROR");
                            let response={
                                "statusCode":400,
                                "headers":{},
                                "body":"no amount",
                                "isBase64Encoded":"false"
                            };
                            callback(null,response);
                        }
                    });
                }
            }else if(command.localeCompare("checkout2")===0){//API CALL POST to create cash order
                //Declare variables (initialized to undefined)
                let cart,amount,street,city,state,zip,recipient;
                let serviceFee=1; //Declare serviceFee variable

                console.log("EVENT BODY: "+JSON.stringify(event.body));
                //Query from app is a string data from lambda is already a JSON object
                try{
                    event.body=JSON.parse(event.body);
                }
                catch(e){
                    console.log("catch!")
                }

                if(event.body!=null&&event.body!==undefined){
                    //Get variables from body
                    cart=event.body.cart;
                    street=event.body.address.street;
                    city=event.body.address.city;
                    state=event.body.address.state;
                    zip=event.body.address.zip;
                    recipient=event.body.recipient;
                    //Check to see if variables were proccessed properly
                    if(cart===undefined){
                        console.log("INTO NO CART ERROR");
                        let response={
                            "statusCode":400,
                            "headers":{},
                            "body":"no cart received",
                            "isBase64Encoded":"false"
                        };
                        callback(null,response);
                        return;
                    }else if(street===undefined){
                        console.log("INTO NO STREET ERROR");
                        let response={
                            "statusCode":400,
                            "headers":{},
                            "body":"no street received",
                            "isBase64Encoded":"false"
                        };
                        callback(null,response);
                        return;
                    }else if(city===undefined){
                        console.log("INTO NO CITY ERROR");
                        let response={
                            "statusCode":400,
                            "headers":{},
                            "body":"no city received",
                            "isBase64Encoded":"false"
                        };
                        callback(null,response);
                        return;
                    }else if(state===undefined){
                        console.log("INTO NO STATE ERROR");
                        let response={
                            "statusCode":400,
                            "headers":{},
                            "body":"no state received",
                            "isBase64Encoded":"false"
                        };
                        callback(null,response);
                        return;
                    }else if(zip===undefined){
                        console.log("INTO NO ZIP ERROR");
                        let response={
                            "statusCode":400,
                            "headers":{},
                            "body":"no zip received",
                            "isBase64Encoded":"false"
                        };
                        callback(null,response);
                        return;
                    }else if(recipient===undefined){
                        console.log("INTO NO RECIPIENT ERROR");
                        let response={
                            "statusCode":400,
                            "headers":{},
                            "body":"no recipient received",
                            "isBase64Encoded":"false"
                        };
                        callback(null,response);
                        return;
                    }

                    let paymentConnector=new PaymentConnector();
                    paymentConnector.getCartCost(cart).then(function(data){//Calculate cost of cart
                        amount=Number(data);//Amount

                        if(amount!==undefined){
                            let orderConnector=new OrderConnector();

                            //id (any #?)
                            let id=null;
                            //cart (done)
                            //recipient (done)
                            //paymentInfo (done)
                            let paymentInfo="cash";
                            //address (done)
                            let address=""+street+", "+city+", "+state+", "+zip;
                            //driver (done)
                            let driver="-1";
                            //tax (done)
                            let tax=Number(Number(amount*0.06).toFixed(2)); //Calculate tax
                            //subtotal (done)
                            let subtotal=amount;
                            //total (done)
                            let total=Number(amount)+Number(serviceFee)+Number(tax);
                            //status (done)
                            let dbStatus="0";

                            //Submit order to server
                            orderConnector.createOrder(id,cart,recipient,paymentInfo,address,driver,subtotal,tax,total,dbStatus)
                            .then(dbResult => {
                                let response={
                                    "statusCode":200,
                                    "headers":{},
                                    "body":"success",
                                    "isBase64Encoded":"false"
                                };
                                callback(null,response);
                            }).catch(err =>{
                                console.log("INTO CREATE ORDER ERROR");
                                let response={
                                    "statusCode":500,
                                    "headers":{},
                                    "body":JSON.stringify(dbResult),
                                    "isBase64Encoded":"false"
                                };
                                callback(null,response);
                            });
                        }else{
                            console.log("INTO NO AMOUNT ERROR");
                            let response={
                                "statusCode":500,
                                "headers":{},
                                "body":"no amount",
                                "isBase64Encoded":"false"
                            };
                            callback(null,response);
                        }
                    });
                }
            }else if(command.localeCompare("refund")==0){
                console.log("REFUND");
                console.log(JSON.stringify(event.body));
                try{
                    event.body=JSON.parse(event.body);
                }
                catch(e){
                    console.log("catch!")
                }
                var transactionID=event.body.transactionID;
                if(transactionID===undefined){
                    console.log("INTO NO ID ERROR");
                    let response={
                        "statusCode":400,
                        "headers": {
                            "Access-Control-Allow-Origin" : "*",
                        },
                        "body":"no transactionID received",
                        "isBase64Encoded":"false"
                    };
                    callback(null,response);
                    return;
                }
                
                console.log(transactionID);
                
                
                gateway.transaction.refund(transactionID, function (err, result) {
                    if(err){
                        console.log("ERROR");
                        console.log(err);
                        let response={
                                "statusCode":500,
                                "headers": {
                                    "Access-Control-Allow-Origin" : "*",
                                },
                                "body":JSON.stringify(err),
                                "isBase64Encoded":"false"
                            };
                            callback(null,response);
                    }else{
                        console.log("result");
                        console.log(result);
                        let response={
                                "statusCode":500,
                                "headers": {
                                    "Access-Control-Allow-Origin" : "*",
                                },
                                "body":JSON.stringify(result.success),
                                "isBase64Encoded":"false"
                            };
                            callback(null,response);
                    }
                });
            }else if(command.localeCompare("client")===0){
                //Testing client functionality for transaction
                gateway.requestPaymentMethod(function(requestPaymentMethodErr,payload){
                    let response={
                        "statusCode":200,
                        "headers":{},
                        "body":JSON.stringify(payload.nonce),
                        "isBase64Encoded":"false"
                    };
                    callback(null,response);
                });
            }else{
                console.log("INTO INVALID REQUEST TYPE ERROR");
                let response={
                    "statusCode":400,
                    "headers":{},
                    "body":"Invalid request type",
                    "isBase64Encoded":"false"
                };
                callback(null,response);
            }

        }
    }else{
        console.log("INTO QUERY STRING IS NULL ERROR");
        let response={
            "statusCode":400,
            "headers":{},
            "body":"Query string is null",
            "isBase64Encoded":"false"
        };
        callback(null,response);
    }
};


