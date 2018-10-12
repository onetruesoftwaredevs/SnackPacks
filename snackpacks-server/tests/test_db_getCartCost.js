
var SnackPack = require('../src/snackpack');
var SnackUser = require('../src/snackUser');
var snackDB = require('../src/snackConnect');


function util(err, result){
	//put what you wanna do with cart stuff in here
	console.log(result);
}


//TEST 1
console.log("Test 1");
console.log("Success\n------------\n")

//TEST 2

console.log("Test 2:");
console.log("Getting all snackpacks.");
var snackConnector = new snackDB();

var u = snackConnector.getCartCost(["1", "2", "3"], util);
console.log(u)snackConnector.getCartCost([[1,1], [1,1]], util);
// console.log(u)