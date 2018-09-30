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
	get json(){
		return JSON.stringify({id: this.id, name: this.name, contents: this.contents, allergens: this.allergens, image_path: this.image_path, reviews: this.reviews, cost: this.cost});
	}

	//Return ID of SnackPack as integer
	get ID(){
		return this.id;
	}

	//Return name of SnackPack as String
	get name(){
		return this.name;
	}

	//Return allergens variable as Javascript list
	get contents(){
		return this.contents;
	}

	//Return allergens variable as Javascript list
	get allergens(){
		return allegens;
	}
};

module.exports = SnackPack;