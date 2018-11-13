//Order.js

class Review {
    constructor(id, author, title, score, description){
        //Add Time and Status
        this.id = id;
        this.author = author;
        this.title = title;
        this.score = score;
        this.description = description;
    }

    get id(){ return this._id; }
    set id(value){ this._id = value; }

    get author(){ return this._author; }
    set author(value){ this._author = value; }

    get title(){ return this._title; }
    set title(value){ this._title = value; }

    get score(){ return this._score; }
    set score(value){ this._score = value; }
    
    get description(){ return this._description; }
    set description(value){ this._description = value; }
};

module.exports = Review;