//snackpack.js
//ES6
//Purpose: define the SnackPack data type

//Constructor


//Allows module to be exposed
class SnackPack{
	constructor(id, name, contents, allergens, image_path, reviews, cost){
		this.id = id;
		this.name = name;
		this.contents = contents.split(",");
		this.allergens = allergens.split(",");
		this.image_path = image_path;
		this.reviews = reviews;
		this.cost = cost;
	}

	//Return SnackPack object as JSON
	//SnackPack.prototype.json = function() {
	//    return JSON.stringify({id: this.id, name: this._name, contents: this.contents, allergens: this.allergens, image_path: this.image_path, reviews: this.reviews, cost: this.cost});
	//}

	get id(){ return this._id }
    set id(value){ this._id = value }
    
	get name(){ return this._name }
    set name(value){ this._name = value }

	get contents(){ return this._contents }
    set contents(value){ this._contents = value }

	get allergens(){ return this._allergens }
    set allergens(value){ this._allergens = value }
};

module.exports = SnackPack;