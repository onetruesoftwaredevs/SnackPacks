import React, { Component } from "react";
import LoaderButton from "../components/LoaderButton";
import "./stylesheets/RefundRequest.css";
import {ListGroupItem, PageHeader} from "react-bootstrap";

export default class SnackPacks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: parseInt((window.location.pathname).substring(8))-1,
            isLoading: null,
            isDisapproving: null,
            paymentInfo:"",
            id: 0,
            name: "",
            status: 0,
            cost: 0,
            address: ""
        };
    }

    async componentDidMount() {
        try {
            return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers/?command=list")
                .then(response => response.json())
                .then(responseJson => this.setState({
                    refundRequest: responseJson[this.state.number]
                }))
                .then(() => this.setState({
                    id: this.state.refundRequest._id,
                    name: this.state.refundRequest._recipient,
                    status: this.state.refundRequest._status,
                    cost: this.state.refundRequest._total,
                    address: this.state.refundRequest._address,
                    paymentInfo: this.state.refundRequest._paymentInfo,
                }))
                .then(() => this.setState({isLoading: false}));
        } catch (e) {
            alert(e);
        }
    }

    validateForm() {
        return true;
    }

    approveRefReq() {
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers?command=edit&id=" + (this.state.id);
        console.log(url);
        let data = {
            status:"6"
        };
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.json());
    }

    approveRefund() {
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/payment?command=refund";
        let data = {
            transactionID:this.state.paymentInfo,
        };
        console.log(data);
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json=>{
            console.log("RESPONSE JSON");
            console.log(json);
            json=false;
        });
    }

    handleApprove = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to approve this refund request?"
        );

        if (!confirmed) {
            return;
        }

        this.setState({ isLoading: true });

        try {
            await this.approveRefReq();
            if(this.state.paymentInfo!=="cash")await this.approveRefund();
            this.props.history.push("/refreq");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    disapproveRefReq() {
        let url = "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/drivers?command=edit&id=" + (this.state.id);
        console.log(url);
        let data = {
            status:"7"
        };
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
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

    renderReason(status){
        if(status === "0"){
            return "Not Delivered"
        }else if(status === "1"){
            return "In Transit"
        }else if(status === "2"){
            return "Delivered"
        }else if(status === "3"){
            return "Cancelled"
        }else if(status === "4"){
            return "Damaged"
        }else if(status === "5"){
            return "Lost"
        }else if(status === "6"){
            return "Refunded"
        }else if(status === "7"){
            return "Not Refunded"
        }else{
            return "Status Error"
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
                            {this.renderReason(this.state.status)}
                        </ListGroupItem>
                    </div>
                    <div>
                        <ListGroupItem header="Cost:">
                            {"$"+this.state.cost}
                        </ListGroupItem>
                    </div>
                    <div>
                        <ListGroupItem header="Name:">
                            {this.state.name}
                        </ListGroupItem>
                    </div>
                    <div>
                        <ListGroupItem header="Address:">
                            {this.state.address}
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
                        isLoading={this.state.isLoading}
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
