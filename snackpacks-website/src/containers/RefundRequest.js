import React, { Component } from "react";
import LoaderButton from "../components/LoaderButton";
import "./stylesheets/RefundRequest.css";
import {ListGroupItem, PageHeader} from "react-bootstrap";

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
                    reviews: this.state.refundRequest._carmake
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

    handleApprove = async event => {
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

    handleDisapprove = async event => {
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
            <div className="RefundRequest">
                <PageHeader>{"Refund Request #" + (this.state.number+1) + ":"}</PageHeader>
                <br></br>
                <div className="refreq">
                    <div>
                        <ListGroupItem header="Reason:">
                            {(this.state.status === "0")?"Not busy":"Busy delivering an order"}
                        </ListGroupItem>
                    </div>
                    <div>
                        <ListGroupItem header="Cost:">
                            {this.state.status}
                        </ListGroupItem>
                    </div>
                    <div>
                        <ListGroupItem header="Name:">
                            {this.state.name}
                        </ListGroupItem>
                    </div>
                    <div>
                        <ListGroupItem header="Address:">
                            {this.state.status}
                        </ListGroupItem>
                    </div>
                    <div>
                        <ListGroupItem header="Phone Number:">
                            {this.state.phoneNum}
                        </ListGroupItem>
                    </div>
                    <div>
                        <ListGroupItem header="SnackPacks:">
                            {this.state.reviews}
                        </ListGroupItem>
                    </div>
                </div>
                {this.state.refundRequest &&
                <form onSubmit={this.handleApprove}>
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isApproving}
                        text="Approve"
                        loadingText="Approving…"
                        className="but"
                    />
                    <LoaderButton
                        block
                        bsStyle="danger"
                        bsSize="large"
                        isLoading={this.state.isDisapproving}
                        onClick={this.handleDisapprove}
                        text="Disapprove"
                        loadingText="Disapproving…"
                    />
                </form>}
            </div>
        );
    }
}