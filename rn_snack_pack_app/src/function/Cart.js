let SnackPack = require('./SnackPack');

class Item {
    constructor(SnackPack, quantity) {
        this.SnackPack = SnackPack;
        this.quantity = quantity;
    }
}

class Cart {

    constructor() {
        if (!Cart.instance)
        {
            this.url = 'https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/test';
            this.cart = new Array();
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

    addToCart(SnackPack) {
        this.cart.push(new Item(SnackPack, 1));
    }

    removeFromCart(name) {
        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].SnackPack.name === name) {
                this.cart.splice(i, 1);
            }
        }
    }

    changeQuantity(name, quantity) {
        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].SnackPack.name === name) {
                this.cart[i].quantity = quantity;
                return;
            }
        }
    }

    getSnackPacksInCart() {
        let SnackPacks = new Array();
        for (let i = 0; i < this.cart.length; i++) {
            SnackPacks.push(this.cart[i].SnackPack);
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

module.exports = Cart;