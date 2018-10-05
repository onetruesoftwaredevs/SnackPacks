var SnackPack = require('./SnackPack');

class Cart {

    static instance = null;

    constructor() {
        this.url = 'https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/test';
        this.cart = new Array();
    }

    static getInstance() {
        if (Cart.instance === null) {
            Cart.instance = new Cart();
        }

        return Cart.instance;
    }

    function

    Item(SnackPack, quantity) {
        this.SnackPack = SnackPack;
        this.quantity = quantity;
    }

    addToCart(SnackPack) {
        cart.push(new Item(SnackPack, 1));
    }

    removeFromCart(name) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].SnackPack.name === name) {
                cart.splice(i, 1);
            }
        }
    }

    changeQuantity(name, quantity) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].SnackPack.name === name) {
                cart[i].quantity = quantity;
                return;
            }
        }
    }

    getSnackPacksInCart() {
        var SnackPacks = new Array();
        for (var i = 0; i < cart.length; i++) {
            SnackPacks.push(cart[i].SnackPack);
        }
        return SnackPacks;
    }

    getSnackPack(name) {
        return cart[indexInCart].SnackPack;
    }

    getQuantity(name) {
        return cart[indexInCart].quantity;
    }

    checkout() {
        // Upload cart as a POST request to a different link
        // Format: an array of ID, quantity pairs
        var IDs = new Array(cart.length);
        var quantities = new Array(cart.length);
        for (var i = 0; i < cart.length; i++) {
            IDs.push(getSnackPack(i).id);
            quantities.push(getQuantity(i));
        }
        var cartData = [IDs, quantities];
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