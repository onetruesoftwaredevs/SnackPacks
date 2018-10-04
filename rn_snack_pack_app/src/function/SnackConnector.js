

var SnackPack = require('./SnackPack');

class snackConnector{  // The purpose of this entire class is just to get the snack pack data from the back-end.
	
	var jsonFormat = {"_id":1, "_name":"Testing SnackPack", "_contents": ["Food"], "_allergens":["Allergens"], "image_path":"", "reviews":"", "cost":20, "rating":4};
	var url;
	var jsonData;
	var SnackPacks;
	
	constructor(){
		url = 'https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/test';
		fetchAndLog();
		jsonSnackPacks = jsonData.SnackPacks;
		SnackPacks = new Array();
		for(var i=0; i<jsonSnackPacks.length; i++){
			SnackPacks.push(new SnackPack(jsonSnackPacks[i]));
		}
	}
	
	const fetchAndLog = async () => {
		const response = await fetch(url);
		const json = await response.json();
		jsonData = JSON.parse(json);
	}

}
//Allows module to be exposed
module.exports = snackConnector;