import React, { Component } from "react";
import { FormGroup, FormControl} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./stylesheets/NewSnackPack.css";
import ControlLabel from "react-bootstrap/es/ControlLabel";

export default class NewSnackPack extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            newName: "",
            contents: "",
            allergens: "",
            image: "",
            cost: 0
        };
    }

    validateForm() {
        if(this.state.contents && this.state.newName && this.state.image) {
            return this.state.contents.length > 0 && this.state.newName.length > 0 && this.state.cost > 0;
        }else{
            return false;
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await this.createSnackPack();
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    createSnackPack() {
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/?command=add";
        let data = {
            name:this.state.newName,
            contents:this.state.contents,
            allergens:this.state.allergens,
            image_path:this.state.image,
            reviews:"",
            cost:parseFloat(this.state.cost),
            rating:3
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

    render() {
        return (
            <div className="NewSnackPack">
                <h3>New SnackPack:</h3>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="newName">
                        <ControlLabel>New SnackPack's name: </ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter name"
                            onChange={this.handleChange}
                            value={this.state.newName}
                        />
                    </FormGroup>
                    <FormGroup controlId="contents">
                        <ControlLabel>New SnackPack's contents: </ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Snack,snack,snack..."
                            onChange={this.handleChange}
                            value={this.state.contents}
                        />
                    </FormGroup>
                    <FormGroup controlId="allergens">
                        <ControlLabel>New SnackPack's allergens: </ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Allergen,allergen,allergen..."
                            onChange={this.handleChange}
                            value={this.state.allergens}
                        />
                    </FormGroup>
                    <FormGroup controlId="image">
                        <ControlLabel>New SnackPack's image URL: </ControlLabel>
                        <FormControl
                            type="url"
                            placeholder="Enter url"
                            onChange={this.handleChange}
                            value={this.state.image}
                        />
                    </FormGroup>
                    <FormGroup controlId="cost">
                        <ControlLabel>New SnackPack's cost: </ControlLabel>
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
                        text="Create"
                        loadingText="Creating…"
                    />
                </form>
            </div>
        );
    }
}