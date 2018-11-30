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
            _orderID: 0,
            _userID: 0,
            _reason: "",
            _amount: 0,
            _status: 0,
        };
    }

    async componentDidMount() {
        // {
        //      "_orderID": 0,
        //      "_userID": 15,
        //      "_reason": "Not delivered",
        //      "_amount": 5,
        //      "_status": 0
        // },
        let url="https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/refund?command=list"
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                //this.setState({refundRequests: responseJson});
                console.log(responseJson);

                this.setState({_orderID:responseJson[this.state.number]._orderID});
                console.log("orderID: "+this.state._orderID);
                this.setState({_userID:responseJson[this.state.number]._userID});
                console.log("userID: "+this.state._userID);
                this.setState({_reason:responseJson[this.state.number]._reason});
                console.log("reason: "+this.state._reason);
                this.setState({_amount:responseJson[this.state.number]._amount});
                console.log("amount: "+this.state._amount);
                this.setState({_status:responseJson[this.state.number]._status});
                console.log("status: "+this.state._status);
                this.setState({isLoading: false});
            });
    }

    validateForm() {
        return true;
    }

    approveRefReq() {
        let url="https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/refund?command=setStatus&status=6&id="+this.state._orderID;
        console.log(url);
        return fetch(url)
            .then(response => console.log(response.json()));
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
    /*
     *         }else if(status === 6){
     *                     return "Refunded"
     *                             }else if(status === 7){
     *                                         return "Not Refunded"
     *                                                 }else{
     */

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
        if(status === 0){
            return "Not Delivered"
        }else if(status === 1){
            return "In Transit"
        }else if(status === 2){
            return "Delivered"
        }else if(status === 3){
            return "Cancelled"
        }else if(status === 4){
            return "Damaged"
        }else if(status === 5){
            return "Lost"
        }else if(status === 6){
            return "Refunded"
        }else if(status === 7){
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
                        <ListGroupItem header="User ID:">
                            {this.state._userID}
                        </ListGroupItem>
                    </div>
                    <div>
                        <ListGroupItem header="Order ID:">
                            {this.state._orderID}
                        </ListGroupItem>
                    </div>
                    <div>
                        <ListGroupItem header="Reason:">
                            {this.renderReason(this.state._status)}
                        </ListGroupItem>
                    </div>
                    <div>
                        <ListGroupItem header="Cost:">
                            {"$"+this.state._amount}
                        </ListGroupItem>
                    </div>
                </div>
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
                </form>
            </div>
        );
    }
}
