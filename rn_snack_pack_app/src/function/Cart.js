

class Cart{
	
	function Item(SnackPack, quantity) {
		this.SnackPack = SnackPack;
		this.quantity = quantity;
	}
	
	var Cart = [];

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
	
	getSnackPack(indexInCart){
		return Cart[indexInCart].SnackPack;
	}
	
	getQuantity(indexInCart){
		return Cart[indexInCart].quantity;
	}
    
};

module.exports = Cart;