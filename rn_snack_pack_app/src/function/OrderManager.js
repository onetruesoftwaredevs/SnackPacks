/**
 *
 * @author Stephen Davis
 *
 * @description class to manage a set of orders
 *
 */

class OrderManager {

    constructor(orders) {
        this._orders = new Array();
        for (let i = 0; i < orders.length; i++) {
            let order = orders[i];
            if (order != null) {
                this._orders.push(order);
            }
        }
    }

    static setOrder(id) {
        OrderManager.globalOrder = id;
    }

    static getOrder() {
        return OrderManager.globalOrder;
    }


    getOrders(isDriver, driver_id) {
        let orders = new Array();
        for (let i = 0; i < this._orders.length; i++) {
            let order = this._orders[i];
            if (isDriver) {
                if (order._driver === driver_id) {
                    orders.push(order);
                }
            }
            else {
                if (order._driver === "-1") {
                    orders.push(order);
                }
            }
        }
        return orders;
    }

    getOrderById(id) {
        for (let i = 0; i < this._orders.length; i++) {
            let order = this._orders[i];
            if (order._id === id) {
                return order;
            }
        }
        return null;
    }

    remove(index) {
        this._orders.splice(index, 1);
    }

    removeOrderById(id) {
        for (let i = 0; i < this._orders.length; i++) {
            let order = this._orders[i];
            if (order._id === id) {
                this._orders.splice(i, 1);
                return;
            }
        }
    }

    insertOrder(order) {
        this._orders.push(order);
    }

}

module.exports = OrderManager;