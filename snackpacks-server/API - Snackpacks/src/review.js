class Review {
    constructor(author, title, description, upvotes, downvotes){
        //Add Time and Status
        this.author = author;
        this.title = title;
        this.description = description;
        this.upvotes = upvotes;
        this.downvotes = downvotes;
    }

    get author(){ return this._author; }
    set author(value){ this._author = value; }

    get title(){ return this._title; }
    set title(value){ this._title = value; }

    get description(){ return this._description; }
    set description(value){ this._description = value; }

    get upvotes(){ return this._upvotes; }
    set upvotes(value){ this._upvotes = value; }

    get downvotes(){ return this._downvotes; }
    set downvotes(value){ this._downvotes = value; }
};

module.exports = Review;
