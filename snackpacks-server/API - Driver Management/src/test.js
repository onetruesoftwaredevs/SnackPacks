// var SnackPack = require('../src/snackpack');
// var SnackUser = require('../src/snackUser');
var snackDB = require('./driverConnect');

//TEST 
console.log("Test 1:");
var snackConnector = new snackDB();
// snackConnector.addReview(0, 5, "Alisa Reynya", "This is the best", 2, 2, "sdf aasdfasdfsa sadf asdf asdfa s")
// 	.then(data => console.log(data))
// 	.catch(error => console.log(error));

snackConnector.getReviewByID(0)
	.then(data => console.log(data))
	.catch(error => console.log(error));