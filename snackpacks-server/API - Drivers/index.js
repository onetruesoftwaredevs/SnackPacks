var Order = require('./src/order.js');
var OrderConnect = require('./src/orderConnect.js');

exports.handler = function(event, context, callback){
    console.log(event);
    console.log(context);

    var queryString = event.queryStringParameters;
    if(queryString != null){
        var command = queryString.command;
        console.log(command);
        if(command != null){
            if(command.localeCompare("list") == 0){
                console.log("List\n");
                var OrderConnector = new OrderConnect();
                var promise = OrderConnector.getOrders();
                promise.then(function(result) {
                    var response = {
                        "statusCode": 200,
                        "headers": {},
                        "body": JSON.stringify(result),
                        "isBase64Encoded": "false"
                    };
                    callback(null, response);
                    console.log("Callback sent");
                }, function(err) {
                  console.log(err); // Error: "It broke"
                });
            } else if(command.localeCompare("own") == 0) {
                console.log("Own\n");
                var driverId = queryString.id;
                var OrderConnector = new OrderConnect();
                var promise = OrderConnector.getOrders();
                promise.then(function(result) {
                    for(var i = 0; i < result.length; i++) {
                        var obj = result[i];
                        if(obj._driver !== driverId){
                            delete result[i];
                        }
                    }
                    var response = {
                        "statusCode": 200,
                        "headers": {},
                        "body": JSON.stringify(result),
                        "isBase64Encoded": "false"
                    };
                    callback(null, response);
                    console.log("Callback sent");
                }, function(err) {
                  console.log(err); // Error: "It broke"
                });
            } else {
                console.log("Invalid\n");
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
        } else {
            console.log("Unknown\n");
                var response = {
                    "statusCode": 200,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": JSON.stringify("Unknown Query String"),
                    "isBase64Encoded": false
                };
                callback(null, response);
        }
    } else {
        var response = {
            "statusCode": 200,
            "headers": {},
            "body": JSON.stringify("Query String is Null"),
            "isBase64Encoded": "false"
        };
        callback(null, response);
    }
};
