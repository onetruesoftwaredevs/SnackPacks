//snackConnect.js
//NODEJS ES5
//Purpose: abstract the process of working with the database

//Required libraries
var SnackPack = require('./snackpack');
var SnackUser = require('./snackUser')
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

//Method to create a user in the database
//Returns a SnackUser datatype
snackConnector.prototype.createUser(name, address, rewardsPoints, paymentInfo){
	var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
	var id_num;
	connection.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		connection.query("SELECT COUNT(*) FROM snackpacks.users", function(err, result, fields){
			if(err) throw err;
			id_num = result;
		});
		var query = "INSERT INTO snackpacks.users VALUES (" + id_num + "," + name + "," + address + ", null, 0, \"payment\")";
		connection.query(query, function(err, result, fields){
			if (err) throw err;
			console.log("success");
		});
	});

	return SnackUser(id_num, name, address, null, 0, "payment");
}

//Allows module to be exposed
module.exports = snackConnector;