import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import FormGroup from "react-bootstrap/es/FormGroup";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import FormControl from "react-bootstrap/es/FormControl";
import config from "../config";
//import { s3Upload } from "../libs/awsLib";
import "./SnackPacks.css";
import {s3Upload} from "../libs/awsLib";

export default class SnackPacks extends Component {
    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            isLoading: null,
            isDeleting: null,
            snackpack: null,
            content: "",
            attachmentURL: null
        };
    }

    async componentDidMount() {
        try {
            let attachmentURL;
            const snackpack = await this.getSnackPack();
            const { content, attachment } = snackpack;

            if (attachment) {
                attachmentURL = await Storage.vault.get(attachment);
            }

            this.setState({
                snackpack,
                content,
                attachmentURL
            });
        } catch (e) {
            alert(e);
        }
    }

    getSnackPack() {
        return API.get("snackpacks", `/snackpacks/${this.props.match.params.id}`);
    }

    validateForm() {
        return this.state.content.length > 0;
    }

    formatFilename(str) {
        return str.replace(/^\w+-/, "");
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleFileChange = event => {
        this.file = event.target.files[0];
    }

    saveSnackPack(snackpack) {
        return API.put("snackpacks", `/snackpacks/${this.props.match.params.id}`, {
            body: snackpack
        });
    }

    handleSubmit = async event => {
        let attachment;

        event.preventDefault();

        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
            return;
        }

        this.setState({ isLoading: true });

        try {
            if (this.file) {
                attachment = await s3Upload(this.file);
            }

            await this.saveSnackPack({
                content: this.state.content,
                attachment: attachment || this.state.snackpack.attachment
            });
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    deleteSnackPack() {
        return API.del("snackpacks", `/snackpacks/${this.props.match.params.id}`);
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
            <div className="Notes">
                {this.state.snackpack &&
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.content}
                            componentClass="textarea"
                        />
                    </FormGroup>
                    {this.state.snackpack.attachment &&
                    <FormGroup>
                        <ControlLabel>Attachment</ControlLabel>
                        <FormControl.Static>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={this.state.attachmentURL}
                            >
                                {this.formatFilename(this.state.snackpack.attachment)}
                            </a>
                        </FormControl.Static>
                    </FormGroup>}
                    <FormGroup controlId="file">
                        {!this.state.snackpack.attachment &&
                        <ControlLabel>Attachment</ControlLabel>}
                        <FormControl onChange={this.handleFileChange} type="file" />
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