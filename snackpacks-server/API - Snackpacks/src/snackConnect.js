//snackConnect.js
//NODEJS ES5
//Purpose: abstract the process of working with the database

//Required libraries
//Custom libs
var SnackPack = require('./snackpack');
var Snack = require('./snack');

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

	getSnackPacks(){
		return new Promise((resolve, reject) => {
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
							list_snackpacks.push(new SnackPack(pack.id, pack.name, pack.contents, pack.allergens, pack.image_path, pack.reviews, pack.cost));
						}
						resolve(list_snackpacks);
					});
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
	2. main query to the server (select * from snackpacks.snackpacks where key=x)
	3. end connection to the server
	*/

	getSnackPackByID(id){
		//callback to initiate connection to AWS RDS
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				connection.query(`SELECT * FROM snackpacks.snackpacks where id=${id}`, function(err, result, fields){
					if (err) reject(err);
					//callback to end connection
					connection.end(function(err) {
						if (err) reject(err);
						var list_snackpacks=[];
						for(var r in result){
							var pack = result[r];
							// console.log(list_snackpacks);
							list_snackpacks.push(new SnackPack(pack.id, pack.name, pack.contents, pack.allergens, pack.image_path, pack.reviews, pack.cost));
						}

						resolve(list_snackpacks);
					});
				});
			});
		});
	};

	getCartCost(cart){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});

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
				if (err) reject(err);
				//callback to send query
				//Instead of trying to iterate thru an array
				connection.query(`SELECT cost FROM snackpacks.snackpacks WHERE idsnackpacks IN ${cartString}`, function(err, result, fields){
					if (err) reject(err);
					//callback to end connection
					connection.end(function(err) {
						var total_cost = 0;
						for(var x in result){
							console.log(`${result[x]['cost']} * ${cart[x][1]}`)
							total_cost += (result[x]['cost'] * cart[x][1]);
						}
						// console.log(total_cost);
						resolve(total_cost);
					});
				});
			});
		});
	}
}

//Allows module to be exposed
module.exports = snackConnector;