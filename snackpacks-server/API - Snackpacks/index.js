let SnackPack = require('./src/snackpack.js');
let SnackConnect = require('./src/snackConnect.js');
let SnackUser = require('./src/snackUser.js');

exports.handler = function(event, context, callback){
    console.log(event);
    console.log(context);

    let queryString = event.queryStringParameters;
    if(queryString != null){
        let command = queryString.command;
        if(command != null){
            let SnackConnector = new SnackConnect();
            if(command.localeCompare("list") === 0){
                console.log("List\n");
                
                let promise = SnackConnector.getSnackPacks();
                
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
                SnackConnector.getSnackPacks(function(error, result){
                    
                });
            } else {
                console.log("Invalid\n");
                
                let response = {
                    "statusCode": 200,
                    "headers": {},
                    "body": JSON.stringify("Invalid Request Type"),
                    "isBase64Encoded": "false"
                };
                callback(null, response);
            }
        }
    } else {
        console.log("Unknown\n");
        
        let response = {
            "statusCode": 200,
            "headers": {},
            "body": JSON.stringify("Query String is Null"),
            "isBase64Encoded": "false"
        };
        callback(null, response);
    }
};
