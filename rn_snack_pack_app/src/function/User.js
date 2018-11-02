/**
 *
 * @author Stephen Davis
 *
 * @description class to hold data about the user using the app
 *
 */

class User {
    constructor(name, id) {
        this._name = name;
        this._id = id;
        this._orders = [];
    }

    static setInstance(name, id) {
        User.instance = new User(name, id);
    }

    static getInstance() {
        return User.instance;
    }

    loadOrders(orders) {
        this._orders = [];
        for (let i = 0; i < orders.length; i++) {
            let order = orders[i];
            if (order !== null) {
                if (Number(order._recipient) === Number(this._id)) {
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

    getId() {
        return this._id;
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

}

module.exports = User;