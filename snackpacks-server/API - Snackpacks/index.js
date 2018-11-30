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
            }
            
            else if(command.localeCompare("rate") === 0) {
                console.log("Rate\n");
                
                // let x = JSON.parse(event.body);
                x = event.body;
                console.log(x);
                let promise = SnackConnector.addRating(x.id, x.rating);
                
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
            
            else if(command.localeCompare("review") === 0) {
                console.log("Review\n");
                
                let review = JSON.parse(event.body)

                let promise = SnackConnector.addReview(queryString.id, review.rating, review.author, review.title, 0, 0, review.review);
                
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
            
            else if(command.localeCompare("upvote") === 0) {
                console.log("Review\n");
                
                let promise = SnackConnector.upvote(queryString.id, queryString.rev);
                
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
            
            else if(command.localeCompare("downvote") === 0) {
                console.log("Review\n");
                
                let promise = SnackConnector.downvote(queryString.id, queryString.rev);
                
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
