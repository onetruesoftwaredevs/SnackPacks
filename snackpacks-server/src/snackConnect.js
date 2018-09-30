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
		//callback to initiate connection to AWS RDS
		var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
		connection.connect(function(err) {
			if (err) throw err;
			//callback to send query
			connection.query("SELECT * FROM snackpacks.snackpacks", function(err, result, fields){
				if (err) throw err;
				//callback to end connection
				connection.end(function(err) {
					if (err) {
						return console.log('error:' + err.message);
					}
					var count = 0;
					var list_snackpacks=[];
					for(var r in result){
						var pack = result[r];
						console.log(list_snackpacks);
						list_snackpacks.push(new SnackPack(pack.idsnackpacks, pack.name, pack.contents, pack.allergens, pack.image_path, pack.reviews, pack.cost));
						count++;
					}
					callback(null, list_snackpacks);
				});
			});
		});
	}

	//createSnackPack
	//returns true if successful, otherwise returns false
	//todo add check
	createSnackPack(name, contents, allergens, image_path, reviews, cost, callback){
		var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
		connection.connect(function(err){
			if (err) throw err;
			console.log("Connected!");
			//Get new id number by using count
			connection.query("SELECT COUNT(*) FROM snackpacks.snackpacks", function(err, count_result, fields){
				if(err) throw err;
				connection.query(`SELECT * FROM snackpacks.users WHERE name=${name}`, function(err, found_result, fields){;
					//Structure query then submit
					connection.query(("INSERT INTO snackpacks.snackpacks VALUES (" + count_result[0]['COUNT(*)'] + ",\"" + name + "\",\"" + contents + "\",\"" + allergens + "\",\"" + image_path + "\",\"" + reviews + "\"," + cost + ")"), function(err, result, fields){
						connection.end(function (err){
							if(found_result){
								callback(null, false);
							}else{
								console.log(count_result[0]['COUNT(*)']);
								callback(null, true);
							}
						});
					});
				});
			});
		});
	}
}
//Allows module to be exposed
module.exports = snackConnector;