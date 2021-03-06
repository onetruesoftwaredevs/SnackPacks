let CartItem = require('./CartItem');

class Cart {
    constructor() {
        if (!Cart.instance) {
            this.cart = [];
            this.total_cost = 0;
            Cart.instance = this;
        }

        return Cart.instance;
    }

    static getInstance() {
        if (!Cart.instance) {
            Cart.instance = new Cart();
        }
        return Cart.instance;
    }

    addToCart(name, price, key, is_custom) {
        let item = new CartItem(name, price, key, is_custom);
        this.cart.push(item);
        this.total_cost = this.total_cost + price;
    }

    setQuantity(name, quantity, is_custom) {
        if (quantity <= 0) {
            this.removeFromCart(name, is_custom);
        } else {
            for (let i = 0; i < this.cart.length; i++) {
                let item = this.cart[i];
                if (item.spname === name && item.is_custom === is_custom) {
                    this.total_cost = this.total_cost + (quantity - item.spquantity) * item.spprice;
                    item.spquantity = quantity;
                    return;
                }
            }
            // item is not in the cart
        }
    }

    getQuantity(name, is_custom) {
        for (let i = 0; i < this.cart.length; i++) {
            let item = this.cart[i];
            if (item.spname === name && item.is_custom === is_custom) {
                return item.spquantity;
            }
        }
        return 0;
    }

    updatePrice(name, is_custom, new_price) {
        for (let i = 0; i < this.cart.length; i++) {
            let item = this.cart[i];
            if (item.spname === name && item.is_custom === is_custom) {
                this.total_cost = this.total_cost - (item.spquantity) * item.spprice;
                item.spprice = new_price;
                this.total_cost = this.total_cost + (item.spquantity) * item.spprice;
            }
        }
    }

    removeFromCart(name, is_custom) {
        for (let i = 0; i < this.cart.length; i++) {
            let item = this.cart[i];
            if (item.spname === name && item.is_custom === is_custom) {
                this.cart.splice(i, 1);
                this.total_cost = this.total_cost - item.spprice * item.spquantity;
                return;
            }
        }
    }

    getItemsInCart() {
        if (this.cart.length <= 0) {
            return [];
        }
        return this.cart;
    }
}

module.exports = Cart;


// legacy code
/*
let SnackPack = require('./SnackPack');

class Item {
    constructor(SnackPack, quantity) {
        this.SnackPack = SnackPack;
        this.quantity = quantity;
    }
}

class Cart {

    constructor() {
        if (!Cart.instance) {
            this.url = 'https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/test';
            this.cart = new Array();
            this.total_cost = 0;
            Cart.instance = this;
        }
        return Cart.instance;
    }

    static getInstance() {
        if (!Cart.instance) {
            Cart.instance = new Cart();
        }
        return Cart.instance;
    }

    addToCart(name) {
        this.cart.push(new Item(sp, 1));
        this.total_cost = this.total_cost + sp.cost;
    }

    removeFromCart(name) {
        for (let i = 0; i < this.cart.length; i++) {
            let cart = this.cart[i];
            if (cart.SnackPack.name === name) {
                this.cart.splice(i, 1);
                this.total_cost = this.total_cost - cart.SnackPack.cost;
            }
        }
    }

    changeQuantity(name, quantity) {
        for (let i = 0; i < this.cart.length; i++) {
            let cart = this.cart[i];
            if (cart.SnackPack.name === name) {
                this.total_cost = this.total_cost + (cart.quantity - quantity) * cart.SnackPack.cost;
                cart.quantity = quantity;
                return;
            }
        }
    }

    getSnackPacksInCart() {
        let SnackPacks = new Array();
        for (let i = 0; i < this.cart.length; i++) {
            let cart = this.cart[i];
            let sp = cart.SnackPack;
            SnackPacks.push({spname: sp.name, spprice: sp.cost, spquantity: cart.quantity});
        }
        return SnackPacks;
    }

    getSnackPack(name) {
        return this.cart[indexInCart].SnackPack;
    }

    getQuantity(name) {
        return this.cart[indexInCart].quantity;
    }

    checkout() {
        // Upload cart as a POST request to a different link
        // Format: an array of ID, quantity pairs
        let IDs = new Array(this.cart.length);
        let quantities = new Array(this.cart.length);
        for (let i = 0; i < this.cart.length; i++) {
            IDs.push(this.getSnackPack(i).id);
            quantities.push(this.getQuantity(i));
        }
        let cartData = [IDs, quantities];
        fetch(this.url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"IDsAndQuantities": cartData}),
        });
    }

};

module.exports = Cart;*/
