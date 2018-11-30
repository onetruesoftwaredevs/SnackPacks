var SnackPack = require('../src/snackpack');
var SnackUser = require('../src/snackUser');
var snackDB = require('../src/snackConnect');

//TEST 
console.log("Test 2:");
console.log("Getting all snackpacks.");
var snackConnector = new snackDB();
var query = {
	"address": "205 N. Martin Jischke Dr."
};
snackConnector.createUser("David,Blough", "Doritos5", query, 5, "", function (err, result) {
	if(result){
		console.log(ret.name)
		console.log("Success\n------------\n");
	}else{
		console.log("FAIL");
	}
});
