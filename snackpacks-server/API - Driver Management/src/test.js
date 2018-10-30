
// var SnackPack = require('./driver');
var driverDB = require('./driverConnect');

//TEST 
console.log("Test 2:");
console.log("Getting all snackpacks.");
var snackConnector = new driverDB();
// snackConnector.addDriver("Creighton Suter", "765-772-6806", "Chevrolet", "Equinox")
// 	.then(data => console.log(data))
// 	.catch(error => console.log(error));

snackConnector.getDriverByID(0)
	.then(data => console.log(data))
	.catch(error => console.log(error));