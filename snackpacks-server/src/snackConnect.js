//snackConnect.js
//NODEJS ES5
//Purpose: abstract the process of working with the database

//Required libraries
var SnackPack = require('./snackpack');
var SnackUser = require('./snackUser');
var mysql = require('mysql');
class snackConnector{
	//snackConnector constructor
	constructor(){
		this.host = "snackpacksdb.cawigtgndeba.us-east-2.rds.amazonaws.com";
		this.user = "snackpacks";
		this.password = "e7p$yYzRa&RR_46u";
		this.port = 3306;
	}

	//get method to return array of snackPacks
	getSnackPacks(callback){
		var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
		connection.connect(function(err) {
			if (err) throw err;
			connection.query("SELECT * FROM snackpacks.snackpacks", function(err, result, fields){
				if (err) throw err;
				connection.end(function(err) {
					if (err) {
						return console.log('error:' + err.message);
					}
					// console.log("Accessing!");
					var count = 0;
					var list_snackpacks=[];
					for(var r in result){
						var pack = result[r];
						console.log(list_snackpacks);
						list_snackpacks.push(new SnackPack(count, pack.name, pack.contents, pack.allergens, pack.image_path, pack.reviews, pack.cost));
						count++;
					}
					// console.log(list_snackpacks);
					// console.log("Done!");
					// console.log('Close the database connection.');
					callback(null, list_snackpacks);
				});
			});
		});

		// return "list_snackpacks";
	}

	//createSnackPack
	//returns true if successful, otherwise returns false 
	createSnackPack(name, contents, allergens, image_path, reviews, cost, callback){
		var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
		connection.connect(function(err){
			if (err) throw err;
			console.log("Connected!");
			//Get new id number by using count
			connection.query("SELECT COUNT(*) FROM snackpacks.snackpacks", function(err, count_result, fields){
				if(err) throw err;
				//Structure query then submit
				connection.query(("INSERT INTO snackpacks.snackpacks VALUES (" + count_result[0]['COUNT(*)'] + ",\"" + name + "\",\"" + contents + "\",\"" + allergens + "\",\"" + image_path + "\",\"" + reviews + "\"," + cost + ")"), function(err, result, fields){
					connection.end(function (err){
						if(err){
							throw err;
						}
						console.log(count_result[0]['COUNT(*)']);
						var ret = true;
						callback(null, ret);
					});
				});
			});
		});
	}

	//Method to create a user in the database
	//Returns a SnackUser datatype if success, returns false if error at any point
	createUser(name, password, address, rewardsPoints, paymentInfo, callback){
		var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
		var id_num;
		connection.connect(function(err) {
			if (err) throw err;
			console.log("Connected!");
			connection.query("SELECT COUNT(*) FROM snackpacks.users", function(err, count_result, fields){
				if(err) throw err;
				connection.query(("INSERT INTO snackpacks.users VALUES (" + count_result[0]['COUNT(*)'] + "," + name + "," + address + ", null, 0, \"payment\")"), function(err, result, fields){
					if (err) throw err;
					console.log("success");
					var ret = new SnackUser(id_num, name, address, null, 0, "payment");
					callback(null, ret);
				});
			});
		});

		// return SnackUser(id_num, name, address, null, 0, "payment");
	}

	//Accessor method to get a certain user by name and password
	//returns a SnackUser object
	//TODO: integrate more secure authentication
	getUser(name, password){
		var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
		var ret;
		connection.connect(function(err) {
			if (err) throw err;
			console.log("Connected!");
			connection.query(("SELECT * FROM snackpacks.users where name = " + name + " password = " + password), function(err, result, fields) {
				if (err) throw err;
				ret = result[0];
				console.log("success");
			});
		});
		return SnackUser(ret.iduser, ret.name, ret.addresses, ret.prevOrders, ret.rewardsPoints, ret.paymentInfo);
	}
}
//Allows module to be exposed
module.exports = snackConnector;