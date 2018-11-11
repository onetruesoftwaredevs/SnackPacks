import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./stylesheets/UserList.css";

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

    render() {
        return [{}].concat(this.state.drivers).map(
            (driver, i) =>
                i !== 0
                    ? <ListGroup>
                        <br></br>
                        <LinkContainer
                            key={i}
                            to={`/users/${i}`}
                        >
                            <ListGroupItem header={driver._name+":"}>{"(Driver #"+i+")"}</ListGroupItem>
                        </LinkContainer>
                        <ListGroupItem header="Status:">
                            {(driver._status === "0")?"Not busy":"Busy delivering an order"}
                        </ListGroupItem>
                        <ListGroupItem header="Phone Number:">
                            {driver._phone}
                        </ListGroupItem>
                        <ListGroupItem header="Car Model:">
                            {driver._carmodel}
                        </ListGroupItem>
                        <ListGroupItem header="Car Make:">
                            {driver._carmake}
                        </ListGroupItem>
                        <ListGroupItem header="Rating:">
                            {driver._rating}
                        </ListGroupItem>
                        <ListGroupItem header="Reviews:">
                            {(driver._reviews === "")?"No reviews.":(driver._reviews.split('|')).join(", ")}
                        </ListGroupItem>
                    </ListGroup>
                    :
                    <ListGroup>
                        <br></br>
                        <ListGroupItem>
                            <h4>
                                User List:
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