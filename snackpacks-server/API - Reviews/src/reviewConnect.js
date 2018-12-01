//reviewConnect.js
//NODEJS ES6
//Purpose: abstract the process of working with the database, in regards to reviews

//Required libraries
//Custom libs
var Review = require("./review");

//Other
var mysql = require('mysql');

class reviewConnect{
	//snackConnector constructor
	constructor(){
		this.host = "snackpacksdb.cawigtgndeba.us-east-2.rds.amazonaws.com";
		this.user = "snackpacks";
		this.password = "e7p$yYzRa&RR_46u";
		this.port = 3306;
	}

	
	/*
	GETTER
	Returns: a list of Review objects
	Comments: This isn't very needed, but it should be standard imo
	 */
	getReviews(){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			//Start the descent into callback hell
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				//Instead of trying to iterate thru an array
				connection.query(`SELECT * FROM snackpacks.reviews`, function(err, result, fields){
					if (err) reject(err);
					//callback to end connection
					connection.end(function(err) {
						if (err) reject(err);

						//Iterate through JSON object returned by SQL query and add new SnackPack objects to list_snackpacks
						var reviewList=[];
						for(var r in result){
							var reviewItem = result[r];
							//Update Time and Status
							reviewList.push(new Review(reviewItem.id, reviewItem.author, reviewItem.title, reviewItem.score, reviewItem.description));
						}
						resolve(reviewList);
					});
				});
			});
		});
	}

	/*
	GETTER
	Input: ID of a review object
	Returns: a list of Review objects
	Comments: This isn't very needed, but it should be standard imo
	 */
	getReviewByID(id){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			//Start the descent into callback hell
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				//Instead of trying to iterate thru an array
				connection.query(`SELECT * FROM snackpacks.reviews where id=${id}`, function(err, result, fields){
					if (err) reject(err);
					//callback to end connection
					connection.end(function(err) {
						if (err) reject(err);
						//Iterate through JSON object returned by SQL query and add new SnackPack objects to list_snackpacks
						var reviewItem = result[0];
						resolve(reviewItem);
					});
				});
			});
		});
	}

	/*
	GETTER
	Input: a list of review IDs
	Returns: a list of Review objects
	Comments: This isn't very needed, but it should be standard imo
	 */
	getReviewsByIDs(id_list){
		var id_string = ""
		for(var x in id_list){
			id_string += x + ",";
		}

		id_string = id_string.slice(0, id_string.length - 1);

		// console.log(id_string);
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			//Start the descent into callback hell
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				//Instead of trying to iterate thru an array
				connection.query(`SELECT * FROM snackpacks.reviews where id in (${id_list})`, function(err, result, fields){
					if (err) reject(err);
					//callback to end connection
					connection.end(function(err) {
						if (err) reject(err);
						//Iterate through JSON object returned by SQL query and add new SnackPack objects to list_snackpacks
						// var reviewItem = result[0];
						
						var reviewList=[];
						for(var r in result){
							var reviewItem = result[r];
							reviewList.push(new Review(reviewItem.id, reviewItem.author, reviewItem.title, reviewItem.score, reviewItem.description));
						}

						resolve(reviewList);
					});
				});
			});
		});
	}

	/*
	CREATOR
	Returns: a list of Review objects
	Comments: This isn't very needed, but it should be standard imo
	 */
	createReview(author, title, score, description){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});
			//Start the descent into callback hell
			connection.connect(function(err) {
				if (err) reject(err);
				//callback to send query
				//Instead of trying to iterate thru an array
				connection.query(`SELECT id FROM snackpacks.reviews ORDER BY id DESC LIMIT 0, 1`, function(err, count_result, fields) {
					if (err) reject(err);
					var index = count_result[0]["id"] + 1;
					connection.query(`INSERT INTO snackpacks.reviews VALUES(${index}, "${author}", "${title}", "${score}", "${description}")`, function(err, result, fields){
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
	
	/*
	EDITOR
	Input: id of review and a JSON object of the things you want changed
	Returns: true if successful, false if not
	Comments: need to add an input scrubbing thing to check if input passed in is a JSON object or a string and how to handle that
	 */
	editReviewByID(id, reviewJSON){
		var updateString = "";
		for(var key in reviewJSON){
			var x = ((key + "=" + `"${reviewJSON[key]}" `));
			if(reviewJSON[key] != null){
				var tempkey;
				if(key[0] == '_'){
					tempkey = key.substr(1);
				}else{
					tempkey = key;
				}
				console.log(key);
				if(tempkey == "subtotal" || tempkey == "tax" || tempkey == "total"){
					updateString += ((tempkey + "=" + `${reviewJSON[key]}, `));
				}else{
					updateString += ((tempkey + "=" + `"${reviewJSON[key]}", `));
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
				connection.query(`update snackpacks.reviews set ${updateString} where id = ${id}`, function(err, result, fields){
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

	/*
	DELETE
	Input: ID of review
	Reviews: true if successful
	Comments: it deletes
	 */
	deleteReviewByID(id){
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
				connection.query(`DELETE FROM snackpacks.reviews WHERE id=${id}`, function(err, result, fields){
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
module.exports = reviewConnect;
