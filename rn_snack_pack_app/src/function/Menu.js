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
            this._search_filter = "none";
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

    getSearchTerm() {
        return this._search;
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
        if (this._search === 'none') {
            return this._menu;
        }
        return this.getSearch();
    }
}

module.exports = Menu;