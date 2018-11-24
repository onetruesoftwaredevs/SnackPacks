import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import {Button, Image, Navbar} from "react-bootstrap";
import Routes from "./Routes";
import './App.css';
import NavLink from "react-router-dom/es/NavLink";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isAuthenticated: true,
        menuIsOpen: false,
        ms: 0
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
          <Image src={require('./SnackPacksLogo.jpg')} className="image" thumbnail />
          <Navbar fluid collapseOnSelect>
              <Navbar.Header>
                  <Button onClick={() => this.setState({ menuIsOpen: !this.state.menuIsOpen })}>
                      Menu
                  </Button>
              </Navbar.Header>
              {this.state.menuIsOpen
                  ? <div className="options">
                  {this.state.isAuthenticated
                          ? <Fragment>
                              <NavLink className={this.state.ms===0?"menuSelect":"menu"} to="/" onClick={()=>this.setState({ms: 0})}>
                                  <h3 className={this.state.ms===0?"menuSelect":"menu"}>SnackPacks</h3>
                              </NavLink>
                              <NavLink className={this.state.ms===1?"menuSelect":"menu"} to="/drivers" onClick={()=>this.setState({ms: 1})}>
                                  <h3 className={this.state.ms===1?"menuSelect":"menu"}>Driver List</h3>
                              </NavLink>
                              <NavLink className={this.state.ms===2?"menuSelect":"menu"} to="/refreq" onClick={()=>this.setState({ms: 2})}>
                                  <h3 className={this.state.ms===2?"menuSelect":"menu"}>Refund Requests</h3>
                              </NavLink>
                              <NavLink className={this.state.ms===3?"menuSelect":"menu"} to="/blacklist" onClick={()=>this.setState({ms: 3})}>
                                  <h3 className={this.state.ms===3?"menuSelect":"menu"}>Blacklist</h3>
                              </NavLink>
                              <NavLink className="menu" to="/" onClick={this.handleLogout}><h3>Logout</h3></NavLink>
                          </Fragment>
                          : <Fragment>
                              <NavLink className="menu" to="/login" onClick={()=>this.setState({ms: 0})}><h3>Login</h3></NavLink>
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