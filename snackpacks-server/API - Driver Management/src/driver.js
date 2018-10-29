//Driver.js

class Driver {
    constructor(id, name, phone, carmodel, carmake, trips, status){
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.carmodel = carmodel;
        this.carmake = carmake;
        this.trips = trips;
        this.status = status;
    }

    get id(){ return this._id; }
    set id(value){ this._id = value; }

    get name(){ return this._name; }
    set name(value){ this._name = value; }

    get phone(){ return this._phone; }
    set phone(value){ this._phone = value; }

    get carmodel(){ return this._carmodel; }
    set carmodel(value){ this._carmodel = value; }

    get carmake(){ return this._carmake; }
    set carmake(value){ this._carmake = value; }

    get trips(){ return this._trips; }
    set trips(value){ this._trips = value; }

    get status(){ return this._status; }
    set status(value){ this._status = value; }

    checkout(){
        return this.total;
    }
}

module.exports = Driver;