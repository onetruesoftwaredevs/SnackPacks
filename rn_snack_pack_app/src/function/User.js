/**
 *
 * @author Stephen Davis
 *
 * @description class to hold data about the user using the app
 *
 */

import {Alert, AsyncStorage} from "react-native"

class User {
    constructor(name, custom_snackpacks) {
        this._name = name;
        this._orders = [];
        this._custom_snackpacks = custom_snackpacks;
    }

    static setInstance(name, custom_snackpacks) {
        User.instance = new User(name, custom_snackpacks);
    }

    static getInstance() {
        return User.instance;
    }

    getUserLocalDataJSON() {
        return JSON.stringify({
            name: this._name,
            custom_snackpacks: this._custom_snackpacks
        });
    }

    static loadLocal() {
        let data = AsyncStorage.getItem("USER", null);
        if (data !== null) {
            return data;
        }
        return null;
    }

    /*
        static saveLocal() {
            AsyncStorage.setItem("USER", this.getInstance().getUserLocalDataJSON(), (error) => {
                Alert.alert('', error);
            });
        }*/

    saveLocal = async () => {
        try {
            await AsyncStorage.setItem('USER', User.instance.getUserLocalDataJSON());
        } catch (error) {
            // Error saving data
            Alert.alert('', error);
        }
    };

    loadOrders(orders) {
        this._orders = [];
        for (let i = 0; i < orders.length; i++) {
            let order = orders[i];
            if (order !== null) {
                if (Number(order._recipient) === Number(this._name)) {
                    this._orders.push(order);
                }
            }
        }
    }

    insertOrder(order) {
        this._orders.push(order);
    }

    getName() {
        return this._name;
    }

    getOrders() {
        return this._orders;
    }

    getCurrentOrder() {
        if (this._orders.length === 0) {
            return null;
        }
        return this._orders[0];
    }

    removeCurrentOrder() {
        this._orders.splice(0, 1);
    }

    createCustomSnackPack(name) {
        let custom_snackpack = {
            name: name,
            snacks: [],
        };

        if (!this._custom_snackpacks) {
            this._custom_snackpacks = []
        }

        this._custom_snackpacks.push(custom_snackpack);
        this.saveLocal();
    }

    addSnackToCustomSnackPack(name, snack) {
        for (let i = 0; i < this._custom_snackpacks.length; i++) {
            let csp = this._custom_snackpacks[i];
            if (csp.name === name) {
                for (let j = 0; j < csp.snacks.length; j++) {
                    let _snack = csp.snacks[j];
                    if (_snack._name === snack._name) {
                        // already exists
                        return;
                    }
                }
                let _snack = {
                    _name: snack._name,
                    _price: snack._price,
                    _calories: snack._calories,
                    _allergens: snack._allergens,
                    _quantity: 1
                };
                csp.snacks.push(_snack);
            }
        }
        this.saveLocal();
    }

    setSnackQuantityInCustomSnackPack(name, snack_name, quantity) {
        for (let i = 0; i < this._custom_snackpacks.length; i++) {
            let csp = this._custom_snackpacks[i];
            if (csp.name === name) {
                for (let j = 0; j < csp.snacks.length; j++) {
                    let _snack = csp.snacks[j];
                    if (_snack._name === snack_name) {
                        _snack._quantity = quantity;
                    }
                }
            }
        }
        this.saveLocal();
    }

    getSnackQuantityFromCustomSnackPack(name, snack_name) {
        for (let i = 0; i < this._custom_snackpacks.length; i++) {
            let csp = this._custom_snackpacks[i];
            if (csp.name === name) {
                for (let j = 0; j < csp.snacks.length; j++) {
                    let _snack = csp.snacks[j];
                    if (_snack._name === snack_name) {
                        return _snack._quantity;
                    }
                }
            }
        }
        return 0;
    }

    removeSnackFromCustomSnackPack(name, snack_name) {
        for (let i = 0; i < this._custom_snackpacks.length; i++) {
            let csp = this._custom_snackpacks[i];
            if (csp.name === name) {
                for (let j = 0; j < csp.snacks.length; j++) {
                    let _snack = csp.snacks[j];
                    if (_snack._name === snack_name) {
                        csp.snacks.splice(j, 1);
                    }
                }
            }
        }
        this.saveLocal();
    }

    getCustomSnackPackPrice(name) {
        let price = 0.0;
        for (let i = 0; i < this._custom_snackpacks.length; i++) {
            let csp = this._custom_snackpacks[i];
            if (csp.name === name) {
                for (let j = 0; j < csp.snacks.length; j++) {
                    let _snack = csp.snacks[j];
                    price += _snack._price * _snack._quantity;
                }
            }
        }
        return price;
    }

    getCustomSnackPacks() {
        if (this._custom_snackpacks === undefined) {
            return [];
        }
        return this._custom_snackpacks;
    }

    getCustomSnackPack(name) {
        for (let i = 0; i < this._custom_snackpacks.length; i++) {
            let csp = this._custom_snackpacks[i];
            if (csp.name === name) {
                return csp;
            }
        }
    }

}

module.exports = User;