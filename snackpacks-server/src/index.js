var SnackPack = require('./snackpacks-server/src/snackpack.js');
var SnackConnect = require('./snackpacks-server/src/snackConnect.js');
var SnackUser = require('./snackpacks-server/src/snackUser.js');

exports.handler = function(event, context, callback){
   var SnackConnector = new SnackConnect();
   SnackConnector.getSnackPacks(function(error, result){

       console.log("T1");

       var response = {
           statusCode: 200,
           body: result
       };

       callback(null, response);
   });
};