//snackConnect.js
//NODEJS ES5
//Purpose: abstract the process of working with the database

//Required libraries
//Custom libs
var Order = require("./order");

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

	//Orders

	getOrders(){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			//Start the descent into callback hell
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				//Instead of trying to iterate thru an array
				connection.query(`SELECT * FROM snackpacks.Orders`, function(err, result, fields){
					if (err) reject(err);
					//callback to end connection
					connection.end(function(err) {
						if (err) reject(err);

						//Iterate through JSON object returned by SQL query and add new SnackPack objects to list_snackpacks
						var orderList=[];
						for(var r in result){
							var orderItem = result[r];
							//Update Time and Status
							orderList.push(new Order(orderItem.id,"1", orderItem.recipient, orderItem.paymentInfo, orderItem.address, orderItem.driver, orderItem.subtotal, orderItem.tax, orderItem.total, orderItem.time_left, orderItem.status));
						}
						resolve(orderList);
					});
				});
			});
		});
	}
	
	claimOrder(order_id, driver_id){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			//Start the descent into callback hell
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				//Instead of trying to iterate thru an array
				connection.query(`update snackpacks.Orders set driver=${driver_id} where id=${order_id}`, function(err, result, fields){
					if (err) reject(err);
					//callback to end connection
					connection.end(function(err) {
						if (err) reject(err);
						//Iterate through JSON object returned by SQL query and add new SnackPack objects to list_snackpacks
						resolve(true);
					});
				});
			});
		});
	}
	
	updateLocation(order_id, x, y){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			//Start the descent into callback hell
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				connection.query(`update snackpacks.Orders set loc_x=${x}, loc_y=${y} where id=${order_id}`, function(err, result, fields){
					if (err) reject(err);
					//callback to end connection
					connection.end(function(err) {
						if (err) reject(err);
						//Iterate through JSON object returned by SQL query and add new SnackPack objects to list_snackpacks
						resolve(true);
					});
				});
			});
		});
	}

	getLocationByID(id){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			//Start the descent into callback hell
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				connection.query(`select * from snackpacks.Orders where id=${id}`, function(err, result, fields){
					if (err) reject(err);
					//callback to end connection
					connection.end(function(err) {
						if (err) reject(err);
						let res = result[0];
						let ret_val = {'x': res.loc_x, 'y': res.loc_y};
						resolve(ret_val);
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

	createOrder(id, cart, recipient, paymentInfo, address, driver, subtotal, tax, total, status){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			//Start the descent into callback hell
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				//Instead of trying to iterate thru an array
				connection.query(`SELECT id FROM snackpacks.Orders ORDER BY id DESC LIMIT 0, 1`, function(err, count_result, fields) {
					if (err) reject(err);
					var index = count_result[0]["id"] + 1;
					connection.query(`INSERT INTO snackpacks.Orders VALUES(${index}, "${paymentInfo}", "${recipient}", "${address}", "${driver}", ${subtotal}, ${tax}, ${total}, "${status}", 30)`, function(err, result, fields){
						if (err) reject(err);
						console.log(index);
						//callback to end connection
						connection.end(function(err) {
							if (err) reject(err);
							resolve(true);
						});
					});
				});
			});
		});
	}
	
	editOrderByID(id, orderjson){
		var updateString = "";
		for(var key in orderjson){
			var x = ((key + "=" + `"${orderjson[key]}" `));
			if(orderjson[key] != null){
				var tempkey;
				if(key[0] == '_'){
					tempkey = key.substr(1);
				}else{
					tempkey = key;
				}
				console.log(key);
				if(tempkey == "subtotal" || tempkey == "tax" || tempkey == "total"){
					updateString += ((tempkey + "=" + `${orderjson[key]}, `));
				}else{
					updateString += ((tempkey + "=" + `"${orderjson[key]}", `));
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
				connection.query(`update snackpacks.Orders set ${updateString} where id = ${id}`, function(err, result, fields){
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

	deleteOrderByID(id){
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
				connection.query(`DELETE FROM snackpacks.Orders WHERE id=${id}`, function(err, result, fields){
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
	
	getTimeById(id){
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
				connection.query(`DELETE FROM snackpacks.Orders WHERE id=${id}`, function(err, result, fields){
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
	
	getStatusById(id){
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
				connection.query(`DELETE FROM snackpacks.Orders WHERE id=${id}`, function(err, result, fields){
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
}

//Allows module to be exposed
module.exports = snackConnector;
