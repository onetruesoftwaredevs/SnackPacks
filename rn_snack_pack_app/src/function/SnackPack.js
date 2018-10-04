

class SnackPack{
		
	constructor(givenSP){		
		this.id = givenSP._id;
		this.name = givenSP._name;
		this.contents = givenSP._contents;
		this.allergens = givenSP._allergens;
		this.image_path = givenSP.image_path;
		this.reviews = givenSP.reviews;
		this.cost = givenSP.cost;
		this.rating = givenSP.rating;
	}

	get id(){ return this.id }
    
	get name(){ return this.name }

	get contents(){ return this.contents }

	get allergens(){ return this.allergens }
	
	get image_path(){ return this.image_path }
	
	get reviews(){ return this.reviews }
	
	get cost(){ return this.cost }
	
	get rating() { return this.rating }
};

module.exports = SnackPack;