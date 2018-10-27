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
        this._orderManager = new OrderManager(orderManager.getOrders());
    }

    getOrderURL() {
        let url = 'https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers?command=own&id=';
        let names = this._name.split(' ');
        url = url + names[0] + "%" + this._id + names[1];
        return url;
    }

    getName() {
        return this._name;
    }

    getOrders() {
        return this._orderManager.getOrders();
    }

}

module.exports = Driver;