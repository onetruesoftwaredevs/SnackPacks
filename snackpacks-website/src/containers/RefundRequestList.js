import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./DriverList.css";

export default class DriverList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            refundRequests: []
        };
    }

    async componentDidMount() {

        if (!this.props.isAuthenticated) {
            return;
        }

        return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers/?command=list")
            .then(response => response.json())
            .then(responseJson => this.setState({
                refundRequests: responseJson
            }))
            .then(() => console.log(this.state.refundRequests))
            .then(() => this.setState({isLoading: false}));
    }

    render() {
        return [{}].concat(this.state.refundRequests).map(
            (refundRequst, i) =>
                i !== 0
                    ? <ListGroup>
                        <br></br>
                        <LinkContainer
                            key={i}
                            to={`/refreq/${i}`}
                        >
                            <ListGroupItem header={refundRequst._name+":"}>{"(Refund Request #"+i+")"}</ListGroupItem>
                        </LinkContainer>
                        <ListGroupItem header="Status:">
                            {(refundRequst._status === "0")?"Not busy":"Busy delivering an order"}
                        </ListGroupItem>
                        <ListGroupItem header="Phone Number:">
                            {refundRequst._phone}
                        </ListGroupItem>
                        <ListGroupItem header="Reviews:">
                            {(refundRequst._reviews === "")?"No reviews.":(refundRequst._reviews.split('|')).join(", ")}
                        </ListGroupItem>
                    </ListGroup>
                    :
                    <ListGroup>
                        <br></br>
                        <ListGroupItem>
                            <h4>
                                List of Refund Requests:
                            </h4>
                        </ListGroupItem>
                    </ListGroup>
        );
    }

    handleDriverClick = event => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute("href"));
    }
}