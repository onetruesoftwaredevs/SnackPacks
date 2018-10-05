//SnackConnect.js
//NODEJS ES5
//Purpose: abstract the process of working with the server

//Required libraries
var SnackPack = require('./SnackPack');

class SnackConnector{

	static getSnackPacks(){
		var url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks";
		var json = fetch(url);
		var jsonSnackPacks = JSON.parse(json);
		var SnackPacks = new Array();
		if (jsonSnackPacks === undefined) { return []; }
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
}
//Allows module to be exposed
module.exports = SnackConnector;