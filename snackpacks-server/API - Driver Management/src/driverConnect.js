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
							console.log(driverItem)
							driverList.push(new Driver(driverItem.id, driverItem.name, driverItem.phone, driverItem.carmodel, driverItem.carmake,  driverItem.rating, driverItem.trips, driverItem.status));
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
							driverList.push(new Driver(driverItem.id, driverItem.name, driverItem.phone, driverItem.carmodel, driverItem.carmake,  driverItem.rating, driverItem.trips, driverItem.status));
						}
						resolve(driverList);
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
				connection.query("SELECT COUNT(*) FROM snackpacks.drivers", function(err, count_result, fields){
					if(err) reject(err);
					connection.query(("INSERT INTO snackpacks.drivers VALUES (" + count_result[0]['COUNT(*)'] + ",\"" + name + "\",\"" + phone + "\",\"" + carmodel + "\",\"" + carmake + "\"," + 0 + "," + 0 + "," + 0 + ")"), function(err, result, fields){
						connection.end(function (err){
							if (err) reject(err);
							console.log(count_result[0]['COUNT(*)']);
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
