let DriverConnect = require('./src/driverConnect.js');

exports.handler = function(event, context, callback){
    console.log(event);
    console.log(context);

    let queryString = event.queryStringParameters;
    if(queryString != null){
        let command = queryString.command;
        if(command != null){
            let DriverConnector = new DriverConnect();
            if(command.localeCompare("list") == 0){
                console.log("List\n");
                
                let promise = DriverConnector.getDrivers();
                
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
            
            else if(command.localeCompare("add") == 0){
                console.log("Add\n");

                let promise = DriverConnector.addDriver(
                event.body.name, event.body.phone, event.body.carmodel, event.body.carmake );
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
                
                let promise = DriverConnector.deleteByID(queryString.id);
                
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
