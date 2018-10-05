//SnackUser.js
//ES6
//Purpose: define the SnackPack data type

//Class
class SnackUser{
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

module.exports = SnackUser;