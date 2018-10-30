// var SnackPack = require('../src/snackpack');
// var SnackUser = require('../src/snackUser');
var snackDB = require('./orderConnect');

//TEST 
console.log("Test 2:");
console.log("Getting all snackpacks.");
var snackConnector = new snackDB();
snackConnector.editOrderByID(5, {"subtotal":8.75, "tax":0.18, "status":"On the road!"})
	.then(data => console.log(data))
	.catch(error => console.log(error));
