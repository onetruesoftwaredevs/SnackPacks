import React, { Component } from "react";
import {ListGroup, ListGroupItem, PageHeader} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./stylesheets/BlackList.css";

export default class DriverList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            blacklistedUsers: []
        };
    }

    async componentDidMount() {

        if (!this.props.isAuthenticated) {
            return;
        }

        return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers/?command=list")
            .then(response => response.json())
            .then(responseJson => this.setState({
                blacklistedUsers: responseJson
            }))
            .then(() => console.log(this.state.blacklistedUsers))
            .then(() => this.setState({isLoading: false}));
    }

    renderBlackList() {
        return [{}].concat(this.state.blacklistedUsers).map(
            (blacklistUser, i) =>
                i !== 0
                    ? <ListGroup>
                        <br></br>
                        <LinkContainer
                            key={i}
                            to={`/blacklist/${i}`}
                        >
                            <ListGroupItem header={"Blacklisted User #"+i+":"}>{}</ListGroupItem>
                        </LinkContainer>
                        <ListGroupItem header="Name:">
                            {blacklistUser._name}
                        </ListGroupItem>
                        <ListGroupItem header="Phone Number:">
                            {blacklistUser._phone}
                        </ListGroupItem>
                        <ListGroupItem header="Address:">
                            {blacklistUser._rating}
                        </ListGroupItem>
                    </ListGroup>
                    :
                    <LinkContainer
                        key="new"
                        to="/blacklist/new"
                    >
                        <ListGroupItem>
                            <h4>
                                <b>{"\uFF0B"}</b> Add User to Blacklist
                            </h4>
                        </ListGroupItem>
                    </LinkContainer>
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