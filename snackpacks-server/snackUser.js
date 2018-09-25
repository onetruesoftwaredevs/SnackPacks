//snackUser.js
//ES5
//Purpose: define the SnackPack data type

//Constructor
function SnackUser(id, name, addresses, prevOrders, rewardsPoints, paymentInfo){
    this.id = id;
    this.name = name;
    this.addresses = addresses;
    this.prevOrders = prevOrders;
    this.rewardsPoints = rewardsPoints;
    this.paymentInfo = paymentInfo;
}

//Allows module to be exposed
module.exports = SnackPack;