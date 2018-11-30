//Change this into API endpoint call

var express = require('express');
var router = express.Router();
var braintree = require('braintree');

router.post('/', function(req, res, next) {
    var gateway = braintree.connect({
        environment: braintree.Environment.Sandbox,
        // Use your own credentials from the sandbox Control Panel here
        merchantId: '<use_your_merchant_id>',
        publicKey: '<use_your_public_key>',
        privateKey: '<use_your_private_key>'
    });

    // Use the payment method nonce here
    var nonceFromTheClient = req.body.paymentMethodNonce;
    // Create a new transaction for $10
    var newTransaction = gateway.transaction.sale({
        amount: '10.00',
        paymentMethodNonce: nonceFromTheClient,
        options: {
            // This option requests the funds from the transaction
            // once it has been authorized successfully
            submitForSettlement: true
        }
    }, function(error, result) {
        if (result) {
            res.send(result);
        } else {
            res.status(500).send(error);
        }
    });
});

module.exports = router;