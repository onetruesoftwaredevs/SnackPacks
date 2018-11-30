//blackListUser.js
//ES6
//Purpose: define the blackListUser data type

class blackListUser{
	constructor(id, reason, status){
		this.user_id = id; // int
		this.reason = reason; // string
		this.status = status; // int
	}

	get user_id(){ return this._user_id; }
	set user_id(value){ this._user_id = value; }

	get reason(){ return this._reason; }
	set reason(value){ this._reason = value; }

	get status(){ return this._status; }
	set status(value){ 
		console.log(value);
		if(isNaN(value) == true){
			console.log("Please input a number!");
		}else{
			this._status = value;
		}
	}
};

module.exports = blackListUser;
