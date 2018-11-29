import React, { Component } from "react";
import PageHeader from "react-bootstrap/es/PageHeader";
import "./stylesheets/SnackPackReviews.css";

export default class SnackPacks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: parseInt((window.location.pathname).substring(19))-1,
            key: 0,
            isLoading: true,
            driver: [],
            name: "",
            reviews: []
        };
    }

    async componentDidMount() {
        // title, author, rating, review, upvotes, downvotes
        try {
            return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks/?command=list")
                .then(response => response.json())
                .then(responseJson => this.setState({
                    driver: responseJson[this.state.number]
                }))
                .then(() => this.setState({
                    key: this.state.driver._key,
                    name: this.state.driver._name,
                    reviews: JSON.parse(this.state.driver.reviews)
                }))
                .then(() => console.log(this.state.reviews))
                .then(() => this.setState({isLoading: false}));
        } catch (e) {
            alert(e);
        }
    }

    renderAllReviews(reviews){
        if(reviews.length === 1){
            return <div className="reviews">
                <h4>
                    {reviews[0].title+": "+reviews[0].rating+"/5 👍x"+reviews[0].upvotes+" 👎x"+reviews[0].downvotes}
                </h4>
                <h3>
                    {"By: "+reviews[0].author}
                </h3>
                <p>
                    {reviews[0].review}
                </p>
            </div>
        }
        let revs = [];
        for(let j=0; j<reviews.length; j++){
            revs.push(reviews[j]);
        }
        for(let j=0; j<reviews.length; j++){
            for(let k=j+1; k<reviews.length; k++) {
                if (revs[j].upvotes - revs[j].downvotes < revs[k].upvotes - revs[k].downvotes) {
                    let a = revs[j];
                    revs[j] = revs[k];
                    revs[k] = a;
                }
            }
        }
        return [{}].concat(revs).map(
            (review, i) =>
                i !== 0
                    ? <div className="reviews">
                        <h4>
                            {review.title+": "+review.rating+"/5 👍x"+review.upvotes+" 👎x"+review.downvotes}
                        </h4>
                        <h3>
                            {"By: "+review.author}
                        </h3>
                        <p>
                            {review.review}
                        </p>
                    </div>
                    : <></>
        );
    }

    render() {
        return (
            <div className="SnackPacks">
                <PageHeader>
                    {"Reviews of SnackPack #"+(this.state.number+1)+", "+(this.state.name)+":"}
                </PageHeader>
                <br></br>
                <div>
                    {!this.state.isLoading && this.renderAllReviews(this.state.reviews)}
                </div>
            </div>
        );
    }
}