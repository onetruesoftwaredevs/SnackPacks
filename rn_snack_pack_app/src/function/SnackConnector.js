//SnackConnect.js
//NODEJS ES5
//Purpose: abstract the process of working with the server

//Required libraries
var SnackPack = require('./SnackPack');

class SnackConnector{
	var url;
	var jsonData;

	static getSnackPacks(){
		url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks";
		fetchAndLog();
		var jsonSnackPacks = jsonData.SnackPacks;
		var SnackPacks = new Array();
		for(var i=0; i<jsonSnackPacks.length; i++){
			SnackPacks.push(new SnackPack(jsonSnackPacks[i]));
		}
		var formattedSPs = new Array();
		for(var i=0; i < SnackPacks.length; i++){
			var formattedAllergens = new Array();
			for(var j=0; j < SnackPacks[i].allergens.length; j++){
				formattedAllergens.push({key: SnackPacks[i].allergens[j]});
			}
			formattedSPs.push({key: SnackPacks[i].id, spprice: SnackPacks[i].cost, sprating: SnackPacks[i].rating, spallergylist: formattedAllergens});
		}
		return formattedSPs;	
	}
	
	const fetchAndLog = async () => {
		const response = await fetch(url);
		const json = await response.json();
		jsonData = JSON.parse(json);
	}
}
//Allows module to be exposed
module.exports = SnackConnector;