
var SnackPack = require('../src/snackpack');
var SnackUser = require('../src/snackUser');
var snackDB = require('../src/snackConnect');
//TEST 1
console.log("Test 1");
console.log("Success\n------------\n")

//TEST 2
console.log("Test 2:");
console.log("Deleting one snackpack.");
var snackConnector = new snackDB();
snackConnector.deleteSnackPackByID(9, function (err, result) {
	
});
