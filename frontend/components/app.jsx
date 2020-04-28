import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util'
import Home from "./home/home"
import FirstForm from "./session/first_form_container"

export default () => (
    <div>
        
        <Route exact path="/" component={FirstForm} />
        {/* <AuthRoute path="/signup" component={SignupContainer} />
        <AuthRoute path="/login" component={LoginContainer} />
        <ProtectedRoute path="/chirps" component={ChirpIndexContainer} /> */}
    </div>
);
