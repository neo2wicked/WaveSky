import React from 'react';
import { Route, Switch} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util'
import Index from "./index/index"
import HomeContainer from "./home/home_container"
import SongFormContainer from "./song_form/song_form_container"
import NavBarContainer from "./nav_bar/nav_bar_container"
import Player from "../components/player/player_container"

//test

export default (props) => (
    <div className="app-container">
        {/* <SongItem/> */}
        {/* <Route exact path="/" component={FirstForm} /> */}
        <ProtectedRoute path="/" component={NavBarContainer}></ProtectedRoute>
        <AuthRoute exact path="/" component={Index}></AuthRoute>
        <Switch>
            <ProtectedRoute exact path={'/upload'} component={SongFormContainer}></ProtectedRoute>
            <ProtectedRoute exact path={`/:username/`} component={HomeContainer} ></ProtectedRoute> 
        </Switch>
        
        <ProtectedRoute path="/" component={Player}></ProtectedRoute>
        {/* <Route path="/" component={Index} />  */}
        {/* <ProtectedRoute exact path="/" component={Index} ></ProtectedRoute>  */}
        {/* <Route path="/" component={NavBarContainer}/> */}
        {/* <AuthRoute path="/signup" component={SignupContainer} />
        <AuthRoute path="/login" component={LoginContainer} />
        <ProtectedRoute path="/chirps" component={ChirpIndexContainer} /> */}
    </div>
);
