//SnackConnect.js
//NODEJS ES5
//Purpose: abstract the process of working with the database

//Required libraries
var SnackPack = require('./SnackPack');
var SnackUser = require('./SnackUser');
var mysql = require('mysql');

class SnackConnector{
	//SnackConnector constructor
	static init(){
		this.host = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks";
		this.user = "snackpacks";
		this.password = "e7p$yYzRa&RR_46u";
		this.port = 3306;
	}

	//get method to return array of SnackPacks
	static getSnackPacks(callback){
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
						// console.log(list_snackpacks);
						list_snackpacks.push(new SnackPack(pack.idsnackpacks, pack.name, pack.contents, pack.allergens, pack.image_path, pack.reviews, pack.cost, pack.rating));
						count++;
					}
					var formattedSPs = new Array();
					for(var i=0; i < list_snackpacks.length; i++){
						var formattedAllergens = new Array();
						for(var j=0; j < list_snackpacks[i].allergens.length; j++){
							formattedAllergens.push({key: list_snackpacks[i].allergens[j]});
						}
						formattedSPs.push({key: list_snackpacks[i].id, spprice: list_snackpacks[i].cost, sprating: list_snackpacks[i].rating, spallergylist: formattedAllergens});
					}
					return formattedSPs;
					callback(null, list_snackpacks);
				});
			});
		});
	}

	static getSnackPackByID(id, callback){
		//callback to initiate connection to AWS RDS
		var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
		connection.connect(function(err) {
			if (err) throw err;
			//callback to send query
			connection.query(`SELECT * FROM snackpacks.snackpacks where idsnackpacks=${id}`, function(err, result, fields){
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
						// console.log(list_snackpacks);
						list_snackpacks.push(new SnackPack(pack.idsnackpacks, pack.name, pack.contents, pack.allergens, pack.image_path, pack.reviews, pack.cost, pack.rating));
						count++;
					}
					return list_snackpacks[0];
					callback(null, list_snackpacks[0]);
				});
			});
		});
	}

	//createSnackPack
	//returns true if successful, otherwise returns false
	//todo add check
	static createSnackPack(name, contents, allergens, image_path, reviews, cost, rating, callback){
		var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
		connection.connect(function(err){
			if (err) throw err;
			console.log("Connected!");
			//Get new id number by using count
			connection.query("SELECT COUNT(*) FROM snackpacks.snackpacks", function(err, count_result, fields){
				if(err) throw err;
				connection.query(`SELECT * FROM snackpacks.users WHERE name=${name}`, function(err, found_result, fields){;
					//Structure query then submit
					connection.query(("INSERT INTO snackpacks.snackpacks VALUES (" + count_result[0]['COUNT(*)'] + ",\"" + name + "\",\"" + contents + "\",\"" + allergens + "\",\"" + image_path + "\",\"" + reviews + "\",\"" + cost + "\"," + rating + ")"), function(err, result, fields){
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
module.exports = SnackConnector;