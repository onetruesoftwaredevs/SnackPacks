import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

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
                        <LinkContainer
                            key={i}
                            to={`/drivers/${i}`}
                        >
                            <ListGroupItem header={driver._name+":"}>{"(Driver #"+i+")"}</ListGroupItem>
                        </LinkContainer>
                        <ListGroupItem header="Name:">
                            {driver._name}
                        </ListGroupItem>
                        <ListGroupItem header="State:">
                            {driver._status}
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
                    </ListGroup>
                    :
                    <LinkContainer
                        key="new"
                        to="/drivers/new"
                    >
                        <ListGroupItem>
                            <h4>
                                <b>{"\uFF0B"}</b> Create new Driver
                            </h4>
                        </ListGroupItem>
                    </LinkContainer>
        );
    }

    handleDriverClick = event => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute("href"));
    }
}