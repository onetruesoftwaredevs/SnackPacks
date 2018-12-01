'use strict';

var braintree=require('braintree');
var environment,gateway;

gateway=braintree.connect({
    //Sets up environment for Braintree into "gateway" variable

    //Not production yet...
/*
    var gateway = braintree.connect({
    environment: braintree.Environment.Production,
    merchantId: "YOUR_PRODUCTION_MERCHANT_ID",
    publicKey: "YOUR_PRODUCTION_PUBLIC_KEY",
    privateKey: "YOUR_PRODUCTION_PRIVATE_KEY"
});
*/

    //Sandbox:
    environment:braintree.Environment.Sandbox,
    merchantId:'nb4sdg3y59thysfq',
    publicKey:'wx8b5t8rhxzcscmn',
    privateKey:'0c93596ee360a2bcc82b86ccce98d706'
});

module.exports=gateway;
