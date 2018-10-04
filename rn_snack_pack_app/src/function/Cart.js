

var SnackPack = require('./SnackPack');

class Cart{
	
	constructor(){
		this.url = 'https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/test';
		this.Cart = new Array();
	}
	
	function Item(SnackPack, quantity) {
		this.SnackPack = SnackPack;
		this.quantity = quantity;
	}

	addToCart(SnackPack){
		Cart.push(new Item(SnackPack, 1));
	}
	
	removeFromCart(SnackPack){
		for (var i=0; i < Cart.length; i++) {
			if (Cart[i].SnackPack === SnackPack) {
				Cart.splice(i, 1);
			}
		}
	}
	
	changeQuantity(SnackPack, quantity){
		for (var i=0; i < Cart.length; i++) {
			if (Cart[i].SnackPack === SnackPack) {
				Cart[i].quantity = quantity;
				return;
			}
		}
	}
	
	getSnackPacksInCart(){
		var SnackPacks = new Array();
		for (var i=0; i < Cart.length; i++) {
			SnackPacks.push(Cart[i].SnackPack);
		}
		return SnackPacks;
	}
	
	getSnackPack(indexInCart){
		return Cart[indexInCart].SnackPack;
	}
	
	getQuantity(indexInCart){
		return Cart[indexInCart].quantity;
	}
	
	checkout(){
		// Upload Cart as a POST request to a different link
		// Format: an array of ID, quantity pairs
		var IDs = new Array(Cart.length);
		var quantities = new Array(Cart.length);
		for (var i=0; i < Cart.length; i++) {
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
		body: JSON.stringify({"IDsAndQuantities":cartData}),
	});
	}
    
};

module.exports = Cart;