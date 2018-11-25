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

    getSearchTerm() {
        return this._search;
    }

    getSortFilter() {
        return this._sort_filter;
    }

    static getAverageRating(item) {
        let rating = 0;
        for (let i = 0; i < item.reviews.length; i++) {
            rating += item.reviews[i].rating;
        }
        return rating / item.reviews.length;
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

        return [];
    }

    getData() {
        this.sort();

        if (this._search === 'none') {
            return this._menu;
        }
        return this.getSearch();
    }
}

module.exports = Menu;