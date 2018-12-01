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

    getData(){
        let url="https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/blacklist?command=list"
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({blacklistedUsers: responseJson});
                console.log(this.state.blacklistedUsers);
                this.setState({isLoading: false});
            });
    }

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }
        this.getData();
    }

    renderBlackList() {
        //[{"_user_id":"69","_reason":"Made way too many refund requests","_status":0},{"_user_id":"5","_reason":"Was very rude to driver.","_status":0},{"_user_id":"5","_reason":"[object Object]","_status":0},{"_user_id":"6","_reason":"Abused refunds","_status":0}]
        return [{}].concat(this.state.blacklistedUsers).map(
            (blacklistUser, i) =>
                i !== 0
                    ? <ListGroup key={i}>
                        <LinkContainer
                            key={i}
                            to={`/blacklist/${i}`}
                            className="links"
                        >
                            <ListGroupItem className="links"><h3>{"Blacklisted User #"+i+":"}</h3></ListGroupItem>
                        </LinkContainer>
                        <ListGroupItem className="all" header="User ID:">
                            {blacklistUser._user_id}
                        </ListGroupItem>
                        <ListGroupItem className="all" header="Reason:">
                            {blacklistUser._reason}
                        </ListGroupItem>
                        <ListGroupItem className="all" header="Status:">
                            {blacklistUser._status}
                        </ListGroupItem>
                    </ListGroup>
                    :
                    <div key={i}>
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
