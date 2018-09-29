//snackpack.js
//ES5
//Purpose: define the SnackPack data type

//Constructor


//Allows module to be exposed
module.exports = class SnackPack{
	constructor(id, name, contents, allergens, image_path, reviews, cost){
		// console.log("New Snackpack");
		this.id = id;
		this.name = name;
		this.contents = contents;
		this.allergens = allergens;
		this.image_path = image_path;
		this.reviews = reviews;
		this.cost = cost;
	}

	getID(){
		return this.id;
	}

	getName(){
		return this.name;
	}

	getContents(){
		return this.contents;
	}
};