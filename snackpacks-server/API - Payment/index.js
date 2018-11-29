'use strict';

let braintree=require('braintree');
let gateway=require('./src/gateway.js');
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
                //{"nonce":"nonce","tip":0,"cart":[{"key":0,"quantity":6},{"key":3,"quantity":10}]}
                let transactionErrors;
                //Declare variables (initialized to undefined)
                let tip,nonce,cart,amount,street,city,state,zip;

                //let tip=null; //Declare tip variable
                //let nonce=null; //Declare nonce variable
                //let amount=null; //Declare amount variable
                let serviceFee=1; //Declare serviceFee variable
                //event.body="{\"nonce\":\"tokencc_bc_9k6r9p_dcg5w3_2sfgn8_p5vgj7_52z\",\"tip\":0,\"cart\":[{\"key\":0,\"quantity\":1}]}";
                console.log("EVENT BODY: "+JSON.stringify(event.body));
                try{
                    event.body=JSON.parse(event.body);
                }
                catch(e){
                    console.log("caught!");
                    //Do nothing, running in test mode
                }
                if(event.body!=null&&event.body!==undefined){
                    nonce=event.body.nonce;//Set nonce to body's nonce
                    console.log("nonce: "+nonce);

                    cart=event.body.cart;
                    if(cart===undefined){
                        console.log("INTO NO CART ERROR");
                        let response={
                            "statusCode":400,
                            "headers":{},
                            "body":event.body,
                            "isBase64Encoded":"false"
                        };
                        callback(null,response);
                    }

                    //Check for int & absolute value of tip
                    console.log(parseFloat(event.body.tip,10));
                    //Get value of tip in float
                    if(event.body.tip==parseFloat(event.body.tip,10)&&event.body.tip!=null&&event.body.tip!==undefined) tip=Math.abs(event.body.tip);
                    else tip=0;

                    let paymentConnector=new PaymentConnector();
                    paymentConnector.getCartCost(cart).then(function(data){//Calculate cost of cart
                        amount=Number(data);//Amount

                        if(nonce!==undefined&&amount!==undefined){
                            let tax=Number(Number(amount*0.06).toFixed(2)); //Calculate tax
                            console.log("amount: "+amount+"\ntip: "+tip+"\nservice fee: "+serviceFee+"\ntax: "+tax+"\ntotal: "+Number(amount+tip+serviceFee+tax));//Logging
                            let subtotal=amount;
                            //Use Braintree gateway to complete the transaction
                            gateway.transaction.sale({
                                amount:Number(amount+tip+serviceFee+tax), //Calculate final cost
                                paymentMethodNonce:nonce, //Nonce from request
                                options:{
                                    submitForSettlement:true //Send payment
                                }
                            }).then(function(result){
                                if(result.success||result.transaction){//SUCCESS
                                    //TODO: submit order to server
                                    let orderConnector=new OrderConnector();

                                    //id (any #?)
                                    //cart (what format)
                                    //recipient (username?)
                                    //paymentInfo (cash, card)
                                    //address (what format)
                                    //driver (null?)
                                    //subtotal (done)
                                    //tax (done)
                                    //total (amount)
                                    //status (?)
                                    let total=amount;
                                    let dbResult=orderConnector.createOrder(id,cart,recipient,paymentInfo,address,driver,subtotal,tax,total,status);
                                    if(dbResult){
                                        let response={
                                            "statusCode":200,
                                            "headers":{},
                                            "body":JSON.stringify(result),
                                            "isBase64Encoded":"false"
                                        };
                                        callback(null,response);
                                    }else{
                                        //db err
                                        console.log("INTO CREATE ORDER ERROR");
                                        let response={
                                            "statusCode":500,
                                            "headers":{},
                                            "body":JSON.stringify(dbResult),
                                            "isBase64Encoded":"false"
                                        };
                                        callback(null,response);
                                    }
                                }else{//ERROR
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
                            console.log("INTO NO NONCE ERROR");
                            let response={
                                "statusCode":400,
                                "headers":{},
                                "body":event.body,
                                "isBase64Encoded":"false"
                            };
                            callback(null,response);
                        }
                    });
                }
            }else if(command.localeCompare("checkout2")===0){//API CALL POST to create cash order
                //Declare variables (initialized to undefined)
                let tip,cart,amount,street,city,state,zip;
                let serviceFee=1; //Declare serviceFee variable

                console.log("EVENT BODY: "+JSON.stringify(event.body));
                try{
                    event.body=JSON.parse(event.body);
                }
                catch(e){
                    console.log("caught!");
                    //Do nothing, running in test mode
                }

                if(event.body!=null&&event.body!==undefined){
                    cart=event.body.cart;
                    if(cart===undefined){
                        console.log("INTO NO CART ERROR");
                        let response={
                            "statusCode":400,
                            "headers":{},
                            "body":event.body,
                            "isBase64Encoded":"false"
                        };
                        callback(null,response);
                    }
                    //Get value of tip in float
                    if(event.body.tip==parseFloat(event.body.tip,10)&&event.body.tip!=null&&event.body.tip!==undefined) tip=Math.abs(event.body.tip);
                    else tip=0;

                    //Check for int & absolute value of tip
                    console.log(parseFloat(event.body.tip,10));

                    let paymentConnector=new PaymentConnector();
                    paymentConnector.getCartCost(cart).then(function(data){//Calculate cost of cart
                        amount=Number(data);//Amount

                        if(amount!==undefined){
                            let tax=Number(Number(amount*0.06).toFixed(2)); //Calculate tax
                            console.log("amount: "+amount+"\ntip: "+tip+"\nservice fee: "+serviceFee+"\ntax: "+tax+"\ntotal: "+Number(amount+tip+serviceFee+tax));//Logging
                            let subtotal=amount;
                            //TODO: submit order to server
                            let orderConnector=new OrderConnector();

                            //id (any #?)
                            //cart (what format)
                            //recipient (username?)
                            //paymentInfo (cash, card)
                            //address (what format)
                            //driver (null?)
                            //subtotal (done)
                            //tax (done)
                            //total (done)
                            //status (?)
                            let total=amount;
                            let dbResult=orderConnector.createOrder(id,cart,recipient,paymentInfo,address,driver,subtotal,tax,total,status);
                            if(dbResult){
                                let response={
                                    "statusCode":200,
                                    "headers":{},
                                    "body":JSON.stringify(result),
                                    "isBase64Encoded":"false"
                                };
                                callback(null,response);
                            }else{
                                //db err
                                console.log("INTO CREATE ORDER ERROR");
                                let response={
                                    "statusCode":500,
                                    "headers":{},
                                    "body":JSON.stringify(dbResult),
                                    "isBase64Encoded":"false"
                                };
                                callback(null,response);
                            }
                        }
                    }
                }
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
