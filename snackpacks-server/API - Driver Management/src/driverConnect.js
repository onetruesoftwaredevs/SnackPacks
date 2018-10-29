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
							driverList.push(new Driver(driverItem.id, driverItem.name, driverItem.rating, driverItem.carmodel, driverItem.carmake, driverItem.trips));
						}
						resolve(driverList);
					});
				});
			});
		});
	}
}

//Allows module to be exposed
module.exports = driverConnector;
