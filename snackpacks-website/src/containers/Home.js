import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";

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

        try {
            const snackpacks = await this.snackpacks();
            this.setState({ snackpacks });
        } catch (e) {
            alert(e);
        }

        this.setState({ isLoading: false });
    }

    snackpacks() {
        return API.get("snackpacks", "/snackpacks");
    }

    renderSnackPacksList(snackpacks) {
        return [{}].concat(snackpacks).map(
            (snackpack, i) =>
                i !== 0
                    ? <LinkContainer
                        key={snackpack.id}
                        to={`/notes/${snackpack.id}`}
                    >
                        <ListGroupItem header={snackpack.content.trim().split("\n")[0]}>
                            {"Created: " + new Date(snackpack.name).toLocaleString()}
                        </ListGroupItem>
                    </LinkContainer>
                    : <LinkContainer
                        key="new"
                        to="/snackpack/new"
                    >
                        <ListGroupItem>
                            <h4>
                                <b>{"\uFF0B"}</b> Create new SnackPack
                            </h4>
                        </ListGroupItem>
                    </LinkContainer>
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