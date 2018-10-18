var braintree=require("braintree");

var gateway=braintree.connect({
    environment:braintree.Environment.Sandbox,
    merchantId:'nb4sdg3y59thysfq',
    publicKey:'wx8b5t8rhxzcscmn',
    privateKey:'0c93596ee360a2bcc82b86ccce98d706'
});

gateway.clientToken.generate({
    customerId:aCustomerId
}).then(function(err,response){
    var clientToken=response.clientToken
});
/*Client: 
 * app.get("/client_token", function (req, res) {
 * gateway.clientToken.generate({}, function (err, response) {
 *  res.send(response.clientToken);
 *  });
 *  });
 */
