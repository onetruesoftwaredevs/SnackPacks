//Driver.js

class Driver {
    constructor(id, name, carmodel, carmake, trips){
        this.id = id;
        this.name = name;
        this.carmodel = carmodel;
        this.carmake = carmake;
        this.trips = trips;
    }

    get id(){ return this._id; }
    set id(value){ this._id = value; }

    get name(){ return this._name; }
    set name(value){ this._name = value; }

    get carmodel(){ return this._carmodel; }
    set carmodel(value){ this._carmodel = value; }

    get carmake(){ return this._carmake; }
    set carmake(value){ this._carmake = value; }

    get trips(){ return this._trips; }
    set trips(value){ this._trips = value; }

    checkout(){
        return this.total;
    }
}