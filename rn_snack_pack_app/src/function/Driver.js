/**
 *
 * @author Stephen Davis
 *
 * @description class to hold data about the driver using the app
 *
 */

import React from 'react';

let OrderManager = require("./OrderManager");

class Review {
    constructor(value) {
        this._value = value;
    }
}

class Driver {
    constructor(name, id, phone, car_model, car_make, rating, status, reviews) {
        this._name = name;
        this._id = id;
        this._phone = phone;
        this._car_model = car_model;
        this._car_make = car_make;
        this._rating = rating;
        this._status = status;
        this._reviews = JSON.parse(reviews);
        this._current_order = null;
        this._orderManager = null;

        setInterval(() => {
            if (this._orderManager) {
                let orders = this.getOrders();
                for (let i = 0; i < orders.length; i++) {
                    let order_id = orders[i]._id;
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers";
                            url += "?command=updateloc&id=" + order_id;
                            fetch(url, {
                                method: "POST",
                                body: JSON.stringify({lat: position.coords.latitude, long: position.coords.longitude})
                            });
                        },
                        (error) => {
                        },
                        {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
                    );
                }
            }
        }, 60 * 1000);
    }

    static setInstance(name, id, phone, car_model, car_make, rating, status, reviews) {
        Driver.instance = new Driver(name, id, phone, car_model, car_make, rating, status, reviews);
    }

    static getInstance() {
        return Driver.instance;
    }

    static parse_reviews(reviews) {
        let out = [];
        let array = reviews.split('|');
        for (let i = 0; i < array.length; i++) {
            let review = array[i];
            out.push(new Review(review));
        }
        return out;
    }

    setOrderManager(orderManager) {
        this._orderManager = new OrderManager(orderManager.getOrders(true, this._id));
    }

    getOrderManager() {
        return this._orderManager;
    }

    getName() {
        return this._name;
    }

    getId() {
        return this._id;
    }

    getPhone() {
        return this._phone;
    }

    getCarModel() {
        return this._car_model;
    }

    getCarMake() {
        return this._car_make;
    }

    getRating() {
        return this._rating;
    }

    getStatus() {
        return this._status;
    }

    getReviews() {
        return this._reviews;
    }

    getOrders() {
        return this._orderManager.getOrders(true, this._id);
    }

    getCurrentOrder() {
        if (this._orderManager === null) {
            return null;
        }
        let orders = this._orderManager.getOrders(true, this._id);
        if (orders.length < 1) {
            return null;
        }
        return orders[0];
    }

    removeCurrentOrder() {
        this._orderManager.remove(0);
    }

}

module.exports = Driver;