//snackpack.js
//ES5
//Purpose: define the SnackPack data type

//Constructor
function SnackPack(id, name, contents, allergens, image_path, reviews, cost){
		this.id = id;
		this.name = name;
		this.contents = contents;
		this.allergens = allergens;
		this.image_path = image_path;
		this.reviews = reviews;
		this.cost = cost;
	}
}

//Allows module to be exposed
module.exports = SnackPack;