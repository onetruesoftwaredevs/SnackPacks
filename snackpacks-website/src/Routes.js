import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import NewSnackPack from "./containers/NewSnackPack";
import SnackPacks from "./containers/SnackPacks";

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <AppliedRoute path="/snackpack/new" exact component={NewSnackPack} props={childProps} />
        <AppliedRoute path="/snackpack/:id" exact component={SnackPacks} props={childProps} />
        <Route component={NotFound} />
    </Switch>;