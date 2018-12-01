/**
 * @author Stephen Davis
 *
 * @description manages the snack-packs received from the server and removes duplicates
 *
 */

class Menu {
    constructor() {
        if (!Menu.instance) {
            this._menu = [];
            this._names = [];
            this._search_filter = "name";
            this._sort_filter = "popularity";
            this._price_filter = 'none';
            this._allergy_filter = 'none',
                this._search = 'none';
            Menu.instance = this;
        }
        return Menu.instance;
    }

    static getInstance() {
        if (!Menu.instance) {
            Menu.instance = new Menu();
        }
        return Menu.instance;
    }

    setData(data) {
        this._names = [];
        this._menu = [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (item != null) {
                if (!this._names.includes(item._name)) {
                    this._names.push(item._name);
                    this._menu.push(item);
                }
            }
        }
    }

    setSearchFilter(filter) {
        this._search_filter = filter;
    }

    setSearchTerm(search) {
        this._search = search;
    }

    setSortFilter(filter) {
        this._sort_filter = filter;
    }

    setPriceFilter(filter) {
        this._price_filter = filter;
    }

    setAllergyFilter(filter) {
        this._allergy_filter = filter;
    }

    getSearchTerm() {
        return this._search;
    }

    getSortFilter() {
        return this._sort_filter;
    }

    getPriceFilter() {
        return this._price_filter;
    }

    getAllergyFilter() {
        return this._allergy_filter;
    }

    static getAverageRating(item) {
        let reviews = JSON.parse(item.reviews);
        let rating = 0;
        for (let i = 0; i < reviews.length; i++) {
            rating += reviews[i].rating;
        }
        return rating / reviews.length;
    }

    sortByPopularity() {
        for (let i = 0; i < this._menu.length - 1; i++) {
            for (let j = i + 1; j < this._menu.length; j++) {
                let item_i = this._menu[i];
                let item_j = this._menu[j];
                let review_i = Menu.getAverageRating(item_i);
                let review_j = Menu.getAverageRating(item_j);
                if (review_i < review_j) {
                    this._menu[i] = item_j;
                    this._menu[j] = item_i;
                }
            }
        }
    }

    sortByReview() {
        for (let i = 0; i < this._menu.length - 1; i++) {
            for (let j = i + 1; j < this._menu.length; j++) {
                let item_i = this._menu[i];
                let item_j = this._menu[j];
                let review_i = item_i.reviews.length;
                let review_j = item_j.reviews.length;
                if (review_i < review_j) {
                    this._menu[i] = item_j;
                    this._menu[j] = item_i;
                }
            }
        }
    }

    filter(current_data) {
        let data = current_data;
        if (this._price_filter === 'none') {
            data = this.filterPriceRange(0, data);
        }
        if (this._price_filter === 'range1') {
            data = this.filterPriceRange(5, data);
        }
        if (this._price_filter === 'range2') {
            data = this.filterPriceRange(10, data);
        }

        if (this._allergy_filter === 'none') {
            data = this.filterAllergy('none', data);
        }
        if (this._allergy_filter === 'peanut') {
            data = this.filterAllergy('peanuts', data);
        }
        if (this._allergy_filter === 'dairy') {
            data = this.filterAllergy('dairy', data);
        }

        return data;
    }

    filterPriceRange(range, current_data) {
        if (range === 0) {
            return current_data;
        }

        let data = [];
        for (let i = 0; i < current_data.length; i++) {
            if (current_data[i]._cost <= range) {
                data.push(current_data[i]);
            }
        }
        return data;
    }

    filterAllergy(allergy, current_data) {
        if (allergy === 'none') {
            return current_data;
        }

        let data = [];
        for (let i = 0; i < current_data.length; i++) {
            let allergies = current_data[i]._allergens;
            let seen = false;
            for (let j = 0; j < allergies.length; j++) {
                if (allergies[j] === allergy) {
                    seen = true;
                }
            }
            if (!seen) {
                data.push(current_data[i]);
            }
        }
        return data;
    }

    sort() {
        if (this._sort_filter === 'popularity') {
            this.sortByPopularity();
        } else {
            this.sortByReview();
        }
    }

    getSearch() {
        if (this._search_filter === 'none') {
            return this._menu;
        }

        if (this._search_filter === 'name') {
            let data = [];
            for (let i = 0; i < this._menu.length; i++) {
                let item = this._menu[i];
                if (item._name === this._search) {
                    data.push(item);
                }
            }
            return data;
        }

        if (this._search_filter === 'contents') {
            let data = [];
            for (let i = 0; i < this._menu.length; i++) {
                let item = this._menu[i];
                let contents = item._contents;
                for (let j = 0; j < contents.length; j++) {
                    let content = contents[j];
                    if (content === this._search) {
                        data.push(item);
                    }
                }
            }
            return data;
        }

        if (this._search_filter === 'allergens') {
            let data = [];
            for (let i = 0; i < this._menu.length; i++) {
                let item = this._menu[i];
                let allergens = item._allergens;
                let seen = false;
                for (let j = 0; j < allergens.length; j++) {
                    let allergen = allergens[j];
                    if (allergen === this._search) {
                        seen = true;
                    }
                }
                if (!seen) {
                    data.push(item);
                }
            }
            return data;
        }

        return [];
    }

    getData() {
        this.sort();

        if (this._search === 'none') {
            return this.filter(this._menu);
        }
        return this.filter(this.getSearch());
    }

    _sortReviewsByScore(reviews) {
        for (let i = 0; i < reviews.length - 1; i++) {
            for (let j = i + 1; j < reviews.length; j++) {
                let review_i = reviews[i];
                let review_j = reviews[j];
                let score_i = review_i.upvotes - review_i.downvotes;
                let score_j = review_j.upvotes - review_j.downvotes;
                if (score_j > score_i) {
                    reviews[i] = review_j;
                    reviews[j] = review_i;
                }
            }
        }
        return reviews;
    }

    getReviews(id) {
        for (let i = 0; i < this._menu.length; i++) {
            let item = this._menu[i];
            if (Number(item._key) === Number(id)) {
                // sort reviews
                return this._sortReviewsByScore(JSON.parse(item.reviews));
            }
        }

        return [];
    }
}

module.exports = Menu;