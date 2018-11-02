let Order = require('./src/order.js');
let OrderConnect = require('./src/orderConnect.js');

exports.handler = function(event, context, callback){
    console.log(event);
    console.log(context);

    let queryString = event.queryStringParameters;
    if(queryString != null){
        let command = queryString.command;
        console.log(command);
        if(command != null){
            let OrderConnector = new OrderConnect();
            
            if(command.localeCompare("list") == 0){
                console.log("List\n");
                
                let promise = OrderConnector.getOrders();
                
                promise.then(function(result) {
                    let response = {
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
            }
            
            else if(command.localeCompare("own") == 0) {
                console.log("Own\n");
                
                let driverId = queryString.id;
                let promise = OrderConnector.getOrders();
                
                promise.then(function(result) {
                    for(let i = 0; i < result.length; i++) {
                        let obj = result[i];
                        if(obj._driver !== driverId){
                            delete result[i];
                        }
                    }
                    let response = {
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
            }
            
            else if(command.localeCompare("add") == 0) {
                console.log("Add\n");
                
                let promise = OrderConnector.createOrder(event.body.id, event.body.cart, event.body.recipient,
                    event.body.paymentInfo, event.body.address, event.body.driver,
                    event.body.subtotal, event.body.tax, event.body.total, event.body.status);
                    
                promise.then(function(result) {
                    let response = {
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
            }
            
            else if(command.localeCompare("edit") == 0) {
                console.log("Edit\n");
                
                let order = JSON.parse(event.body);
                
                let promise = OrderConnector.editOrderByID(queryString.id, order);
                
                promise.then(function(result) {
                    let response = {
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
            }
            
            /* else if(command.localeCompare("status") == 0) {
                console.log("Status\n");
                
                let order = JSON.parse(event.body);
                
                let promise = OrderConnector.editOrderByID(queryString.id, order);
                
                promise.then(function(result) {
                    let response = {
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
            } */
            
            else if(command.localeCompare("delete") == 0) {
                console.log("Delete\n");
                
                let promise = OrderConnector.deleteOrderByID(queryString.id);
                
                promise.then(function(result) {
                    let response = {
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
            }
            
            else {
                console.log("Invalid\n");
                
                let response = {
                    "statusCode": 200,
                    "headers": {},
                    "body": JSON.stringify("Invalid Request Type"),
                    "isBase64Encoded": false
                };
                callback(null, response);
            }
        } else {
            console.log("Unknown\n");
            
            let response = {
                "statusCode": 200,
                "headers": {},
                "body": JSON.stringify("Unknown Query String"),
                "isBase64Encoded": false
            };
            callback(null, response);
        }
    } else {
        console.log("NULL\n");
        
        let response = {
            "statusCode": 200,
            "headers": {},
            "body": JSON.stringify("Query String is Null"),
            "isBase64Encoded": "false"
        };
        callback(null, response);
    }
};
