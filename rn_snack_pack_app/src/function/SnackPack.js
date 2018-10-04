

class SnackPack{
	
	var jsonFormat = {"_id":1, "_name":"Testing SnackPack", "_contents": ["Food"], "_allergens":["Allergens"], "image_path":"", "reviews":"", "cost":20, "rating":4};
		
	constructor(givenJson){
		var jsonInfo = JSON.parse(givenJson);
		
		this.id = jsonInfo._id;
		this.name = jsonInfo._name;
		this.contents = jsonInfo._contents;
		this.allergens = jsonInfo._allergens;
		this.image_path = jsonInfo.image_path;
		this.reviews = jsonInfo.reviews;
		this.cost = jsonInfo.cost;
		this.rating = jsonInfo.rating;
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