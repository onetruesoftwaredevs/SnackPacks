var SnackPack = require('./snackpacks-server/src/snackpack.js');
var SnackConnect = require('./snackpacks-server/src/snackConnect.js');
var SnackUser = require('./snackpacks-server/src/snackUser.js');

exports.handler = function(event, context, callback){
    console.log(event);
    console.log(context);
    
    var queryString = event.queryStringParameters;
    if(queryString != null){
        var command = queryString.command;
        if(command != null){
            if(command.localeCompare("list") == 0){
                var SnackConnector = new SnackConnect();
                SnackConnector.getSnackPacks(function(error, result){

                    var response = {
                        "statusCode": 200,
                        "headers": {
                        "my_header": "my_value"
                        },
                        "body": JSON.stringify(result),
                        "isBase64Encoded": false
                    };
                    console.log(response);
                    callback(null, response);
                    console.log("Callback sent");
                });
            } else if(command.localeCompare("cart") == 0){
                var SnackConnector = new SnackConnect();
                var cart = JSON.parse(event.body);
                // for(var i in cart){
                //     cart[i] = cart[i][0];
                // }
                console.log(cart);
                
                SnackConnector.getCartCost(cart, function(error, result){

                    var response = {
                        "statusCode": 200,
                        "headers": {
                        "my_header": "my_value"
                        },
                        "body": JSON.stringify(result),
                        "isBase64Encoded": false
                    };
                    console.log(response);
                    callback(null, response);
                    console.log("Callback sent");
                });
           
            } else {
            var response = {
                    "statusCode": 200,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": JSON.stringify("Invalid Request Type"),
                    "isBase64Encoded": false
                };
                callback(null, response);
            }
        }
    } else {
        var response = {
            "statusCode": 200,
            "headers": {
                "my_header": "my_value"
            },
            "body": JSON.stringify("QueryString is null"),
            "isBase64Encoded": false
        };
        callback(null, response);
    }
};
