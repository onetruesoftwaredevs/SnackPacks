var SnackPack = require('./src/snackpack.js');
var SnackConnect = require('./src/snackConnect.js');
var SnackUser = require('./src/snackUser.js');

exports.handler = function(event, context, callback){
    console.log(event);
    console.log(context);

    var queryString = event.queryStringParameters;
    if(queryString != null){
        var command = queryString.command;
        if(command != null){
            if(command.localeCompare("list") == 0){
                var SnackConnector = new SnackConnect();
                var promise = SnackConnector.getSnackPacks()
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
                SnackConnector.getSnackPacks(function(error, result){
                    
                });
            } else {
            var response = {
                    "statusCode": 200,
                    "headers": {},
                    "body": JSON.stringify("Invalid Request Type"),
                    "isBase64Encoded": "false"
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
