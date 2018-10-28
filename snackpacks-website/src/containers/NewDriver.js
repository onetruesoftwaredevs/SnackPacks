import React, { Component } from "react";
import { FormGroup, FormControl} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewDriver.css";
import ControlLabel from "react-bootstrap/es/ControlLabel";

export default class NewDriver extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            driverName: "",
            phoneNumber: "",
            status: ""
        };
    }

    validateForm() {
        if(this.state.driverName && this.state.phoneNumber) {
            return true;
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
            await this.addNewDriver();
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    addNewDriver() {

    }

    render() {
        return (
            <div className="NewDriver">
                <h3>New SnackPack:</h3>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="driverName">
                        <ControlLabel>New Driver's name: </ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter driver's name"
                            onChange={this.handleChange}
                            value={this.state.driverName}
                        />
                    </FormGroup>
                    <FormGroup controlId="contents">
                        <ControlLabel>New Driver's phone number: </ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter driver's phone number"
                            onChange={this.handleChange}
                            value={this.state.phoneNumber}
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