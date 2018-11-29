import React, { Component } from "react";
import LoaderButton from "../components/LoaderButton";
import FormGroup from "react-bootstrap/es/FormGroup";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import FormControl from "react-bootstrap/es/FormControl";
import PageHeader from "react-bootstrap/es/PageHeader";
import "./stylesheets/BlackListUsers.css";

export default class BlackListUsers extends Component {
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
            //TODO: replace this fetch with what actually fetches the blacklisted users (sets blacklistedUser to a certain number from that list)
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

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    deleteBLUser() { // This is the method that is used to remove a user from the blacklist (re-enable them)
        //TODO: make this function such that it re-enables the user whose info is in this.state.<name/phoneNum/address>
    }

    handleDelete = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to remove this user from the blacklist?"
        );

        if (!confirmed) {
            return;
        }

        this.setState({ isDeleting: true });

        try {
            await this.deleteBLUser();
            this.props.history.push("/blacklist");
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
                <form onSubmit={this.handleDelete}>
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