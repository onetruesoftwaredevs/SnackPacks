/**
 *
 * @author Stephen Davis
 *
 * @description class to hold data about the driver using the app
 *
 */

let OrderManager = require("./OrderManager");

class Driver {
    constructor(name, id) {
        this._name = name;
        this._id = id;
        this._current_order = null;
        this._orderManager = null;
    }

    static setInstance(name, id) {
        Driver.instance = new Driver(name, id);
    }

    static getInstance() {
        return Driver.instance;
    }

    setOrderManager(orderManager) {
        this._orderManager = new OrderManager(orderManager.getOrders(true, this._id));
    }

    getName() {
        return this._name;
    }

    getId() {
        return this._id;
    }

    getOrders() {
        return this._orderManager.getOrders(true, this._id);
    }

    getCurrentOrder() {
        if (this._orderManager === null) { return null; }
        let orders = this._orderManager.getOrders(true, this._id);
        if (orders.length === 0) {
            return null;
        }
        return orders[0];
    }

    removeCurrentOrder() {
        this._orderManager.remove(0);
    }

}

module.exports = Driver;