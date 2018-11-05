/**
 * @author Stephen Davis
 *
 * @description manages the snack-packs received from the server and removes duplicates
 *
 */

class Menu {
    constructor() {
        if (!Menu.instance) {
            this._menu = new Array();
            this._names = new Array();
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

    getData() {
        return this._menu;
    }
}

module.exports = Menu;