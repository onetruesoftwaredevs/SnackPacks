
var SnackPack = require('../src/snackpack');
var SnackUser = require('../src/snackUser');
var snackDB = require('../src/snackConnect');
//TEST 1
console.log("Test 1");
console.log("Success\n------------\n")

//TEST 2
console.log("Test 2:");
console.log("Getting a snackpacks.");
var snackConnector = new snackDB();
var x;
snackConnector.getSnackPackByID(1, function(error, result){
	console.log(result.name);
});