import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util'
import Index from "./index/index"
import Home from "./home/home"

export default (props) => (
    <div>
        {/* {console.log(props.location.pathname)} */}
        {/* <Route exact path="/" component={FirstForm} /> */}
        <AuthRoute path="/" component={Index}></AuthRoute>
        <ProtectedRoute path={`/:username/`} component={Home} ></ProtectedRoute> 
        {/* <Route path="/" component={Index} />  */}
        {/* <ProtectedRoute exact path="/" component={Index} ></ProtectedRoute>  */}
        {/* <Route path="/" component={NavBarContainer}/> */}
        {/* <AuthRoute path="/signup" component={SignupContainer} />
        <AuthRoute path="/login" component={LoginContainer} />
        <ProtectedRoute path="/chirps" component={ChirpIndexContainer} /> */}
    </div>
);
