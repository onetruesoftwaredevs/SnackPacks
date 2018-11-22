//blackListConnect.js
//NODEJS ES6

//Custom modules
var blackListUser = require('./blackListUser');

//MYSQL module
var mysql = require("mysql");

class blackListUserConnector{
	constructor(){
		this.host = "snackpacks.db.cawigtgndeba.us-east-2.rds.amazonaws.com";
		this.user = "snackpacks";
		this.password = "e7p$yYzRa&RR_46u";
		this.port = 3306;
	}

	getBlackListedUsers(){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password: this.password, port: this.port});
			connection.connect(function(err){
				if(err) reject(err);
				connection.query(`select * from snackpacks.blacklist`, function(err, result, fields){
					if(err) reject(err);
					connection.end(function(err){
						if(err) reject(err);
						retList = [];
						for(var case_id : result){
							let blackListCase = result[case_id];
							retList.append(new blackListUser(blackListCase.id, blackListCase.reason, blackListUser.status);
						}
						resolve(retList);
					});
				}
			});
		});
	}
}

module.exports = blackListUserConnector;
