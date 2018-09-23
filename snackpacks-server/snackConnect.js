//snackConnect.js
//NODEJS ES5
//Purpose: abstract the process of working with the database

//Required libraries
var SnackPack = require('./snackpack');
var mysql = require('mysql');

//snackConnector constructor
function snackConnector(){
	this.host = process.env.RDS_HOSTNAME;
	this.user = process.env.RDS_USERNAME;
	this.password = process.env.RDS_PASSWORD;
	this.port = process.env.RDS_PORT;
}

//get method to return array of snackPacks
snackConnector.prototype.getSnackPacks(){
	var list_snackpacks={}
	var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
	connection.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		connection.query("SELECT * FROM snackpacks.snackpacks", function(err, result, fields){
			if (err) throw err;
			var count = 0;
			for(r in result){
				snackPacks.push(snackpack(count, r.name, r.contents, r.allergens, r.image_path, r.reviews, r.cost));
				count++;
			}
		})
	});

	return list_snackpacks;
}

//Allows module to be exposed
module.exports = snackConnector;