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
            "headers": {},
            "body": JSON.stringify("Query String is Null"),
            "isBase64Encoded": "false"
        };
        callback(null, response);
    }
};
