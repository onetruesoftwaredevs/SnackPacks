import React, { Component } from "react";
import { PageHeader, FormGroup, FormControl} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./stylesheets/NewBlackListedUser.css";
import ControlLabel from "react-bootstrap/es/ControlLabel";

export default class NewBlackListedUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            id: "",
            reason: "",
        };
    }

    validateForm() {
        if(this.state.id && this.state.reason) {
            return true;
        }else{
            return false;
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await this.addNewBLUser();
            this.props.history.push("/blacklist");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    addNewBLUser() { // This is the method that is used to add a user to the blacklist (disable them)
        let url=`https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/blacklist?command=addReport&id=${this.state.id}`;
        //console.log("url: "+url+" reason: "+this.state.reason);
        //console.log(JSON.stringify({"reason":this.state.reason}));
        (async () => {
            const rawResponse = await fetch(url, {
                method: 'POST',
                body:JSON.stringify({"reason":this.state.reason}),
            });
            const content = await rawResponse;

            console.log(content);
            //Disable
            /*var params = {
                  UserPoolId: 'us-east-2_uJ9lx0oC2',
                  Username: 'Test'
            };
            AWS.CognitoIdentityServiceProvider.adminDisableUser(params, function(err, data) {
                  if (err) console.log(err, err.stack); // an error occurred
                  else     console.log(data);           // successful response
            });*/
        })();
    }

    render() {
        return (
            <div className="NewBlackListedUser">
                <PageHeader>New Blacklisted User:</PageHeader>
                <br></br>
                <form onSubmit={this.handleSubmit}>
                    <div className="blacklisted">
                        <FormGroup controlId="id">
                            <ControlLabel>Blacklisted user's ID: </ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter user's ID"
                                onChange={this.handleChange}
                                value={this.state.name}
                            />
                        </FormGroup>
                        <FormGroup controlId="reason">
                            <ControlLabel>Reason for blacklisting: </ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter reason"
                                onChange={this.handleChange}
                                value={this.state.reason}
                            />
                        </FormGroup>
                    </div>
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Add to Blacklist"
                        loadingText="Adding…"
                    />
                </form>
            </div>
        );
    }
}
