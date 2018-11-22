//blackListUser.js
//ES6
//Purpose: define the blackListUser data type

class blackListUser{
	constructor(user_id, reason, status){
		this.user_id = user_id;
		this.reason = reason;
		this.status = status;
	}

	get user_id(){ return _user_id; }
	set user_id(value){ _user_id = val; }

	get reason(){ return _reason; }
	set reason(value){ _reason = value; }

	get status(){ return _stats; }
	set status(value){ 
		if(isNaN(value)){
			console.log("Please input a number!");
		}else{
			status = value;
			
		}
	}
};

module.exports = blackListUser;
