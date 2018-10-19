//snack.js
//ES6
//Purpose: define the SnackPack data type

//Constructor


//Allows module to be exposed
class Snack{
	constructor(id, name, price, calories, allergens){
		this.id = id;
        this.name = name;
        this.price = price;
        this.calories = calories;
        this.allergens = allergens.split(",");
	}

	//Return SnackPack object as JSON
	//SnackPack.prototype.json = function() {
	//    return JSON.stringify({id: this.id, name: this._name, contents: this.contents, allergens: this.allergens, image_path: this.image_path, reviews: this.reviews, cost: this.cost});
	//}

	get id(){ return this._id }
    set id(value){ this._id = value }
    
	get name(){ return this._name }
    set name(value){ this._name = value }

	get price(){ return this._price }
    set price(value){ this._price = value }

	get calories(){ return this._calories }
    set calories(value){ this._calories = value }
    
    get allergens(){ return this._allergens }
    set allergens(value){ this._allergens = value }
};

module.exports = Snack;