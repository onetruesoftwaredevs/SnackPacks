class DriverRating {

    constructor() {
        if (!DriverRating.instance) {
            this.rating = 0;
            DriverRating.instance = this;
        }
        return DriverRating.instance
    }

    static getInstance() {
        if (!DriverRating.instance) {
            DriverRating.instance = new DriverRating();
        }
        return DriverRating.instance
    }

    setRating(rating) {
        this.rating = rating;
    }

    getRating() {
        return this.rating;
    }


}

module.exports = DriverRating;