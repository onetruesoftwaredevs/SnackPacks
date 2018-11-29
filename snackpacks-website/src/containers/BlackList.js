import React, { Component } from "react";
import {ListGroup, ListGroupItem, PageHeader} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./stylesheets/BlackList.css";

export default class BlackList extends Component {
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

        //TODO: replace this fetch with what actually fetches the blacklisted users (sets blacklistedUsers to that list)
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
                        <LinkContainer
                            key={i}
                            to={`/blacklist/${i}`}
                            className="links"
                        >
                            <ListGroupItem className="links"><h3>{"Blacklisted User #"+i+":"}</h3></ListGroupItem>
                        </LinkContainer>
                        <ListGroupItem className="all" header="Name:">
                            {blacklistUser._name}
                        </ListGroupItem>
                        <ListGroupItem className="all" header="Phone Number:">
                            {blacklistUser._phone}
                        </ListGroupItem>
                        <ListGroupItem className="all" header="Address:">
                            {blacklistUser._rating}
                        </ListGroupItem>
                    </ListGroup>
                    :
                    <div>
                        <LinkContainer
                            key="new"
                            to="/blacklist/new"
                            className="links"
                        >
                            <ListGroupItem className="links">
                                <h3><b>{"\uFF0B"}</b>Add User to Blacklist</h3>
                            </ListGroupItem>
                        </LinkContainer>
                    </div>
        );
    }

    render() {
        return (
            <div className="BlackList">
                <PageHeader>Blacklist:</PageHeader>
                {this.renderBlackList()}
                <br></br>
            </div>
        );
    }

    handleBLUserClick = event => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute("href"));
    }
}