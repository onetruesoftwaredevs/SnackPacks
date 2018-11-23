import React, { Component } from "react";
import LoaderButton from "../components/LoaderButton";
import FormGroup from "react-bootstrap/es/FormGroup";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import FormControl from "react-bootstrap/es/FormControl";
import PageHeader from "react-bootstrap/es/PageHeader";
import "./stylesheets/SnackPacks.css";

export default class SnackPacks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: parseInt((window.location.pathname).substring(11))-1,
            key: 0,
            isLoading: null,
            isDeleting: null,
            snackpack: [],
            name: "",
            contents: "",
            allergens: "",
            reviews: "",
            imageURL: "",
            cost: 0
        };
    }

    async componentDidMount() {
        try {
            return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks/?command=list")
                .then(response => response.json())
                .then(responseJson => this.setState({
                    snackpack: responseJson[this.state.number]
                }))
                .then(() => this.setState({
                    key: this.state.snackpack._key,
                    name: this.state.snackpack._name,
                    contents: this.state.snackpack._contents,
                    allergens: this.state.snackpack._allergens,
                    reviews: this.state.snackpack.reviews,
                    imageURL: this.state.snackpack.image_path,
                    cost: this.state.snackpack._cost
                }))
                .then(() => console.log(this.state.snackpack))
                .then(() => this.setState({isLoading: false}));
        } catch (e) {
            alert(e);
        }
    }

    validateForm() {
        if(this.state.contents && this.state.name && this.state.imageURL) {
            if(this.state.name === this.state.snackpack._name && this.state.contents === this.state.snackpack._contents &&
                this.state.allergens === this.state.snackpack._allergens && this.state.imageURL === this.state.snackpack.image_path
                && parseFloat(this.state.cost) === this.state.snackpack._cost){ return false; }
            return this.state.contents.length > 0 && this.state.name.length > 0 && this.state.cost > 0;
        }else{
            return false;
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    saveSnackPack() {
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/?command=edit&id=" + (this.state.key);
        console.log(url);
        let cost = parseFloat(this.state.cost)
        let data = {
            name:(this.state.name === this.state.snackpack._name?null:this.state.name),
            contents:(this.state.contents === this.state.snackpack._contents?null:this.state.contents),
            allergens:(this.state.allergens === this.state.snackpack._allergens?null:this.state.allergens),
            image_path:(this.state.imageURL === this.state.snackpack.image_path?null:this.state.imageURL),
            reviews:null,
            cost:(this.state.cost === this.state.snackpack._cost?null:cost),
            rating:null
        };
        let outputData = JSON.stringify(data);
        console.log(outputData);
        return fetch(url, {
            method: "POST",
            body: outputData
        })
        .then(response => response.json())
        .then(response => console.log(response));
    }

    handleSubmit = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to modify this SnackPack?"
        );

        if (!confirmed) {
            return;
        }

        this.setState({ isLoading: true });

        try {
            await this.saveSnackPack();
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    deleteSnackPack() {
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/?command=delete&id=" + (this.state.key);
        return fetch(url, {
            method: "GET"
        })
        .then(response => response.json())
        .then(response => console.log(response));
    }

    handleDelete = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this SnackPack?"
        );

        if (!confirmed) {
            return;
        }

        this.setState({ isDeleting: true });

        try {
            await this.deleteSnackPack();
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isDeleting: false });
        }
    }

    render() {
        return (
            <div className="SnackPacks">
                <PageHeader>{"SnackPack #" + (this.state.number+1) + ":"}</PageHeader>
                {this.state.snackpack &&
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="name">
                        <ControlLabel>Name: </ControlLabel>
                        <FormControl
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </FormGroup>
                    <FormGroup controlId="contents">
                        <ControlLabel>Contents: </ControlLabel>
                        <FormControl
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.contents}
                        />
                    </FormGroup>
                    <FormGroup controlId="allergens">
                        <ControlLabel>Allergens: </ControlLabel>
                        <FormControl
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.allergens}
                        />
                    </FormGroup>
                    <FormGroup controlId="imageURL">
                        <ControlLabel>Picture URL: </ControlLabel>
                        <FormControl
                            type="url"
                            onChange={this.handleChange}
                            value={this.state.imageURL}
                        />
                    </FormGroup>
                    <FormGroup controlId="cost">
                        <ControlLabel>Cost: </ControlLabel>
                        <FormControl
                            type="number"
                            step="0.01"
                            onChange={this.handleChange}
                            value={this.state.cost}
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Save"
                        loadingText="Saving…"
                    />
                    <LoaderButton
                        block
                        bsStyle="danger"
                        bsSize="large"
                        isLoading={this.state.isDeleting}
                        onClick={this.handleDelete}
                        text="Delete"
                        loadingText="Deleting…"
                    />
                </form>}
            </div>
        );
    }
}