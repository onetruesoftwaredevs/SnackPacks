//snackConnect.js
//NODEJS ES5
//Purpose: abstract the process of working with the database

//Required libraries
//Custom libs
var SnackPack = require('./snackpack');
var Snack = require('./Snack');

//Other
var mysql = require('mysql');

class snackConnector{
	//snackConnector constructor
	constructor(){
		this.host = "snackpacksdb.cawigtgndeba.us-east-2.rds.amazonaws.com";
		this.user = "snackpacks";
		this.password = "e7p$yYzRa&RR_46u";
		this.port = 3306;
	}

	/*
	getSnackPacks(callback)
	returns list of snackPacks objects
	3 callbacks:
	1. connecting to the server
	2. main query to the server
	3. end connection to the server
	*/

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
					if (err) throw err;
					
					//Iterate through JSON object returned by SQL query and add new SnackPack objects to list_snackpacks
					var list_snackpacks=[];
					for(var r in result){
						var pack = result[r];
						list_snackpacks.push(new SnackPack(pack.idsnackpacks, pack.name, pack.contents, pack.allergens, pack.image_path, pack.reviews, pack.cost));
						// count++;
					}
					callback(null, list_snackpacks);
					return list_snackpacks;
				});
			});
		});
	}

	/*
	getSnackPackByID(id, callback)
	parameters: integer id
	returns list of snackPacks objects
	3 callbacks:
	1. connecting to the server 
	2. main query to the server (select * from snackpacks.snackpacks where idsnackpacks=x)
	3. end connection to the server
	*/

	getSnackPackByID(id, callback){
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
						list_snackpacks.push(new SnackPack(pack.idsnackpacks, pack.name, pack.contents, pack.allergens, pack.image_path, pack.reviews, pack.cost));
						count++;
					}
					
					callback(null, list_snackpacks[0]);
					return list_snackpacks[0];
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
	

	//Method to get all snacks from snackdatabase
	getSnacks(callback){
		var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
		//Start the descent into callback hell
		connection.connect(function(err) {
			if (err) throw err;
			//callback to send query
			//Instead of trying to iterate thru an array
			connection.query(`SELECT * FROM snackpacks.snacks`, function(err, result, fields){
				if (err) throw err;
				//callback to end connection
				connection.end(function(err) {
					if (err) throw err;
					
					//Iterate through JSON object returned by SQL query and add new SnackPack objects to list_snackpacks
					var snackList=[];
					for(var r in result){
						var snackItem = result[r];
						snackList.push(new Snack(snackItem.id, snackItem.name, snackItem.price, snackItem.calories, snackItem.allergens));
						// count++;
					}
					callback(null, snackList);
					// return snackList;
				});
			});
		});
	}


	getCartCost(cart, callback){
		var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
		
		//sanitize input
		//checking for duplicates + if 0


		//Create the cart string used for the SQL command
		var cartString = "(";
		var newCart_dict = {};

		for(var x in cart){
			if(cart[x][1] != 0){
				if(newCart_dict[cart[x][0]]){
					newCart_dict[cart[x][0]]++;
				}else{
					newCart_dict[cart[x][0]] = 1;
				}
			}
		}

		console.log(newCart_dict);

		var newCart = [];

		for(var x in newCart_dict){
			newCart.push([x,newCart_dict[x]]);
		}

		console.log(newCart);
		cart = newCart;

		for(var x in cart){
			for(var y = 1; y <= cart[x][1]; y++){
				cartString += `\"${cart[x][0]}\",`;
			}
		}
		cartString = cartString.substr(0, cartString.length-1);
		cartString += ")";
		console.log(cartString);

		//Start the descent into callback hell
		connection.connect(function(err) {
			if (err) throw err;
			//callback to send query
			//Instead of trying to iterate thru an array
			connection.query(`SELECT cost FROM snackpacks.snackpacks WHERE idsnackpacks IN ${cartString}`, function(err, result, fields){
				if (err) throw err;
				//callback to end connection
				connection.end(function(err) {
					var total_cost = 0;
					for(var x in result){
						console.log(`${result[x]['cost']} * ${cart[x][1]}`)
						total_cost += (result[x]['cost'] * cart[x][1]);
					}
					// total_cost = result[0]['SUM(cost)'];
					console.log(total_cost);
					callback(null, total_cost);
				});
			});
		});
	}

	deleteSnackPackByID(id, callback){
		var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
		if(isNaN(id)){
			console.log("NaN!");
			return;
		}
		connection.connect(function(err) {
			if (err) throw err;
			//callback to send query
			//Instead of trying to iterate thru an array
			connection.query(`DELETE FROM snackpacks.snackpacks WHERE idsnackpacks=${id}`, function(err, result, fields){
				if (err) throw err;
				//callback to end connection
				connection.end(function(err) {
					if (err) throw err;
					console.log("nephew delet");
				});
			});
		});
	}
}
//Allows module to be exposed
module.exports = snackConnector;