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
                    ? <div className="listed">
                        <LinkContainer
                            key={i}
                            to={`/refreq/${i}`}
                            className="links"
                        >
                            <ListGroupItem className="links"><h3>{"Refund Request #"+i+":"}</h3></ListGroupItem>
                        </LinkContainer>
                        <ListGroup>
                            <div className="all">
                                <ListGroupItem header="Name:">
                                    {refundRequest._name}
                                </ListGroupItem>
                                <ListGroupItem header="Reason:">
                                    {(refundRequest._status === "0")?"Damaged":"Undelivered"}
                                </ListGroupItem>
                            </div>
                            <div className="all">
                                <ListGroupItem header="Phone Number: ">
                                    {refundRequest._phone}
                                </ListGroupItem>
                                <ListGroupItem header="Cost:">
                                    {"$"+refundRequest._rating}
                                </ListGroupItem>
                            </div>
                            <div className="all">
                                <ListGroupItem header="Address: ">
                                    {refundRequest._carmake}
                                </ListGroupItem>
                                <ListGroupItem header="SnackPacks:">
                                    {"snackpacks"}
                                </ListGroupItem>
                            </div>
                        </ListGroup>
                    </div>
                    :
                    <></>
        );
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