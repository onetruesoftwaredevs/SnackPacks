class CartItem {
    constructor(name, price, key) {
        this.spname = name;
        this.spprice = price;
        this.spkey=key;
        this.spquantity = 1;
    }
}

module.exports = CartItem;