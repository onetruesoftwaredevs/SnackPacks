//blackListConnect.js
//NODEJS ES6

//Custom modules
var blackListUser = require('./blackListUser');

//MYSQL module
var mysql = require("mysql");

class blackListUserConnector{
	constructor(){
		this.host = "snackpacksdb.cawigtgndeba.us-east-2.rds.amazonaws.com";
		this.user = "snackpacks";
		this.password = "e7p$yYzRa&RR_46u";
		this.port = 3306;
	}

	// getBlackListedUsers(no arguments)
	// Returns a list of all blacklisted users, cases pending or otherwise, in a list of blackListUserObjects, 
	getBlackListedUsers(){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password: this.password, port: this.port});
			connection.connect(function(err){
				if(err) reject(err);
				connection.query(`select * from snackpacks.blacklist`, function(err, result, fields){
					if(err) reject(err);
					connection.end(function(err){
						if(err) reject(err);
						let retList = [];
						for(var case_id in result){
							let blackListCase = result[case_id];
							console.log(blackListCase.status);
							retList.push(new blackListUser(blackListCase.userID, blackListCase.reason, parseInt(blackListCase.status)));
						}
						resolve(retList);
					});
				});
			});
		});
	}

	// reportBlackListedUser(int user_id, string reason_str)
	// Adds a blacklisted user to the database, default status of case pending
	reportBlackListedUser(user_id, reason_str){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password: this.password, port: this.port});
			connection.connect(function(err){
				if(err) reject(err);
				connection.query(`insert into snackpacks.blacklist values("${user_id}", "${reason_str}", 0)`, function(err, result, fields){
					if(err) reject(err);
					connection.end(function(err){
						if(err) reject(err);
						resolve(true);
					});
				});
			});
		});
	}

	// setBlackListUserStatus(int status)
	// Sets the status of the blackListedUser
	setBlackListUserStatus(user_id, status){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password: this.password, port: this.port});
			connection.connect(function(err){
				if(err) reject(err);
				connection.query(`select * from snackpacks.blacklist where userID=${user_id}`, function(err, foundUser, fields){
					// console.log(foundUser);
					if(err) reject(err);
					if(foundUser.length > 0){
						connection.query(`update snackpacks.blacklist set status=${status} where userID=${user_id}`, function(err, result, fields){
							if(err) reject(err);
							connection.end(function(err){
								if(err) reject(err);
								resolve(true);
							});
						});
					}else{
						connection.end(function(err){
							if(err) reject(err);
							reject("ERROR: USERID NOT FOUND");
						});
					}
				});
			});
		});
	}

	// checkUserStatus(int user_id)
	// Returns the status of a particular userID. 0 for not found in the blackList, 1 for pending, and 2 for banned!
	checkUserStatus(user_id){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password: this.password, port: this.port});
			connection.connect(function(err){
				if(err) reject(err);
				connection.query(`select * from snackpacks.blacklist where userID=${user_id}`, function(err, foundUser, fields){
					// console.log(foundUser);
					connection.end(function(err){
						if(err) reject(err);
						if(foundUser.length > 0){
							let blackListUser = foundUser[0];
							if(blackListUser.status == 0){
								resolve(1);
							}else{
								resolve(2);
							}
						}else{
							connection.end(function(err){
								if(err) reject(err);
								resolve(0);
							});
						}
					});
				});
			});
		});
	}
}

module.exports = blackListUserConnector;
