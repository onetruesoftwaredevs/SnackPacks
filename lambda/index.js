'use strict';

var express=require('express');
var braintree=require('braintree');
// var routes=require('./routes/index'); //Current file
var router=express.Router();
var gateway=require('../src/gateway');

var TRANSACTION_SUCCESS_STATUSES=[
    braintree.Transaction.Status.Authorizing,
    braintree.Transaction.Status.Authorized,
    braintree.Transaction.Status.Settled,
    braintree.Transaction.Status.Settling,
    braintree.Transaction.Status.SettlementConfirmed,
    braintree.Transaction.Status.SettlementPending,
    braintree.Transaction.Status.SubmittedForSettlement
];

function formatErrors(errors){
    var formattedErrors='';

    for(var i in errors){
        if(errors.hasOwnProperty(i)){
            formattedErrors+='Error: '+errors[i].code+': '+errors[i].message+'\n';
        }
    }
    return formattedErrors;
}

function createResultObject(transaction){
    var result;
    var status=transaction.status;

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

//All the router.get calls --> lambda "functions"

//API CALL GET to getClientToken
router.get('/checkouts/new',function(req,res){

    //Server with customer ID to save cards in "braintree vault"
    /*gateway.clientToken.generate({
        customerId:aCustomerId
    }).then(function(err,response){
        var clientToken=response.clientToken
    });*/

    gateway.clientToken.generate({}).then(function(err,response){
        //Return client token
        var clientToken=response.clientToken;

        //TODO: check for error
        //Is this the proper way to return for the lambda function?
        res.send(response.clientToken);
    });

    /*Client:
     * app.get("/client_token", function (req, res) {
     * gateway.clientToken.generate({}, function (err, response) {
     *  res.send(response.clientToken);
     *  });
     *  });
     */

    // Using callbacks
    // gateway.clientToken.generate({}).then(function(err,response){
    //     //Send client token to client. This tries to render a web page, AND send the request
    //     res.render('checkouts/new',{clientToken:response.clientToken,messages:req.flash('error')});
    // });
});

//API CALL GET to checkout with ID of transaction
router.get('/checkouts/:id').then(function(req,res){
    var result;
    var transactionId=req.params.id;

    //update this to a db call by transaction id
    gateway.transaction.find(transactionId).then(function(err,transaction){
        result=createResultObject(transaction);

        //Return transaction to the client to update the transaction page
        //res.render('checkouts/show',{transaction:transaction,result:result});

        //Is this the proper way to return for the lambda function?
        res.send(transaction);
    });
});

//API CALL POST to checkout with payment_nonce
router.post('/checkouts',function(req,res){
    var transactionErrors;

    //var amount=req.body.amount; //TODO: Use db calls to get the cost of the cart values here
    var amount='10.00';
    var nonce=req.body.payment_method_nonce;//Receive nonce from client

    //Use Braintree gateway to complete the transaction
    gateway.transaction.sale({
        amount:amount,
        paymentMethodNonce:nonce,
        options:{
            submitForSettlement:true//Send payment
        }
    }).then(function(err,result){
        if(result.success||result.transaction){//SUCCESS
            //Return some sort of success message
            res.send(result);
            //res.redirect('checkouts/'+result.transaction.id);
        }else{//ERROR
            transactionErrors=result.errors.deepErrors();
            //return msg with errors (using the formatErrors();
            res.status(500).send(formatErrors(transactionErrors));
            //req.flash('error',{msg:formatErrors(transactionErrors)});
            //res.redirect('checkouts/new');
        }
    });
});

//Needs index export for lambda?
module.exports=router;
