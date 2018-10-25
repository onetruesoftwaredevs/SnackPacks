
var SnackPack = require('./src/snackpack');
var SnackUser = require('./src/snackUser');
var snackDB = require('./src/snackConnect');

//TEST 
console.log("Test 2:");
console.log("Getting all snackpacks.");
var snackConnector = new snackDB();
snackConnector.createSnackPack("legends", "doritos", "dairy", "www.google.com", "", 5)
	.then(data => console.log(data))
	.catch(error => console.log(error));