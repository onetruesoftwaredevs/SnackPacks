let RefundConnect = require('./src/refundConnector.js');

exports.handler = function(event, context, callback){
    console.log(event);
    console.log(context);

    let queryString = event.queryStringParameters;
    if(queryString != null){
        let command = queryString.command;
        console.log(command);
        if(command != null){
            let RefundConnector = new RefundConnect();

            if(command.localeCompare("list") == 0){
                console.log("List\n");

                let promise = RefundConnector.getRefunds();

                promise.then(function(result) {
                    let response = {
                        "statusCode": 200,
                        "headers": {
                            "Access-Control-Allow-Origin" : "*",
                        },
                        "body": JSON.stringify(result),
                        "isBase64Encoded": "false"
                    };
                    callback(null, response);
                    console.log("Callback sent");
                }, function(err) {
                  console.log(err); // Error: "It broke"
                });
            }

            else if(command.localeCompare("listById") == 0) {
                console.log("listById\n");

                let promise = RefundConnector.getRefundByOrderID(queryString.id);

                promise.then(function(result) {
                    for(let i = 0; i < result.length; i++) {
                        let obj = result[i];
                        if(obj._driver !== driverId){
                            delete result[i];
                        }
                    }
                    let response = {
                        "statusCode": 200,
                        "headers": {
                            "Access-Control-Allow-Origin" : "*",
                        },
                        "body": JSON.stringify(result),
                        "isBase64Encoded": "false"
                    };
                    callback(null, response);
                    console.log("Callback sent");
                }, function(err) {
                  console.log(err); // Error: "It broke"
                });
            }

            else if(command.localeCompare("add") == 0) {
                console.log("Add\n");
                let refund = JSON.parse(event.body);

                let promise = RefundConnector.addRefundCase(refund.orderId, refund.userId,
                  refund.reason, refund.amount);

                promise.then(function(result) {
                    let response = {
                        "statusCode": 200,
                        "headers": {
                            "Access-Control-Allow-Origin" : "*",
                        },
                        "body": JSON.stringify(result),
                        "isBase64Encoded": "false"
                    };
                    callback(null, response);
                    console.log("Callback sent");
                }, function(err) {
                  console.log(err); // Error: "It broke"
                });
            }

            else if(command.localeCompare("setStatus") == 0) {
                console.log("Setting Status\n");
                console.log("id: "+queryString.id+" status: "+queryString.status);
                let promise = RefundConnector.setRefundStatus(queryString.id, queryString.status);

                promise.then(function(result) {
                    let response = {
                        "statusCode": 200,
                        "headers": {
                            "Access-Control-Allow-Origin" : "*",
                        },
                        "body": JSON.stringify(result),
                        "isBase64Encoded": "false"
                    };
                    callback(null, response);
                    console.log("Callback sent");
                }, function(err) {
                  console.log(err); // Error: "It broke"
                });
            }

            else if(command.localeCompare("checkStatus") == 0) {
                console.log("Check Status\n");

                let promise = RefundConnector.checkRefundStatus(queryString.id);

                promise.then(function(result) {
                    let response = {
                        "statusCode": 200,
                        "headers": {
                            "Access-Control-Allow-Origin" : "*",
                        },
                        "body": JSON.stringify(result),
                        "isBase64Encoded": "false"
                    };
                    callback(null, response);
                    console.log("Callback sent");
                }, function(err) {
                  console.log(err); // Error: "It broke"
                });
            }

            else {
                console.log("Invalid\n");
                
                let response = {
                    "statusCode": 200,
                    "headers": {
                            "Access-Control-Allow-Origin" : "*",
                        },
                    "body": JSON.stringify("Invalid Request Type"),
                    "isBase64Encoded": false
                };
                callback(null, response);
            }
        } else {
            console.log("Unknown\n");

            let response = {
                "statusCode": 200,
                "headers": {
                            "Access-Control-Allow-Origin" : "*",
                        },
                "body": JSON.stringify("Unknown Query String"),
                "isBase64Encoded": false
            };
            callback(null, response);
        }
    } else {
        console.log("NULL\n");

        let response = {
            "statusCode": 200,
            "headers": {
                            "Access-Control-Allow-Origin" : "*",
                        },
            "body": JSON.stringify("Query String is Null"),
            "isBase64Encoded": "false"
        };
        callback(null, response);
    }
};
