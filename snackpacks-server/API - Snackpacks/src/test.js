// var SnackPack = require('../src/snackpack');
// var SnackUser = require('../src/snackUser');
var snackDB = require('../src/snackConnect');

//TEST 
console.log("Test 1:");
var snackConnector = new snackDB();
/*snackConnector.addReview(1, 5, "Donald Trump", "This is the best", 2, 2, "sdf aasdfasdfsa sadf asdf asdfa s")
	.then(data => console.log(data))
	.catch(error => console.log(error));

snackConnector.getReviewBySnackpackID(1)
 	.then(data => console.log(data))
 	.catch(error => console.log(error));
*/
snackConnector.getSnackPacks()
	.then(data => console.log(data[1]))
 	.catch(error => console.log(error));
