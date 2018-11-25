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

	// getBlackListedUsersByID(userID int)
	// Returns the user specified by the userID as a blackListUser object
	getBlackListedUserByID(userID){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password: this.password, port: this.port});
			connection.connect(function(err){
				if(err) reject(err);
				connection.query(`select * from snackpacks.blacklist where userID=${userID}`, function(err, result, fields){
					if(err) reject(err);
					connection.end(function(err){
						if(err) reject(err);
						if(result.length > 0){
							let retList = [];
							for(var case_id in result){
								let blackListCase = result[case_id];
								console.log(blackListCase.status);
								retList.push(new blackListUser(blackListCase.userID, blackListCase.reason, parseInt(blackListCase.status)));
							}
							resolve(retList[0]);
						}else{
							reject("ERROR: USERID NOT FOUND IN BLACKLIST DATABASE");
						}
					});
				});
			});
		});
	}

	// reportBlackListedUser(int userID, string reasonStr)
	// Adds a blacklisted user to the database, default status of case pending
	reportBlackListedUser(userID, reasonStr){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password: this.password, port: this.port});
			connection.connect(function(err){
				if(err) reject(err);
				connection.query(`insert into snackpacks.blacklist values("${userID}", "${reasonStr}", 0)`, function(err, result, fields){
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
	setBlackListUserStatus(userID, status){
		return new Promise((resolve, reject) => {
			if(isNaN(status) || (status > 2 || status < 0)){
				reject("ERR: Status not a number or not in range (0 to 2)");
			}
			var connection = mysql.createConnection({host:this.host, user:this.user, password: this.password, port: this.port});
			connection.connect(function(err){
				if(err) reject(err);
				connection.query(`select * from snackpacks.blacklist where userID=${userID}`, function(err, foundUser, fields){
					// console.log(foundUser);
					if(err) reject(err);
					if(foundUser.length > 0){
						connection.query(`update snackpacks.blacklist set status=${status} where userID=${userID}`, function(err, result, fields){
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

	// checkUserStatus(int userID)
	// Returns the status of a particular userID. 0 for not found in the blackList, 1 for pending, and 2 for banned!
	checkUserStatus(userID){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password: this.password, port: this.port});
			connection.connect(function(err){
				if(err) reject(err);
				connection.query(`select * from snackpacks.blacklist where userID=${userID}`, function(err, foundUser, fields){
					// console.log(foundUser);
					connection.end(function(err){
						if(err) reject(err);
						if(foundUser.length > 0){
							let blackListUser = foundUser[0];
							if(blackListUser.status == 0){
								// Pending
								resolve(1);
							}else if(blackListUser.status == 1){
								// Banned
								resolve(2);
							}else{
								// Not banned
								resolve(3);
							}
						}else{
							connection.end(function(err){
								if(err) reject(err);
								// User not found
								resolve(0);
							});
						}
					});
				});
			});
		});
	}

	// cleanDatabase()
	// Gets rid of all the cases with status marked as 3
	cleanDatabase(){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password: this.password, port: this.port});
			connection.connect(function(err){
				if(err) reject(err);
				connection.query(`delete snackpacks.blacklist where userID=${userID}`, function(err, result, fields){
					if(err) reject(err);
					connection.end(function(err){
						if(err) reject(err);
						resolve(true);
					});
				});
			});
		});
	}
}

module.exports = blackListUserConnector;
