import * as SessionAPIUtil from "../../utils/session_api_util"

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER"
export const LOGOUT_CURRENT_USER = "REMOVE_CURRENT_USER"
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS"
//errors need to be filled in


//action

export const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
})

export const logoutCurrentUser = user => ({
    type: LOGOUT_CURRENT_USER,
})

export const receiveErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
})

 
//thunk
export const signup = user => dispatch => (
    SessionAPIUtil.signup(user)
        .then((user) => dispatch(receiveCurrentUser(user)))
        .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
)
export const login = user => dispatch => (
    SessionAPIUtil.login(user)
        .then((user) => dispatch(receiveCurrentUser(user)))
        .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
)
export const logout = () => dispatch => (
    SessionAPIUtil.logout()
        .then(() => dispatch(logoutCurrentUser()))
)

export const fetchUserByUsername = (user) => dispatch => (
    SessionAPIUtil.fetchUserByUsername(user)
        .then(() => true)
)