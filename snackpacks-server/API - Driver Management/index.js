var Order = require('./src/order.js');
var OrderConnect = require('./src/orderConnect.js');

exports.handler = function(event, context, callback){
    console.log(event);
    console.log(context);

    var queryString = event.queryStringParameters;
    if(queryString != null){
        var command = queryString.command;
        if(command != null){
            if(command.localeCompare("list") == 0){
                var OrderConnector = new OrderConnect();
                OrderConnector.getSnackPacks(function(error, result){

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
