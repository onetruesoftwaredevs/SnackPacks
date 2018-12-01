import React, { Component } from "react";
import { Image, PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Link from "react-router-dom/es/Link";
import "./stylesheets/Home.css";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            snackpacks: []
        };
    }
    async componentDidMount() {

        if (!this.props.isAuthenticated) {
            return;
        }

        return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks/?command=list")
            .then(response => response.json())
            .then(responseJson => this.setState({
                snackpacks: responseJson
            }))
            .then(() => console.log(this.state.snackpacks))
            .then(() => this.setState({isLoading: false}));
    }

    renderReview(review){
        if(review && review.length > 23){
            review = review.substr(0,20);
            return <div className="reviews">
                <p>{review+"..."}</p>
            </div>
        }
        return <div className="reviews">
            <p>{review}</p>
        </div>
    }

    renderReviews(reviews, i){
        // title, author, rating, review, upvotes, downvotes
        if(reviews.length === 1){
            return <div className="reviews">
                <Link className="links" to={`/snackpack/reviews/${i}`}>
                    <h3 className="links">{"Reviews:"}</h3>
                </Link>
                <div>
                    <h4>{reviews[0].title+": "+reviews[0].rating+"/5"}</h4>
                </div>
                {this.renderReview(reviews[0].review)}
            </div>
        }
        let review1 = reviews[0];
        let review2 = reviews[1];
        for(let j=1; j<reviews.length; j++){
            if(reviews[j].upvotes - reviews[j].downvotes > review1.upvotes - review1.downvotes){
                review2 = review1;
                review1 = reviews[j];
            }else if(reviews[j].upvotes - reviews[j].downvotes > review2.upvotes - review2.downvotes){
                review2 = reviews[j];
            }
        }
        return <div className="reviews">
            <Link className="links" to={`/snackpack/reviews/${i}`}>
                <h3 className="links">{"Reviews:"}</h3>
            </Link>
            <div>
                <h4>{review1.title+": "+review1.rating+"/5"}</h4>
            </div>
            {this.renderReview(review1.review)}
            <div>
                <h4>{review2.title+": "+review2.rating+"/5"}</h4>
            </div>
            {this.renderReview(review2.review)}
            {(reviews.length > 2)?
                <div>
                    <h4>...</h4>
                </div>
                :
                <></>
            }
        </div>
    }

    renderSnackPacksList(snackpacks) {
        return [{}].concat(snackpacks).map(
            (snackpack, i) =>
                i !== 0
                    ? <div className="listed">
                        <LinkContainer
                            key={i}
                            to={`/snackpack/${i}`}
                            className="links"
                        >
                            <ListGroupItem className="links"><h3>{snackpack._name+":"}</h3></ListGroupItem>
                        </LinkContainer>
                    <ListGroup>
                        <div className="all">
                            <ListGroupItem header="Contents:">
                                {snackpack._contents.join(", ")}
                            </ListGroupItem>
                            <ListGroupItem header="Allergens:">
                                {snackpack._allergens.join(", ")}
                            </ListGroupItem>
                        </div>
                        <div className="all">
                            <ListGroupItem header="Cost:">
                                {"$" + snackpack._cost.toFixed(2)}
                            </ListGroupItem>
                            {(snackpack.reviews === "[]") ?
                                <ListGroupItem header="Reviews:">
                                    {"No reviews"}
                                </ListGroupItem>
                                :
                                <div>
                                    {this.renderReviews(JSON.parse(snackpack.reviews), i)}
                                </div>
                            }
                        </div>
                        <div className="all">
                            <ListGroupItem header="Image:">
                                <Image src={snackpack.image_path} className="image" thumbnail />
                            </ListGroupItem>
                        </div>
                    </ListGroup>
                    </div>
                :
                    <div>
                        <LinkContainer
                            key="new"
                            to="/snackpack/new"
                            className="links"
                        >
                            <ListGroupItem className="links">
                                <h3><b>{"\uFF0B"}</b> Create new SnackPack</h3>
                            </ListGroupItem>
                        </LinkContainer>
                    </div>
        );
    }

    handleSnackPackClick = event => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute("href"));
    }

    renderLander() {
        return (
            <div className="lander">
                <h1>SnackPacks</h1>
                <p>the admin website</p>
            </div>
        );
    }

    renderSnackPacks() {
        return (
            <div className="snackpacks">
                <PageHeader>SnackPacks:</PageHeader>
                <ListGroup>
                    {!this.state.isLoading && this.renderSnackPacksList(this.state.snackpacks)}
                </ListGroup>
                <br></br>
            </div>
        );
    }

    render() {
        return (
            <div className="Home">
                {this.props.isAuthenticated ? this.renderSnackPacks() : this.renderLander()}
            </div>
        );
    }
}