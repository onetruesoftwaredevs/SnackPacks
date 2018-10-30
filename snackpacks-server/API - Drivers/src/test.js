// var SnackPack = require('../src/snackpack');
// var SnackUser = require('../src/snackUser');
var snackDB = require('./orderConnect');

//TEST 
console.log("Test 2:");
console.log("Getting all snackpacks.");
var snackConnector = new snackDB();
snackConnector.createOrder("dorito legends", "doritos", "dairy", 0, 0, 5, 0)
	.then(data => console.log(data))
	.catch(error => console.log(error));
