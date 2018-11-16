import React, { Component } from "react";
import {ListGroup, ListGroupItem, PageHeader} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./stylesheets/RefundRequestList.css";

export default class DriverList extends Component {
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

        return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin/drivers/?command=list")
            .then(response => response.json())
            .then(responseJson => this.setState({
                refundRequests: responseJson
            }))
            .then(() => console.log(this.state.refundRequests))
            .then(() => this.setState({isLoading: false}));
    }

    renderRefundRequests() {
        return [{}].concat(this.state.refundRequests).map(
            (refundRequest, i) =>
                i !== 0
                    ? <ListGroup>
                        <LinkContainer
                            key={i}
                            to={`/refreq/${i}`}
                        >
                            <ListGroupItem header={"Refund Request #"+i+":"}>{}</ListGroupItem>
                        </LinkContainer>
                        <ListGroupItem header="Reason for Refund Request:">
                            {(refundRequest._status === "0")?"Damaged":"Undelivered"}
                        </ListGroupItem>
                        <ListGroupItem header="Cost of Refund:">
                            {"$"+refundRequest._rating}
                        </ListGroupItem>
                        <ListGroupItem header="Refund Requesting User's Information:">
                            {"Name: "+refundRequest._name}
                            <br></br>
                            {"Phone Number: "+refundRequest._phone}
                            <br></br>
                            {"Address: "+refundRequest._carmake}
                        </ListGroupItem>
                        <ListGroupItem header="SnackPacks being Refunded:">
                            {refundRequest._reviews}
                        </ListGroupItem>
                        <br></br>
                    </ListGroup>
                    :
                    <></>
        );
    }

    render() {
        return (
            <div className="RefundRequests">
                <PageHeader>Refund Requests:</PageHeader>
                {this.renderRefundRequests()}
            </div>
        );
    }
}