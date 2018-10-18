/*'use strict';

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
*/


var express=require('express');
var router=express.Router();
var braintree=require('braintree');
var gateway=require('../lib/gateway');

router.post('/',function(req,res,next){

    // Use the payment method nonce here
    var nonceFromTheClient=req.body.paymentMethodNonce;
    // Create a new transaction for $10
    var newTransaction=gateway.transaction.sale({
        //amount: (DB call for each item in cart)
        amount:'10.00',
        paymentMethodNonce:nonceFromTheClient,
        options:{
            // This option requests the funds from the transaction
            // once it has been authorized successfully
            submitForSettlement:true
        }
    }).then(function(error,result){
        if(result){
            res.send(result);
        }else{
            res.status(500).send(error);
        }
    });
});

module.exports=router;
