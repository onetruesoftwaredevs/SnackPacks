class CartItem {
    constructor(name, price, key, custom) {
        this.spname = name;
        this.spprice = price;
        this.spkey = key;
        this.spquantity = 1;
        this.is_custom = custom;
    }
}

module.exports = CartItem;