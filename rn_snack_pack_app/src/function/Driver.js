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

}

module.exports = Driver;