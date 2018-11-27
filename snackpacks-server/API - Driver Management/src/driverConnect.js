//driverConnect.js
//NODEJS ES5
//Purpose: abstract the process of working with the database

//Required libraries
//Custom libs
var Driver = require("./driver");

//Other
var mysql = require('mysql');

class driverConnector{
	//snackConnector constructor
	constructor(){
		this.host = "snackpacksdb.cawigtgndeba.us-east-2.rds.amazonaws.com";
		this.user = "snackpacks";
		this.password = "e7p$yYzRa&RR_46u";
		this.port = 3306;
	}

	//Orders

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
							console.log(driverItem.reviews)
							driverList.push(new Driver(driverItem.id, driverItem.name, driverItem.phone, driverItem.carmodel, driverItem.carmake,  driverItem.rating, driverItem.status, driverItem.reviews));
						}
						resolve(driverList);
					});
				});
			});
		});
	}

	getDriverByID(id){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			//Start the descent into callback hell
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				//Instead of trying to iterate thru an array
				connection.query(`SELECT * FROM snackpacks.drivers where id = ${id}`, function(err, result, fields){
					if (err) reject(err);
					//callback to end connection
					connection.end(function(err) {
						if (err) reject(err);

						//Iterate through JSON object returned by SQL query and add new SnackPack objects to list_snackpacks
						var driverList=[];
						for(var r in result){
							var driverItem = result[r];
							console.log(driverItem)
							driverList.push(new Driver(driverItem.id, driverItem.name, driverItem.phone, driverItem.carmodel, driverItem.carmake,  driverItem.rating, driverItem.trips, driverItem.status, driverItem.reviews));
						}
						resolve(driverList);
					});
				});
			});
		});
	}

	editDriverByID(id, driverjson){
		var updateString = "";
		for(var key in driverjson){
			// console.log(x);
			var x = ((key + "=" + `"${driverjson[key]}" `));
			if(driverjson[key] != null){
				if(key == "id" || key == "rating" || key == "trips" || key == "status"){
					updateString += ((key + "=" + `${driverjson[key]}, `));
				}else{
					updateString += ((key + "=" + `"${driverjson[key]}", `));
				}
			}
		}
		
		updateString = updateString.substring(0, updateString.length - 2);

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
				connection.query(`update snackpacks.drivers set ${updateString} where id = ${id}`, function(err, result, fields){
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

	addRating(id, new_rating){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			connection.connect(function(err){
				if (err) reject(err);
				console.log("Connected!");
				//Get new id number by using count
				connection.query(`select * from snackpacks.drivers where id = ${id}`, function(err, id_res, fields){
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
					
					connection.query(`UPDATE snackpacks.drivers SET rating=${new_final_rating}, rating_cnt=${rating_count} where id = ${id}`, function(err, count_result, fields){
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

	addReview(id, review_string){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			connection.connect(function(err){
				if (err) reject(err);
				console.log("Connected!");
				//Get new id number by using count
				connection.query(`select * from snackpacks.drivers where id = ${id}`, function(err, id_res, fields){
					var review = id_res[0].reviews;
					review = review + "|" + review_string;
					console.log(review_string);
					console.log(review);
					connection.query(`UPDATE snackpacks.drivers SET reviews="${review}" where id = ${id}`, function(err, count_result, fields){
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

	addDriver(name, phone, carmodel, carmake){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			connection.connect(function(err){
				if (err) reject(err);
				console.log("Connected!");
				//Get new id number by using count
				connection.query(`SELECT id FROM snackpacks.drivers ORDER BY id DESC LIMIT 0, 1`, function(err, count_result, fields) {
					var index = count_result[0]["id"] + 1;
					if(err) reject(err); // `insert into snackpackds.drivers values(${index}, "${name}", "${phone}", "${carmodel}", "${carmake}", 0, 0, 0`)
					connection.query((`insert into snackpacks.drivers values(${index}, "${name}", "${phone}", "${carmodel}", "${carmake}", 0, 0, 0, '[]', 0)`), function(err, result, fields){
						if(err) reject(err);
						connection.end(function (err){
							if (err) reject(err);
							// console.log(count_result[0]['COUNT(*)']);
							resolve(true);
						});
					});
				});
			});
		});
	}

	setStatus(id, status){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			connection.connect(function(err){
				if (err) reject(err);
				console.log("Connected!");
				//Get new id number by using count
				connection.query(`UPDATE snackpacks.drivers SET status=${status} where id = ${id}`, function(err, count_result, fields){
					if(err) reject(err);
					connection.end(function (err){
						if (err) reject(err);
						resolve(true);
					});
				});
			});
		});
	}

	deleteByID(id){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			connection.connect(function(err){
				if (err) reject(err);
				console.log("Connected!");
				//Get new id number by using count
				connection.query(`delete from snackpacks.drivers where id = ${id}`, function(err, count_result, fields){
					if(err) reject(err);
					connection.end(function (err){
						if (err) reject(err);
						resolve(true);
					});
				});
			});
		});
	}
}

//Allows module to be exposed
module.exports = driverConnector;
