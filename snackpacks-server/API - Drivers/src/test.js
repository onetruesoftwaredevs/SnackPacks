
// var SnackPack = require('../src/snackpack');
// var SnackUser = require('../src/snackUser');
var snackDB = require('../src/orderConnect');

//TEST 
console.log("Test 2:");
// console.log("Getting all snackpacks.");
var snackConnector = new snackDB();
snackConnector.updateLocation(0, 55, 1234.122342)
	.then(data => console.log(data))
	.catch(error => console.log(error));
