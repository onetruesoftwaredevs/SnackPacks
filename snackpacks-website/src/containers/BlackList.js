import React, { Component } from "react";
import {ListGroup, ListGroupItem, PageHeader} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./stylesheets/BlackList.css";

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

    renderBlackList() {
        return [{}].concat(this.state.drivers).map(
            (driver, i) =>
                i !== 0
                    ? <ListGroup>
                        <LinkContainer
                            key={i}
                            to={`/blacklist/${i}`}
                        >
                            <ListGroupItem header={driver._name+":"}>{"(Driver #"+i+")"}</ListGroupItem>
                        </LinkContainer>
                        <ListGroupItem header="Status:">
                            {(driver._status === "0")?"Not busy":"Busy delivering an order"}
                        </ListGroupItem>
                        <ListGroupItem header="Phone Number:">
                            {driver._phone}
                        </ListGroupItem>
                        <ListGroupItem header="Rating:">
                            {driver._rating}
                        </ListGroupItem>
                        <ListGroupItem header="Reviews:">
                            {(driver._reviews === "")?"No reviews.":(driver._reviews.split('|')).join(", ")}
                        </ListGroupItem>
                        <br></br>
                    </ListGroup>
                    :
                    <></>
        );
    }

    render() {
        return (
            <div className="BlackList">
                <PageHeader>Blacklist:</PageHeader>
                {this.renderBlackList()}
            </div>
        );
    }

    handleDriverClick = event => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute("href"));
    }
}