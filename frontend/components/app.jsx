import React from 'react';
import { Route, Switch} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util'
import IndexContainer from "./index/index_container"
import HomeContainer from "./home/home_container"
import SongFormContainer from "./song_form/song_form_container"
import NavBarContainer from "./nav_bar/nav_bar_container"
import Player from "../components/player/player_container"
import SongShowPageContainer from "./home/song_show_page/song_show_page_container"
import ExploreContainer from './explore/explore_container';

//test

export default () => (
    <div className="app-container">
        {/* <SongItem/> */}
        {/* <Route exact path="/" component={FirstForm} /> */}
        <ProtectedRoute path="/" component={NavBarContainer}></ProtectedRoute>
        <AuthRoute exact path="/" component={IndexContainer}></AuthRoute>
        <Switch>
            <ProtectedRoute exact path={'/explore'} component={ExploreContainer}></ProtectedRoute>
            <ProtectedRoute exact path={'/upload'} component={SongFormContainer}></ProtectedRoute>
            <ProtectedRoute exact path={`/:username/`} component={HomeContainer} ></ProtectedRoute> 
            <ProtectedRoute exact path={`/:username/:songId`} component={SongShowPageContainer} ></ProtectedRoute> 
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
