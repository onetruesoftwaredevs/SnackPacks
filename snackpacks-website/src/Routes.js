import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import NewSnackPack from "./containers/NewSnackPack";
import SnackPacks from "./containers/SnackPacks";
import DriverList from "./containers/DriverList";
import NewDriver from "./containers/NewDriver"
import Drivers from "./containers/Drivers"
import BlackList from "./containers/BlackList"
import BlackListUsers from "./containers/BlackListUsers"
import RefundRequest from "./containers/RefundRequest"
import RefundRequestList from "./containers/RefundRequestList"
import Users from "./containers/Users"
import UserList from "./containers/UserList"

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <AppliedRoute path="/snackpack/new" exact component={NewSnackPack} props={childProps} />
        <AppliedRoute path="/snackpack/:id" exact component={SnackPacks} props={childProps} />
        <AppliedRoute path="/drivers" exact component={DriverList} props={childProps} />
        <AppliedRoute path="/drivers/new" exact component={NewDriver} props={childProps} />
        <AppliedRoute path="/drivers/:id" exact component={Drivers} props={childProps} />
        <AppliedRoute path="/users" exact component={UserList} props={childProps} />
        <AppliedRoute path="/users/:id" exact component={Users} props={childProps} />
        <AppliedRoute path="/blacklist" exact component={BlackList} props={childProps} />
        <AppliedRoute path="/blacklist/:id" exact component={BlackListUsers} props={childProps} />
        <AppliedRoute path="/refreq" exact component={RefundRequestList} props={childProps} />
        <AppliedRoute path="/refreq/:id" exact component={RefundRequest} props={childProps} />
        <Route component={NotFound} />
    </Switch>;