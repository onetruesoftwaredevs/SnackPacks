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
            newName: "",
            phoneNum: "",
            addr: ""
        };
    }

    validateForm() {
        if(this.state.newName && this.state.addr && this.state.phoneNum) {
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
            this.props.history.push("/blacklist");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    addNewDriver() {
        let url = "";//https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers/?command=add";
        let data = {
            name:this.state.newName,
            phone:this.state.phoneNum,
            addr:this.state.addr
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
            <div className="NewBlackListedUser">
                <PageHeader>New Blacklisted User:</PageHeader>
                <br></br>
                <form onSubmit={this.handleSubmit}>
                    <div className="blacklisted">
                        <FormGroup controlId="newName">
                            <ControlLabel>Blacklisted user's name: </ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter user's name"
                                onChange={this.handleChange}
                                value={this.state.driverName}
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
                        text="Create"
                        loadingText="Creating…"
                    />
                </form>
            </div>
        );
    }
}