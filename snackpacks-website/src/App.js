import React, {Component, Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";
import { Button, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isAuthenticated: true,
        menuIsOpen: false
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    this.userHasAuthenticated(false);
    this.props.history.push("/");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <div className="App">
          <Navbar fluid collapseOnSelect>
              <Navbar.Header>
                  <Button onClick={() => this.setState({ menuIsOpen: !this.state.menuIsOpen })}>
                      Menu
                  </Button>
              </Navbar.Header>
              {this.state.menuIsOpen
                  ? <div>
                  {this.state.isAuthenticated
                          ? <Fragment>
                              <Link to="/">SnackPacks</Link>
                              <LinkContainer to="/snackpack/new">
                                  <NavItem>New Snack Pack</NavItem>
                              </LinkContainer>
                              <LinkContainer to="/drivers">
                                  <NavItem>Driver List</NavItem>
                              </LinkContainer>
                              <LinkContainer to="/drivers/new">
                                  <NavItem>New Driver</NavItem>
                              </LinkContainer>
                              <LinkContainer to="/refreq">
                                  <NavItem>Refund Requests</NavItem>
                              </LinkContainer>
                              <LinkContainer to="/blacklist">
                                  <NavItem>Blacklist</NavItem>
                              </LinkContainer>
                              <LinkContainer to="/users">
                                  <NavItem>List of Users</NavItem>
                              </LinkContainer>
                              <NavItem onClick={this.handleLogout}>Logout</NavItem>
                          </Fragment>
                          : <Fragment>
                              <NavItem>
                                  <Link to="/login">Login</Link>
                              </NavItem>
                          </Fragment>
                      }
                  </div>
                  : <></>
              }
          </Navbar>
          <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);