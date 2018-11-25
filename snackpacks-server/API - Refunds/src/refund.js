// Refund.js
// JS ES6

class refund{
    constructor(orderID, userID, reason, amount, status){
        this.orderID = orderID;
        this.userID = userID;
        this.reason = reason;
        this.amount = amount;
        this.status = status;
    }

    get orderID(){ return this._orderID; }
    set orderID(value){
        if(isNaN(value)){
            console.log("ERROR: Value is not a Number!");
        }else{
            this._orderID = value;
        }
    }

    get userID(){ return this._userID; }
    set userID(value){
        if(isNaN(value)){
            console.log("ERROR: Value is not a Number!");
        }else{
            this._userID = value;
        }
    }

    get reason(){ return this._reason; }
    set reason(value){ this._reason = value; }

    get amount(){ return this._amount; }
    set amount(value){
        if(isNaN(value)){
            console.log("ERROR: Value is not a Number!");
        }else{
            this._amount = value;
        }
    }

    get status(){ return this._status; }
    set status(value){
        if(isNaN(value)){
            console.log("ERROR: Value is not a Number!");
        }else if(value != 1 || value != 0){
            console.log("ERROR: Please enter either 1 or 0 as the status.")
        }else{
            this._status = value;
        }
    }
};

module.exports = refund;