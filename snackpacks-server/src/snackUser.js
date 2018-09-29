//snackUser.js
//ES6
//Purpose: define the SnackPack data type

//Constructor
module.exports = class SnackUser{
	constructor(id, name, password, addresses, prevOrders, rewardsPoints, paymentInfo){
	    this.id = id;
	    this.name = name;
	    this.password = password;
	    this.addresses = addresses;
	    this.prevOrders = prevOrders;
	    this.rewardsPoints = rewardsPoints;
	    this.paymentInfo = paymentInfo;
	}
}