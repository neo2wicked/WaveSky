import React from 'react'
import { connect } from 'react-redux'
import {Redirect, Route, withRouter} from 'react-router-dom'

const mapSTP = (state) => ({
    loggedIn: Boolean(state.session.currentUser),
    user: state.session.currentUser,
}) 


const Auth = ({ loggedIn, path, exact, component: Component, user}) => (
    <Route
        path={path}
        exact={exact}
        render={props => (
            loggedIn ? <Redirect to={`/${user.username}`} /> : <Component {...props}/>
        )}
    />
)
const Protected = ({ loggedIn, path, exact, component: Component}) => (
    <Route
        path={path}
        exact={exact}
        render={props => (
            loggedIn ? <Component {...props} /> : <Redirect to={'/'} />
        )}
    />
)


export const AuthRoute = withRouter(connect(mapSTP)(Auth))
export const ProtectedRoute = withRouter(connect(mapSTP)(Protected))