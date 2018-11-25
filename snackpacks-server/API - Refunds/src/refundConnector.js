//blackListConnect.js
//NODEJS ES6

//Custom modules
var refund = require('./refund');

//MYSQL module
var mysql = require("mysql");

class refundConnector{
	constructor(){
		this.host = "snackpacksdb.cawigtgndeba.us-east-2.rds.amazonaws.com";
		this.user = "snackpacks";
		this.password = "e7p$yYzRa&RR_46u";
		this.port = 3306;
	}

	// getRefunds(no arguments)
	// Returns a list of all refunds, cases pending or otherwise, in a list of refund objects, 
	getRefunds(){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password: this.password, port: this.port});
			connection.connect(function(err){
				if(err) reject(err);
				connection.query(`select * from snackpacks.refunds`, function(err, result, fields){
					if(err) reject(err);
					connection.end(function(err){
						if(err) reject(err);
						let retList = [];
						for(var refundIndex in result){
							let refundCase = result[refundIndex];
							// console.log(refundCase.status);
							retList.push(new refund(refundCase.orderID, refundCase.userID, refundCase.reason, parseInt(refundCase.amount), refundCase.status));
						}
						resolve(retList);
					});
				});
			});
		});
    }
    
    // getRefunds(int orderID)
	// Returns a refund that is specified by orderID 
	getRefundByOrderID(orderID){
		return new Promise((resolve, reject) => {
            // Handling NaN error
            if(isNaN(orderID)){
                reject("ERROR: ORDERID IS NOT AN NUMBER");
            }
			var connection = mysql.createConnection({host:this.host, user:this.user, password: this.password, port: this.port});
			connection.connect(function(err){
				if(err) reject(err);
				connection.query(`select * from snackpacks.refunds where orderID=${orderID}`, function(err, result, fields){
					if(err) reject(err);
					connection.end(function(err){
						if(err) reject(err);
                        let retList = [];
                        if(result.length > 0){
                            for(var refundIndex in result){
                                let refundCase = result[refundIndex];
                                console.log(refundCase.status);
                                retList.push(new refund(refundCase.userID, refundCase.reason, parseInt(refundCase.status)));
                            }
                            resolve(retList[0]);
                        }else{
                            // Handle ORDER_NOT_FOUND error
                            reject("ERROR: ORDERID NOT FOUND IN DATABASE");
                        }
					});
				});
			});
		});
	}

	// addRefund(int orderID, int userID, string reason_str, double amount)
	// Adds a refund to the database, default status of case pending (0)
	addRefundCase(orderID, userID, reason_str, amount){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password: this.password, port: this.port});
			connection.connect(function(err){
				if(err) reject(err);
				connection.query(`insert into snackpacks.refunds values(${orderID}, ${userID}, "${reason_str}", ${amount}, 0)`, function(err, result, fields){
					if(err) reject(err);
					connection.end(function(err){
						if(err) reject(err);
						resolve(true);
					});
				});
			});
		});
	}

	// setRefundStatus(int status)
	// Sets the status of the refund
	setRefundStatus(orderID, status){
		return new Promise((resolve, reject) => {
            if(isNaN(status) || (status != 0 && status != 1)){
                reject("ERROR: Inputted value is NaN or value is not 0 or 1!");
            }
			var connection = mysql.createConnection({host:this.host, user:this.user, password: this.password, port: this.port});
			connection.connect(function(err){
				if(err) reject(err);
				connection.query(`select * from snackpacks.refunds where orderID=${orderID}`, function(err, foundOrder, fields){
					// console.log(foundOrder);
					if(err) reject(err);
					if(foundOrder.length > 0){
						connection.query(`update snackpacks.refunds set status=${status} where orderID=${orderID}`, function(err, result, fields){
							if(err) reject(err);
							connection.end(function(err){
								if(err) reject(err);
								resolve(true);
							});
						});
					}else{
						connection.end(function(err){
							if(err) reject(err);
							reject("ERROR: ORDERID NOT FOUND");
						});
					}
				});
			});
		});
	}

	// checkRefundStatus(int orderID)
	// Returns the status of a particular userID. 0 for not found in the blackList, 1 for pending, and 2 for refunded!
	checkRefundStatus(orderID){
		return new Promise((resolve, reject) => {
			var connection = mysql.createConnection({host:this.host, user:this.user, password: this.password, port: this.port});
			connection.connect(function(err){
				if(err) reject(err);
				connection.query(`select * from snackpacks.refunds where orderID=${orderID}`, function(err, foundUser, fields){
					// console.log(foundUser);
					connection.end(function(err){
						if(err) reject(err);
						if(foundUser.length > 0){
							let refundCase = foundUser[0];
							if(refundCase.status == 0){
								resolve(1);
							}else if(refundCase.status == 1){
                                resolve(2);
                            }else{
								resolve(3);
							}
						}else{
                            // Refund order not found!
							connection.end(function(err){
								if(err) reject(err);
								reject("ERROR: ORDERID NOT FOUND");
							});
						}
					});
				});
			});
		});
	}
}

module.exports = refundConnector;
