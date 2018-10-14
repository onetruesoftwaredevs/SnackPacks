
var SnackPack = require('../src/snackpack');
var SnackUser = require('../src/snackUser');
var snackDB = require('../src/snackConnect');
//TEST 1
console.log("Test 1");
console.log("Success\n------------\n")

//TEST 2
console.log("Test 2:");
console.log("Getting all snackpacks.");
var snackConnector = new snackDB();
snackConnector.getSnacks(function (err, result) {
	console.log("Result:");
	for(var x in result){
		console.log(result[x].name);
	}
	console.log("Success\n------------\n");
});
