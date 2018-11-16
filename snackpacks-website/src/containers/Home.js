import React, { Component } from "react";
import { Image, PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./stylesheets/Home.css";

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

        return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks/?command=list")
            .then(response => response.json())
            .then(responseJson => this.setState({
                snackpacks: responseJson
            }))
            .then(() => console.log(this.state.snackpacks))
            .then(() => this.setState({isLoading: false}));
    }

    renderSnackPacksList(snackpacks) {
        return [{}].concat(snackpacks).map(
            (snackpack, i) =>
                i !== 0
                    ? <ListGroup>
                        <br></br>
                        <LinkContainer
                            key={i}
                            to={`/snackpack/${i}`}
                        >
                            <ListGroupItem header={snackpack._name+":"}>{"(SnackPack #"+snackpack._key+")"}</ListGroupItem>
                        </LinkContainer>
                        <ListGroupItem header="Contents:">
                            {snackpack._contents.join(", ")}
                        </ListGroupItem>
                        <ListGroupItem header="Allergens:">
                            {snackpack._allergens.join(", ")}
                        </ListGroupItem>
                        <ListGroupItem header="Cost:">
                            {"$" + snackpack._cost.toFixed(2)}
                        </ListGroupItem>
                        <ListGroupItem header="Reviews:">
                            {(snackpack.reviews === "[]")?"No reviews.":snackpack.reviews}
                        </ListGroupItem>
                        <ListGroupItem header="Image:">
                            <Image src={snackpack.image_path} className="image" thumbnail />
                        </ListGroupItem>
                    </ListGroup>
                :
                    <LinkContainer
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