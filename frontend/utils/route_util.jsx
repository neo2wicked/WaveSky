import React from 'react'
import { connect } from 'react-redux'
import {Redirect, Route, withRouter} from 'react-router-dom'

const mapSTP = (state) => ({
    loggedIn: Boolean(state.session.currentUser),
    user: state.session.currentUser,
}) 


const Auth = ({ loggedIn, path, component: Component, user}) => (
    <Route
        exact path={path}
        render={props => (
            loggedIn ? <Redirect to={`/${user.username}`} /> : <Component {...props}/>
        )}
    />
)
const Protected = ({ loggedIn , path, component: Component}) => (
    <Route
        exact path={path}
        render={props => (
            loggedIn ? <Component {...props} /> : <Redirect to={'/'} />
        )}
    />
)


export const AuthRoute = withRouter(connect(mapSTP)(Auth))
export const ProtectedRoute = withRouter(connect(mapSTP)(Protected))