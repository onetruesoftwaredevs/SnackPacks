class Review {
    constructor(author, title, description){
        //Add Time and Status
        this.author = author;
        this.title = title;
        this.description = description;
    }

    get author(){ return this._author; }
    set author(value){ this._author = value; }

    get title(){ return this._title; }
    set title(value){ this._title = value; }

    get description(){ return this._description; }
    set description(value){ this._description = value; }
};

module.exports = Review;
