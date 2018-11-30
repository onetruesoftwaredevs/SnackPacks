import React, { Component } from "react";
import {ListGroup, ListGroupItem, PageHeader} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./stylesheets/RefundRequestList.css";

export default class RefundRequestList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            refundRequests: []
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }
        let url="https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/refund?command=list"
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({refundRequests: responseJson});
                console.log(this.state.refundRequests);
                this.setState({isLoading: false});
            });
    }

    renderThis(status){
        if(status === "3"){ return true; }
        else if(status === "4"){ return true; }
        else if(status === "5"){ return true; }
        else{ return false; }
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

    renderRefundRequests() {
        // {
        //      "_orderID": 0,
        //      "_userID": 15,
        //      "_reason": "Not delivered",
        //      "_amount": 5,
        //      "_status": 0
        // },
        if(this.state.refundRequests.length>0) {
            return [{}].concat(this.state.refundRequests).map(
                (refundRequest, i) =>{
                    if(i!==0){
                        return(
                            <ListGroup key={i}>
                                <LinkContainer
                                    key={i}
                                    to={`/refreq/${i}`}
                                    className="links"
                                >
                                    <ListGroupItem className="links"><h3>{"Refund Request #"+i+":"}</h3></ListGroupItem>
                                </LinkContainer>
                                <ListGroupItem className="all" header="Order ID:">
                                    {refundRequest._orderID}
                                </ListGroupItem>
                                <ListGroupItem className="all" header="User ID:">
                                    {refundRequest._userID}
                                </ListGroupItem>
                                <ListGroupItem className="all" header="Reason:">
                                    {refundRequest._reason}
                                </ListGroupItem>
                                <ListGroupItem className="all" header="Amount:">
                                    {refundRequest._amount}
                                </ListGroupItem>
                                <ListGroupItem className="all" header="Status:">
                                    {this.renderReason(refundRequest._status)}
                                </ListGroupItem>
                            </ListGroup>
                        );
                    }else{
                        return(
                            <div key={i}>
                            </div>
                        );
                    }
                }
            );
        }else{
            return (
                <div>
                    <h3>No Pending Refund Requests</h3>
                </div>
            );
        }
        /*for(let j=0; j<this.state.refundRequests.length; j++) {
            if (this.renderThis(this.state.refundRequests[j]._status)) {
                return [{}].concat(this.state.refundRequests).map(
                    (refundRequest, i) =>
                        (i !== 0 && this.renderThis(refundRequest._status))
                            ? <div className="listed">
                                <LinkContainer
                                    key={i}
                                    to={`/refreq/${i}`}
                                    className="links"
                                >
                                    <ListGroupItem className="links"><h3>{"Refund Request #" + i + ":"}</h3></ListGroupItem>
                                </LinkContainer>
                                <ListGroup>
                                    <div className="left">
                                        <ListGroupItem header="Reason:">
                                            {this.renderReason(refundRequest._status)}
                                        </ListGroupItem>
                                        <ListGroupItem header="Cost:">
                                            {"$" + refundRequest._total}
                                        </ListGroupItem>
                                    </div>
                                    <div className="right">
                                        <ListGroupItem header="Name:">
                                            {refundRequest._recipient}
                                        </ListGroupItem>
                                        <ListGroupItem header="Address: ">
                                            {refundRequest._address}
                                        </ListGroupItem>
                                    </div>
                                </ListGroup>
                            </div>
                            :
                            <></>
                );
            }
        }*/
    }

    render() {
        return (
            <div className="RefundRequests">
                <PageHeader>Refund Requests:</PageHeader>
                {this.renderRefundRequests()}
                <br></br>
            </div>
        );
    }
}
