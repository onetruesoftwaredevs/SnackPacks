import React, { Component } from "react";
import LoaderButton from "../components/LoaderButton";
import FormGroup from "react-bootstrap/es/FormGroup";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import FormControl from "react-bootstrap/es/FormControl";
import "./stylesheets/Drivers.css";

export default class SnackPacks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: parseInt((window.location.pathname).substring(9))-1,
            isLoading: null,
            isDeleting: null,
            driver: [],
            id: 0,
            name: "",
            phoneNum: "",
            carModel: "",
            carMake: ""
        };
    }

    async componentDidMount() {
        try {
            return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers/?command=list")
                .then(response => response.json())
                .then(responseJson => this.setState({
                    driver: responseJson[this.state.number]
                }))
                .then(() => this.setState({
                    id: this.state.driver._id,
                    name: this.state.driver._name,
                    phoneNum: this.state.driver._phone,
                    carModel: this.state.driver._carmodel,
                    carMake: this.state.driver._carmake
                }))
                .then(() => console.log(this.state.driver))
                .then(() => this.setState({isLoading: false}));
        } catch (e) {
            alert(e);
        }
    }

    validateForm() {
        if(this.state.name && this.state.carMake && this.state.carModel && this.state.phoneNum) {
            return this.state.name.length > 0 && this.state.carMake.length > 0 && this.state.carModel.length > 0
                && this.state.phoneNum.length > 0;
        }else{
            return false;
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    saveDriver() {
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/?command=edit&id=" + (this.state.id);
        let data = {
            name:(this.state.driverName === this.state.driver._name?null:this.state.driverName),
            phone:(this.state.phoneNum === this.state.driver._phone?null:this.state.phoneNum),
            carmodel:(this.state.carModel === this.state.driver._carmodel?null:this.state.carModel),
            carmake:(this.state.carMake === this.state.driver._carmake?null:this.state.carMake)
        };
        console.log(data);
        return fetch(url, {
            method: "PATCH",
            body: JSON.stringify(data)
        })
        .then(response => response.json());
    }

    handleSubmit = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to modify this driver?"
        );

        if (!confirmed) {
            return;
        }

        this.setState({ isLoading: true });

        try {
            await this.saveDriver();
            this.props.history.push("/drivers");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    deleteDriver() {
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers/?command=delete&id=" + (this.state.id);
        return fetch(url, {
            method: "GET"
        })
            .then(response => response.json());
    }

    handleDelete = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this Driver?"
        );

        if (!confirmed) {
            return;
        }

        this.setState({ isDeleting: true });

        try {
            await this.deleteDriver();
            this.props.history.push("/drivers");
        } catch (e) {
            alert(e);
            this.setState({ isDeleting: false });
        }
    }

    render() {
        return (
            <div className="Drivers">
                <h3>{"Driver #" + (this.state.number+1) + ":"}</h3>
                {this.state.driver &&
                <form onSubmit={this.handleSubmit} className="form-group">
                    <FormGroup controlId="name">
                        <ControlLabel>Name: </ControlLabel>
                        <FormControl
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </FormGroup>
                    <FormGroup controlId="phoneNum">
                        <ControlLabel>Phone number: </ControlLabel>
                        <FormControl
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.phoneNum}
                        />
                    </FormGroup>
                    <FormGroup controlId="carModel">
                        <ControlLabel>Car Model: </ControlLabel>
                        <FormControl
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.carModel}
                        />
                    </FormGroup>
                    <FormGroup controlId="carMake">
                        <ControlLabel>Car Make: </ControlLabel>
                        <FormControl
                            type="text"
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