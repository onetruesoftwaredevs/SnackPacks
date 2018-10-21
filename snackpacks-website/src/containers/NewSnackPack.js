import React, { Component } from "react";
import { FormGroup, FormControl} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewSnackPack.css";
import { API } from "aws-amplify";
import {s3Upload} from "../libs/awsLib";
import config from "../config";

export default class NewSnackPack extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            content: ""
        };
    }

    validateForm() {
        return this.state.content.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
            return;
        }

        this.setState({ isLoading: true });

        try {
            const attachment = this.file
                ? await s3Upload(this.file)
                : null;

            await this.createSnackPack({
                attachment,
                content: this.state.content
            });
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    createSnackPack(snackpack) {
        return API.post("snackpacks", "/snackpacks", {
            body: snackpack
        });
    }

    render() {
        return (
            <div className="NewSnackPack">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.content}
                            componentClass="textarea"
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