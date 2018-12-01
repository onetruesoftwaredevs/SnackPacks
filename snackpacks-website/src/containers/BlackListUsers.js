import React, { Component } from "react";
import LoaderButton from "../components/LoaderButton";
import PageHeader from "react-bootstrap/es/PageHeader";
import "./stylesheets/BlackListUsers.css";

export default class BlackListUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: parseInt((window.location.pathname).substring(11))-1,
            isLoading: null,
            isDeleting: null,
            _id: 0,
            _reason:"none",
            _status:0,
        };
    }

    async componentDidMount() {
        let url="https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/blacklist?command=list"
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({isLoading: false});
                this.setState({_id:responseJson[this.state.number]._user_id});
                this.setState({_reason:responseJson[this.state.number]._reason});
                this.setState({_status:responseJson[this.state.number]._status});
            });
    }

    handleChange = event => {
        console.log("id: "+event.target.id+" value: "+event.target.value);
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    deleteBLUser() { // This is the method that is used to remove a user from the blacklist (re-enable them)
        //TODO: make this function such that it re-enables the user whose info is in this.state.<name/phoneNum/address>
        //Disable
        /*var params = {
              UserPoolId: 'us-east-2_uJ9lx0oC2',
              Username: 'Test'
        };
        AWS.cognitoidentityserviceprovider.adminDisableUser(params, function(err, data) {
              if (err) console.log(err, err.stack); // an error occurred
              else     console.log(data);           // successful response
        });*/

        //Enable
/*        var params = {
              UserPoolId: 'us-east-2_uJ9lx0oC2',
              Username: 'Test'
        };
        AWS.cognitoidentityserviceprovider.adminEnableUser(params, function(err, data) {
              if (err) console.log(err, err.stack); // an error occurred
              else     console.log(data);           // successful response
        });*/
        let url=`https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/blacklist?command=removeById&id=${this.state._id}`
        fetch(url)
            .then(response => console.log(response));
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
                <form onSubmit={this.handleDelete}>
                    <div className="blacklisted">
                        <table align="center">
                            <tbody>
                                <tr>
                                    <td>
                                        <h2>User ID&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                                    </td>
                                    <td>
                                        <h2>{this.state._id}</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h2>Reason&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                                    </td>
                                    <td>
                                        <h2>{this.state._reason}</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h2>Status&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                                    </td>
                                    <td>
                                        <h2>{this.state._status}</h2>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
                </form>
            </div>
        );
    }
}
