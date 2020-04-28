import * as SessionAPIUtil from "../../utils/session_api_util"

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER"
export const LOGOUT_CURRENT_USER = "REMOVE_CURRENT_USER"
//errors need to be filled in


//action

export const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
})

export const logoutCurrentUser = user => ({
    type: LOGOUT_CURRENT_USER,
})

 
//thunk
export const signup = user => dispatch => (
    SessionAPIUtil.signup(user)
        .then((user) => dispatch(receiveCurrentUser(user)))
        //errors
)
export const login = user => dispatch => (
    SessionAPIUtil.login(user)
        .then((user) => dispatch(receiveCurrentUser(user)))
        //errors
)
export const logout = () => dispatch => (
    SessionAPIUtil.logout()
        .then(() => dispatch(logoutCurrentUser()))
        //errors
)

export const fetchUserByUsername = (user) => dispatch => (
    SessionAPIUtil.fetchUserByUsername(user)
        .then(() => true)
)