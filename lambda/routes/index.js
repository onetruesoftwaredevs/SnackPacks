'use strict';

var express=require('express');
var braintree=require('braintree');
// var routes=require('./routes/index'); //Current file
var router=express.Router();
var gateway=require('../lib/gateway');

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
            header:'Sweet Success!',
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

//API CALL GET to getClientToken
router.get('/checkouts/new',function(req,res){
    gateway.clientToken.generate({}).then(function(err,response){
        //Send client token to client. This tries to render a web page, AND send the request
        //Just send JSON
        res.render('checkouts/new',{clientToken:response.clientToken,messages:req.flash('error')});
    });
});

//API CALL GET to checkout with ID of transaction from post
router.get('/checkouts/:id').then(function(req,res){
    var result;
    var transactionId=req.params.id;

    //update this to a db call by transaction id
    gateway.transaction.find(transactionId).then(function(err,transaction){
        result=createResultObject(transaction);
        //RETURN This to the client to update the transaction page
        //JSON
        res.render('checkouts/show',{transaction:transaction,result:result});
    });
});

//API CALL POST to checkout with payment_nonce
router.post('/checkouts',function(req,res){
    var transactionErrors;
    //TODO DB call to get snackpack amounts from id
    var amount=req.body.amount;
    var nonce=req.body.payment_method_nonce;

    gateway.transaction.sale({
        amount:amount,
        paymentMethodNonce:nonce,
        options:{
            submitForSettlement:true
        }
    }).then(function(err,result){
        if(result.success||result.transaction){
            res.redirect('checkouts/'+result.transaction.id);
        }else{
            transactionErrors=result.errors.deepErrors();
            req.flash('error',{msg:formatErrors(transactionErrors)});
            res.redirect('checkouts/new');
        }
    });
});

module.exports=router;
