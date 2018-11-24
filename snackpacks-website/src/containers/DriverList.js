import React, { Component } from "react";
import {ListGroup, ListGroupItem, PageHeader} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./stylesheets/DriverList.css";

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
                                <ListGroupItem header="Reviews:">
                                    {(driver._reviews === "[]")?"No reviews.":(driver._reviews.split('|')).join(", ")}
                                </ListGroupItem>
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