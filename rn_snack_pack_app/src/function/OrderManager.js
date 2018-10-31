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

}

module.exports = OrderManager;