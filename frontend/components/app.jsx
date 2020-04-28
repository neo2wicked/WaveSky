import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util'
import Home from "./home/home"
import FirstForm from "./session/first_form_container"
import NavBarContainer from "./nav_bar/nav_bar_container"

export default () => (
    <div>
        {/* <Route exact path="/" component={FirstForm} /> */}
        <Route exact path="/" component={Home} />
        {/* <Route path="/" component={NavBarContainer}/> */}
        {/* <AuthRoute path="/signup" component={SignupContainer} />
        <AuthRoute path="/login" component={LoginContainer} />
        <ProtectedRoute path="/chirps" component={ChirpIndexContainer} /> */}
    </div>
);
