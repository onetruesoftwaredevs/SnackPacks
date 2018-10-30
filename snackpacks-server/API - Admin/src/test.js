
// var SnackPack = require('../snackpack');
// var SnackUser = require('../src/snackUser');
var snackDB = require('./snackConnect');

//TEST 
console.log("Test 2:");
console.log("Getting all snackpacks.");
var snackConnector = new snackDB();
snackConnector.editSnackPackByID(9, {"name":"nicole's jellies"})
	.then(data => console.log(data))
	.catch(error => console.log(error));
