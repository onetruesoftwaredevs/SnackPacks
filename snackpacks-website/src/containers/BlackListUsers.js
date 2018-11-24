import React, { Component } from "react";
import LoaderButton from "../components/LoaderButton";
import FormGroup from "react-bootstrap/es/FormGroup";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import FormControl from "react-bootstrap/es/FormControl";
import PageHeader from "react-bootstrap/es/PageHeader";
import "./stylesheets/BlackListUsers.css";

export default class SnackPacks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: parseInt((window.location.pathname).substring(11))-1,
            isLoading: null,
            isDeleting: null,
            blacklistedUser: [],
            id: 0,
            name: "",
            phoneNum: "",
            address: ""
        };
    }

    async componentDidMount() {
        try {
            return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers/?command=list")
                .then(response => response.json())
                .then(responseJson => this.setState({
                    blacklistedUser: responseJson[this.state.number]
                }))
                .then(() => this.setState({
                    id: this.state.blacklistedUser._id,
                    name: this.state.blacklistedUser._name,
                    phoneNum: this.state.blacklistedUser._phone,
                    address: this.state.blacklistedUser._carmodel
                }))
                .then(() => console.log(this.state.blacklistedUser))
                .then(() => this.setState({isLoading: false}));
        } catch (e) {
            alert(e);
        }
    }

    validateForm() {
        if(this.state.name && this.state.address && this.state.phoneNum) {
            return this.state.name.length > 0 && this.state.address.length > 0
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
        let url = "";
        let data = {
            name:(this.state.name === this.state.blacklistedUser._name?null:this.state.name),
            phone:(this.state.phoneNum === this.state.blacklistedUser._phone?null:this.state.phoneNum),
            address:(this.state.address === this.state.blacklistedUser._carmodel?null:this.state.address)
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

    deleteBLUser() {
        let url = "";//"https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers/?command=delete&id=" + (this.state.id);
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
            await this.deleteBLUser();
            this.props.history.push("/drivers");
        } catch (e) {
            alert(e);
            this.setState({ isDeleting: false });
        }
    }

    render() {
        return (
            <div className="BlackListUsers">
                <PageHeader>{"Blacklisted User #" + (this.state.number+1) + ":"}</PageHeader>
                <br></br>
                {this.state.blacklistedUser &&
                <form onSubmit={this.handleSubmit}>
                    <div className="blacklisted">
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
                        <FormGroup controlId="address">
                            <ControlLabel>Address: </ControlLabel>
                            <FormControl
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.address}
                            />
                        </FormGroup>
                    </div>
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