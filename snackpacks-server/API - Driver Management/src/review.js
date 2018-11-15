//Review.js

class Review {
    constructor(author, title, score, upvotes, downvotes, description){
        //Add Time and Status
        this.author = author;
        this.title = title;
        this.score = score;
        this.upvotes = upvotes;
        this.downvotes = downvotes;
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
    
    get upvotes(){ return this._upvotes; }
    set upvotes(value){ this._upvotes = value; }
    
    get downvotes(){ return this._downvotes; }
    set downvotes(value){ this._downvotes = value; }

    get description(){ return this._description; }
    set description(value){ this._description = value; }
};

module.exports = Review;