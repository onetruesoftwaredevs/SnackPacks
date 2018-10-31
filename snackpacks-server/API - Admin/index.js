let Order = require('./src/order.js');
let OrderConnect = require('./src/orderConnect.js');
let SnackConnect = require('./src/snackConnect.js');
let SnackPack = require('./src/snackpack.js');

exports.handler = function(event, context, callback){
    console.log(event);
    console.log(context);

    let queryString = event.queryStringParameters;
    if(queryString != null){
        let command = queryString.command;
        console.log(command);
        if(command != null){
            let SnackConnector = new SnackConnect();
            if(command.localeCompare("add") === 0){
                console.log("Add\n");
                
                let promise = SnackConnector.createSnackPack(
                event.body.name, event.body.contents, event.body.allergens,
                event.body.image_paths, event.body.reviews, event.body.cost, event.body.rating);
                
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
                    console.log(err);
                });
            }
            
            else if(command.localeCompare("delete") === 0) {
                console.log("Delete\n");
                
                let promise = SnackConnector.deleteSnackPackByID(queryString.id);
                
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
                console.log(err);
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
