//Order.js

class Order {
    constructor(id, cart, recipient, paymentInfo, address, driver, subtotal, tax, total, time, status){
        //Add Time and Status
        this.id = id;
        this.cart = cart;
        this.recipient = recipient;
        this.paymentInfo = paymentInfo;
        this.address = address;
        this.driver = driver;
        this.subtotal = subtotal;
        this.tax = tax;
        this.total = total;
        this.time = time;
        this.status = status;
    }


    get id(){ return this._id; }
    set id(value){ this._id = value; }

    get recipient(){ return this._recipient; }
    set recipient(value){ this._recipient = value; }

    get paymentInfo(){ return this._paymentInfo; }
    set paymentInfo(value){ this._paymentInfo = value; }

    get address(){ return this._address; }
    set address(value){ this._address = value; }

    get driver(){ return this._driver; }
    set driver(value){ this._driver = value; }

    get subtotal(){ return this._subtotal; }
    set subtotal(value){ this._subtotal = value; }

    get tax(){ return this._tax; }
    set tax(value){ this._tax = value; }
    
    get total(){ return this._total; }
    set total(value){ this._total = value; }
    
    get time(){ return this._time; }
    set time(value){ this._time = value; }
    
    get status(){ return this._status; }
    set status(value){ this._status = value; }

    checkout(){
        return this.total;
    }
};

module.exports = Order;