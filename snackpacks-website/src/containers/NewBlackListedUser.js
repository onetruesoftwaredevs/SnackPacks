import React, { Component } from "react";
import { PageHeader, FormGroup, FormControl} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./stylesheets/NewBlackListedUser.css";
import ControlLabel from "react-bootstrap/es/ControlLabel";

export default class NewBlackListedUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            name: "",
            phoneNum: "",
            addr: ""
        };
    }

    validateForm() {
        if(this.state.name && this.state.addr && this.state.phoneNum) {
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
            await this.addNewBLUser();
            this.props.history.push("/blacklist");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    addNewBLUser() { // This is the method that is used to add a user to the blacklist (disable them)
        //TODO: make this function such that it disables the user whose info is in this.state.<name/phoneNum/addr>
    }

    render() {
        return (
            <div className="NewBlackListedUser">
                <PageHeader>New Blacklisted User:</PageHeader>
                <br></br>
                <form onSubmit={this.handleSubmit}>
                    <div className="blacklisted">
                        <FormGroup controlId="name">
                            <ControlLabel>Blacklisted user's name: </ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter user's name"
                                onChange={this.handleChange}
                                value={this.state.name}
                            />
                        </FormGroup>
                        <FormGroup controlId="phoneNum">
                            <ControlLabel>Blacklisted user's phone number: </ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter user's phone number"
                                onChange={this.handleChange}
                                value={this.state.phoneNum}
                            />
                        </FormGroup>
                        <FormGroup controlId="addr">
                            <ControlLabel>Blacklisted user's address: </ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter user's address"
                                onChange={this.handleChange}
                                value={this.state.carModel}
                            />
                        </FormGroup>
                    </div>
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Add to Blacklist"
                        loadingText="Adding…"
                    />
                </form>
            </div>
        );
    }
}