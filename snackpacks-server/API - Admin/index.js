var Order = require('./src/order.js');
var OrderConnect = require('./src/orderConnect.js');
var SnackConnect = require('./src/snackConnect.js');
var SnackPack = require('./src/snackpack.js');

exports.handler = function(event, context, callback){
    console.log(event);
    console.log(context);

    var queryString = event.queryStringParameters;
    if(queryString != null){
        var command = queryString.command;
        if(command != null){
            var SnackConnector = new SnackConnect();
            if(command.localeCompare("add") === 0){
              var promise = SnackConnector.createSnackPack(
                event.body.name, event.body.contents, event.body.allergens,
                event.body.image_paths, event.body.reviews, event.body.cost, event.body.rating);
                
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
                console.log(err);
              });
            }
            
            else if(command.localeCompare("delete") === 0) {
                var promise = SnackConnector.deleteSnackPackByID(event.body.id);
                
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
                console.log(err);
              });
            }
            
            else {
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
