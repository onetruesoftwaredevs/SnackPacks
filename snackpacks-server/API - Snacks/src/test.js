
// var SnackPack = require('../src/snackpack');
// var SnackUser = require('../src/snackUser');
var snackDB = require('../src/snackConnect');

//TEST 
console.log("Test 2:");
// console.log("Getting all snackpacks.");
var snackConnector = new snackDB();
snackConnector.getSnacks()
	.then(data => console.log(data))
	.catch(error => console.log(error));
