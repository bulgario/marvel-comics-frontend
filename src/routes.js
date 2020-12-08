import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { ROUTES } from "./consts";
import { isAuthenticated } from "./auth";

//PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import Edit from "./pages/User/edit";
import Favorite from "./pages/User/favorite";
import Comic from "./pages/Comic";

const PrivateRoute = ({ component: Component , ...rest}) => (
  <Route
    {...rest} 
    render={props => 
      isAuthenticated() ? (
        <Component {...props} />
        ) : (
        <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={"/"} component={Login} />
      <Route path={ROUTES.LOGIN} component={Login} />
      <Route path={ROUTES.SIGNUP} component={SignUp} />
      <Route path={ROUTES.COMIC} component={Comic} />
      <PrivateRoute path={ROUTES.HOME} component={Home} />
      <PrivateRoute path={ROUTES.SEARCH} component={Search} />
      <PrivateRoute path={ROUTES.EDIT} component={Edit} />
      <PrivateRoute path={ROUTES.FAVORITE} component={Favorite} />
    </Switch>
  </BrowserRouter>
);

export default Routes;