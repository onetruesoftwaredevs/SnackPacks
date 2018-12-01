import React, { Component } from "react";
import {ListGroup, ListGroupItem, PageHeader} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./stylesheets/DriverList.css";
import Link from "react-router-dom/es/Link";

export default class DriverList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            drivers: []
        };
    }

    async componentDidMount() {

        if (!this.props.isAuthenticated) {
            return;
        }

        return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers/?command=list")
            .then(response => response.json())
            .then(responseJson => this.setState({
                drivers: responseJson
            }))
            .then(() => console.log(this.state.drivers))
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
                <Link className="links" to={`/drivers/reviews/${i}`}>
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
            <Link className="links" to={`/drivers/reviews/${i}`}>
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

    renderDriverList(drivers) {
        return [{}].concat(drivers).map(
            (driver, i) =>
                i !== 0
                    ? <div className="listed">
                        <LinkContainer
                            key={i}
                            to={`/drivers/${i}`}
                            className="links"
                        >
                            <ListGroupItem className="links"><h3>{driver._name+":"}</h3></ListGroupItem>
                        </LinkContainer>
                        <ListGroup>
                            <div className="all">
                                <ListGroupItem header="Status:">
                                    {(driver._status === "0")?"Not busy":"Busy delivering an order"}
                                </ListGroupItem>
                                <ListGroupItem header="Phone Number:">
                                    {driver._phone}
                                </ListGroupItem>
                            </div>
                            <div className="all">
                                <ListGroupItem header="Car Model:">
                                    {driver._carmodel}
                                </ListGroupItem>
                                <ListGroupItem header="Car Make:">
                                    {driver._carmake}
                                </ListGroupItem>
                            </div>
                            <div className="all">
                                <ListGroupItem header="Rating:">
                                    {driver._rating}
                                </ListGroupItem>
                                {(driver._reviews === "[]") ?
                                    <ListGroupItem header="Reviews:">
                                        {"No reviews"}
                                    </ListGroupItem>
                                    :
                                    <div>
                                        {this.renderReviews(JSON.parse(driver._reviews), i)}
                                    </div>
                                }
                            </div>
                        </ListGroup>
                    </div>
                    :
                    <div>
                        <LinkContainer
                            key="new"
                            to="/drivers/new"
                            className="links"
                        >
                            <ListGroupItem className="links">
                                <h3><b>{"\uFF0B"}</b> Create new Driver</h3>
                            </ListGroupItem>
                        </LinkContainer>
                    </div>
        );
    }

    render() {
        return (
            <div className="DriverList">
                <PageHeader>Drivers:</PageHeader>
                <ListGroup>
                {this.renderDriverList(this.state.drivers)}
                </ListGroup>
            </div>
        );
    }

    handleDriverClick = event => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute("href"));
    }
}