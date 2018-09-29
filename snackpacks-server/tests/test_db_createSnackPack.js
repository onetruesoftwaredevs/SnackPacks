
var SnackPack = require('../src/snackpack');
var SnackUser = require('../src/snackUser');
var snackDB = require('../src/snackConnect');

//TEST 
console.log("Test 2:");
console.log("Getting all snackpacks.");
var snackConnector = new snackDB();
snackConnector.createSnackPack("dorito legends", "doritos", "dairy", "www.google.com", "", 5, function (err, result) {
	if(result){
		console.log("Success\n------------\n");
	}else{
		console.log("FAIL");
	}
});
