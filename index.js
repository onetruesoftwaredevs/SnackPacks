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
                
                console.log(cart);
                
                var totalCost = 0;
                for(var i = 0; i < cart.length; i++){
                    var sp = SnackConnector.getSnackPackByID(cart[i][0], function(error, result){
                        console.log("Cost");
                        console.log(result.cost);
                    });
                    console.log(sp);
                    totalCost += sp.cost * cart[i][1];
                }
                
                console.log(totalCost);
                
                var response = {
                    "statusCode": 200,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": JSON.stringify("Received cart"),
                    "isBase64Encoded": false
                };
                callback(null, response);
           
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
