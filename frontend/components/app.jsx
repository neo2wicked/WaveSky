import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util'
import IndexContainer from "./index/index_container"
import HomeContainer from "./home/home_container"
import SongFormContainer from "./song_form/song_form_container"
import NavBarContainer from "./nav_bar/nav_bar_container"
import Player from "../components/player/player_container"
import SongShowPageContainer from "./home/song_show_page/song_show_page_container"
import ExploreContainer from './explore/explore_container';
import SearchContainer from "./search/search_container"

export default () => (
    <div className="app-container">
        <ProtectedRoute path="/" component={NavBarContainer}></ProtectedRoute>
        <AuthRoute exact path="/" component={IndexContainer}></AuthRoute>
        <Switch>
            <ProtectedRoute exact path={'/explore'} component={ExploreContainer}></ProtectedRoute>
            <ProtectedRoute path={'/search'} component={SearchContainer}></ProtectedRoute>
            <ProtectedRoute exact path={'/upload'} component={SongFormContainer}></ProtectedRoute>
            <ProtectedRoute exact path={`/:username/`} component={HomeContainer} ></ProtectedRoute>
            <ProtectedRoute exact path={`/:username/:songId`} component={SongShowPageContainer} ></ProtectedRoute>
        </Switch>
        <ProtectedRoute path="/" component={Player}></ProtectedRoute>
    </div>
);
