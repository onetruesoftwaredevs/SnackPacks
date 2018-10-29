//Order.js

class Order {
    constructor(id, cart, paymentInfo, address, driver, subtotal, tax, total){
        this.id = id;
        this.cart = cart;
        this.paymentInfo = paymentInfo;
        this.address = address;
        this.driver = driver;
        this.subtotal = subtotal;
        this.tax = tax;
        this.total = total;
    }


    get id(){ return this._id; }
    set id(value){ this._id = value; }

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

    checkout(){
        return this.total;
    }
};

module.exports = Order;