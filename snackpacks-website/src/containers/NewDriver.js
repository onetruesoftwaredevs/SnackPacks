import React, { Component } from "react";
import { PageHeader, FormGroup, FormControl} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./stylesheets/NewDriver.css";
import ControlLabel from "react-bootstrap/es/ControlLabel";

export default class NewDriver extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            driverName: "",
            phoneNum: "",
            carMake: "",
            carModel: ""
        };
    }

    validateForm() {
        if(this.state.driverName && this.state.carMake && this.state.carModel && this.state.phoneNum) {
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
            this.props.history.push("/drivers");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    addNewDriver() {
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers/?command=add";
        let data = {
            name:this.state.driverName,
            phone:this.state.phoneNum,
            carmodel:this.state.carModel,
            carmake:this.state.carMake
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
            <div className="NewDriver">
                <PageHeader>New Driver:</PageHeader>
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
                    <FormGroup controlId="phoneNum">
                        <ControlLabel>New Driver's phone number: </ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter driver's phone number"
                            onChange={this.handleChange}
                            value={this.state.phoneNum}
                        />
                    </FormGroup>
                    <FormGroup controlId="carModel">
                        <ControlLabel>New Driver's car model: </ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter driver's car model"
                            onChange={this.handleChange}
                            value={this.state.carModel}
                        />
                    </FormGroup>
                    <FormGroup controlId="carMake">
                        <ControlLabel>New Driver's car make: </ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter driver's car make"
                            onChange={this.handleChange}
                            value={this.state.carMake}
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