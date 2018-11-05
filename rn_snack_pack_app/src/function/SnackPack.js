class SnackPack {

    constructor(id, name, contents, allergens, image_path, reviews, cost, rating) {
        this.id = id;   // int
        this.name = name;   // string
        this.contents = contents;  // array
        this.allergens = allergens;  // array
        this.image_path = image_path;   // string (url)
        this.reviews = reviews;  // string
        this.cost = cost;   // number
        this.rating = rating;   // int
    }

    get id() {
        return this.id
    }

    set id(value) {
        this._id = value
    }

    get name() {
        return this.name
    }

    set name(value) {
        this._name = value
    }

    get contents() {
        return this.contents
    }

    set contents(value) {
        this._contents = value
    }

    get allergens() {
        return this.allergens
    }

    set allergens(value) {
        this._allergens = value
    }

    get image_path() {
        return this.image_path
    }

    get reviews() {
        return this.reviews
    }

    get cost() {
        return this.cost
    }

    get rating() {
        return this.rating
    }
};

module.exports = SnackPack;