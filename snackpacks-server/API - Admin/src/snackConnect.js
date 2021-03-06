//snackConnect.js
//NODEJS ES5
//Purpose: abstract the process of working with the database

//Required libraries
//Custom libs
var SnackPack = require('./snackpack');
var Snack = require('./snack');
var Order = require("./order");
var Driver = require("./driver");

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
							list_snackpacks.push(new SnackPack(pack.key, pack.name, pack.contents, pack.allergens, pack.image_path, pack.reviews, pack.cost));
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

	//createSnackPack
	//returns true if successful, otherwise returns false
	//todo add check
	createSnackPack(name, contents, allergens, image_path, reviews, cost, rating){
		console.log(name);
		console.log(contents);
		console.log(allergens);
		console.log(image_path);
		console.log(reviews);
		console.log(cost);
		console.log(rating);
		return new Promise((resolve, reject) => {
			// if(id.isNaN()) reject("ID is Nan!");
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			connection.connect(function(err){
				if (err) reject(err);
				console.log("Connected!");
				//Get new id number by using count
				connection.query(`SELECT id FROM snackpacks.snackpacks ORDER BY id DESC LIMIT 0, 1`, function(err, count_result, fields){
					var index = count_result[0]['id'] + 1;
					console.log(index);
					if(err) reject(err); //`INSERT INTO snackpacks.snackpacks VALUES(${index}, ${name}, ${contents}, ${allergens}, ${image_path}, ${reviews}, ${cost}, ${rating})`
					connection.query((`INSERT INTO snackpacks.snackpacks VALUES(${index}, "${name}", "${contents}", "${allergens}", "${image_path}", '[]', ${cost}, ${rating}, 0)`), function(err, result, fields){
						if(err) reject(err);
						connection.end(function (err){
							console.log("success");
							if (err) reject(err);
							resolve(true);
						});
					});
				});
			});
		});
	}

	addRating(id, new_rating){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			connection.connect(function(err){
				if (err) reject(err);
				console.log("Connected!");
				//Get new id number by using count
				connection.query(`select * from snackpacks.snackpacks where id = ${id}`, function(err, id_res, fields){
					var rating = id_res[0].rating;
					var rating_count = id_res[0].rating_cnt;
					console.log(rating_count);
					
					console.log(new_rating);
					
					var step1 = parseInt(rating) * rating_count;
					var step2 = step1 + new_rating;
					// console.log("step 1 done: " + step1);
					rating_count++;
					var new_final_rating = step2/ (rating_count);
					console.log(new_final_rating);
					
					connection.query(`UPDATE snackpacks.snackpacks SET rating=${new_final_rating}, rating_cnt=${rating_count} where id = ${id}`, function(err, count_result, fields){
						if(err) reject(err);
						connection.end(function (err){
							if (err) reject(err);
							resolve(true);
						});
					});
				});
			});
		});
	}

	editSnackPackByID(id, snackpackjson){
		var updateString = "";
		for(var key in snackpackjson){
			// console.log(x);
			var x = ((key + "=" + `"${snackpackjson[key]}" `));
			if(snackpackjson[key] != null){
				if(key == "cost" || key == "rating"){
					updateString += ((key + "=" + `${snackpackjson[key]}, `));
				}else{
					updateString += ((key + "=" + `"${snackpackjson[key]}", `));
				}
			}
		}
		
		updateString = updateString.substring(0, updateString.length - 2);

		console.log(updateString);

		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			if(isNaN(id)){
				console.log("NaN!");
				return;
			}
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				//Instead of trying to iterate thru an array
				connection.query(`update snackpacks.snackpacks set ${updateString} where id = ${id}`, function(err, result, fields){
					if (err) reject(err);
					//callback to end connection
					connection.end(function(err) {
						if (err) reject(err);
						resolve(true);
					});
				});
			});
		});
	}


	//Method to get all snacks from snackdatabase
	getSnacks(){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			//Start the descent into callback hell
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				//Instead of trying to iterate thru an array
				connection.query(`SELECT * FROM snackpacks.snacks`, function(err, result, fields){
					if (err) reject(err);
					//callback to end connection
					connection.end(function(err) {
						if (err) reject(err);
						//Iterate through JSON object returned by SQL query and add new SnackPack objects to list_snackpacks
						var snackList=[];
						for(var r in result){
							var snackItem = result[r];
							snackList.push(new Snack(snackItem.id, snackItem.name, snackItem.price, snackItem.calories, snackItem.allergens));
							// count++;
						}
						resolve(snackList);
					});
				});
			});
		});
	}


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

	deleteSnackPackByID(id){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			if(isNaN(id)){
				console.log("NaN!");
				return;
			}
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				//Instead of trying to iterate thru an array
				connection.query(`DELETE FROM snackpacks.snackpacks WHERE id=${id}`, function(err, result, fields){
					if (err) reject(err);
					//callback to end connection
					connection.end(function(err) {
						if (err) reject(err);
						resolve(true);
					});
				});
			});
		});
	}

	//Orders

	getOrders(){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			//Start the descent into callback hell
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				//Instead of trying to iterate thru an array
				connection.query(`SELECT * FROM snackpacks.orders`, function(err, result, fields){
					if (err) reject(err);
					//callback to end connection
					connection.end(function(err) {
						if (err) reject(err);

						//Iterate through JSON object returned by SQL query and add new SnackPack objects to list_snackpacks
						var orderList=[];
						for(var r in result){
							var orderItem = result[r];
							orderList.push(new Order(orderItem.id, orderItem.name, orderItem.price, orderItem.calories, orderItem.allergens));
						}
						resolve(orderList);
					});
				});
			});
		});
	}

	getOrderByID(id){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			//Start the descent into callback hell
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				//Instead of trying to iterate thru an array
				connection.query(`SELECT * FROM snackpacks.Orders where id=${id}`, function(err, result, fields){
					if (err) reject(err);
					//callback to end connection
					connection.end(function(err) {
						if (err) reject(err);
						//Iterate through JSON object returned by SQL query and add new SnackPack objects to list_snackpacks
						var orderItem = result[0];
						resolve(orderItem);
					});
				});
			});
		});
	}



	//LETS TRY OUT SOME PROMISES
	getDrivers(){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			//Start the descent into callback hell
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				//Instead of trying to iterate thru an array
				connection.query(`SELECT * FROM snackpacks.drivers`, function(err, result, fields){
					if (err) reject(err);
					//callback to end connection
					connection.end(function(err) {
						if (err) reject(err);

						//Iterate through JSON object returned by SQL query and add new SnackPack objects to list_snackpacks
						var driverList=[];
						for(var r in result){
							var driverItem = result[r];
							driverList.push(new Driver(driverItem.id, driverItem.name, driverItem.rating, driverItem.carmodel, driverItem.carmake, driverItem.trips));
							// count++;
						}
						resolve(driverList);
					});
				});
			});
		});
	}

}
//Allows module to be exposed
module.exports = snackConnector;
