let blacklistConnect = require('./src/blackListConnect.js');

exports.handler = function(event, context, callback){
    console.log(event);
    console.log(context);

    let queryString = event.queryStringParameters;
    if(queryString != null){
        let command = queryString.command;
        if(command != null){
            let blacklistConnector = new blacklistConnect();
            if(command.localeCompare("list") == 0){
                console.log("List\n");

                let promise = blacklistConnector.getBlackListedUsers();

                promise.then(function(result) {
                    let response = {
                        "statusCode": 200,
                        "headers": {
                        },
                        "body": JSON.stringify(result),
                        "isBase64Encoded": false
                    };

                    callback(null, response);
                    console.log("Callback sent");
                });
            }

            else if(command.localeCompare("listById") == 0){
                console.log("List by ID\n");

                let promise = blacklistConnector.getBlackListedUserByID(queryString.id);

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

            else if(command.localeCompare("addReport") === 0) {
                console.log("Add Report\n");

                let reason = JSON.parse(body);

                let promise = blacklistConnector.reportBlackListedUser(queryString.id, reason);

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

            else if(command.localeCompare("setStatus") === 0) {
                console.log("Set Status\n");

                let promise = blacklistConnector.setBlackListUserStatus(queryString.id, queryString.status);

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

            else if(command.localeCompare("checkStatus") === 0) {
                console.log("Check Status\n");

                let promise = blacklistConnector.checkUserStatus(queryString.id);

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

            else if(command.localeCompare("clear") === 0) {
                console.log("Clear\n");

                let promise = blacklistConnector.cleanDatabase();

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
        }   else {
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
        console.log("Unknown\n");

        let response = {
            "statusCode": 200,
            "headers": {
            },
            "body": JSON.stringify("QueryString is null"),
            "isBase64Encoded": false
        };
        callback(null, response);
    }
};
