import React, { Component } from "react";
import LoaderButton from "../components/LoaderButton";
import "./Drivers.css";
import {ListGroup, ListGroupItem} from "react-bootstrap";

export default class SnackPacks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: parseInt((window.location.pathname).substring(8))-1,
            isApproving: null,
            isDisapproving: null,
            refundRequest: [],
            id: 0,
            name: "",
            phoneNum: "",
            status: 0,
            reviews: ""
        };
    }

    async componentDidMount() {
        try {
            return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers/?command=list")
                .then(response => response.json())
                .then(responseJson => this.setState({
                    refundRequest: responseJson[this.state.number]
                }))
                .then(() => this.setState({
                    id: this.state.refundRequest._id,
                    name: this.state.refundRequest._name,
                    phoneNum: this.state.refundRequest._phone,
                    status: this.state.refundRequest._status,
                    reviews: this.state.refundRequest._reviews
                }))
                .then(() => console.log(this.state.refundRequest))
                .then(() => this.setState({isApproving: false}));
        } catch (e) {
            alert(e);
        }
    }

    validateForm() {
        return true;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    approveRefReq() {
        let url = "";//"https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/?command=edit&id=" + (this.state.id);
        let data = {
            name:(this.state.driverName === this.state.refundRequest._name?null:this.state.driverName),
            phone:(this.state.phoneNum === this.state.refundRequest._phone?null:this.state.phoneNum)
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
            "Are you sure you want to approve this refund request?"
        );

        if (!confirmed) {
            return;
        }

        this.setState({ isApproving: true });

        try {
            await this.approveRefReq();
            this.props.history.push("/refreq");
        } catch (e) {
            alert(e);
            this.setState({ isApproving: false });
        }
    }

    disapproveRefReq() {
        let url = "";//"https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers/?command=delete&id=" + (this.state.id);
        return fetch(url, {
            method: "GET"
        })
            .then(response => response.json());
    }

    handleDelete = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to disapprove this refund request?"
        );

        if (!confirmed) {
            return;
        }

        this.setState({ isDeleting: true });

        try {
            await this.disapproveRefReq();
            this.props.history.push("/refreq");
        } catch (e) {
            alert(e);
            this.setState({ isDisapproving: false });
        }
    }

    render() {
        return (
            <div className="Drivers">
                <ListGroup>
                    <br></br>
                    <h3>{"Refund Request #" + (this.state.number+1) + ":"}</h3>
                    <ListGroupItem header="Name:">
                        {this.state.name}
                    </ListGroupItem>
                    <ListGroupItem header="Status:">
                        {(this.state.status === "0")?"Not busy":"Busy delivering an order"}
                    </ListGroupItem>
                    <ListGroupItem header="Phone Number:">
                        {this.state.phoneNum}
                    </ListGroupItem>
                    <ListGroupItem header="Reviews:">
                        {(this.state.reviews === "")?"No reviews.":(this.state.reviews.split('|')).join(", ")}
                    </ListGroupItem>
                </ListGroup>
                {this.state.refundRequest &&
                <form onSubmit={this.handleSubmit}>
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isApproving}
                        text="Approve"
                        loadingText="Approving…"
                    />
                    <LoaderButton
                        block
                        bsStyle="danger"
                        bsSize="large"
                        isLoading={this.state.isDisapproving}
                        onClick={this.handleDelete}
                        text="Disapprove"
                        loadingText="Disapproving…"
                    />
                </form>}
            </div>
        );
    }
}