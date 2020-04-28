import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util'
import Index from "./index/index"
import FirstForm from "./session/first_form_container"
import NavBarContainer from "./nav_bar/nav_bar_container"

export default (props) => (
    <div>
        {/* <Route exact path="/" component={FirstForm} /> */}
        <AuthRoute exact path="/" component={Index} username={props.username}></AuthRoute>
        <ProtectedRoute exact path={`/${props.username}`} component={Index} ></ProtectedRoute> 
        {/* <Route path="/" component={Index} />  */}
        {/* <ProtectedRoute exact path="/" component={Index} ></ProtectedRoute>  */}
        {/* <Route path="/" component={NavBarContainer}/> */}
        {/* <AuthRoute path="/signup" component={SignupContainer} />
        <AuthRoute path="/login" component={LoginContainer} />
        <ProtectedRoute path="/chirps" component={ChirpIndexContainer} /> */}
    </div>
);
