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

    getOrders() {
        return this._orders;
    }

}

module.exports = OrderManager;