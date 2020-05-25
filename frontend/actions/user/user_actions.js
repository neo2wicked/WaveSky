import * as UsersAPIUtil from '../../utils/users_api_util'
import * as FollowersAPIUtil from "../../utils/followers_api_util"

export const RECEIVE_USER = "RECEIVE_USER"
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS"
export const CLEAR_USER_ERRORS = "CLEAR_USER_ERRORS"
export const CLEAR_USER = "CLEAR_USER"
//action

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})
export const receiveUserErrors = (errors) => ({
    type: RECEIVE_USER_ERRORS,
    errors
})

export const clearUserErrors = () => ({
    type: CLEAR_USER_ERRORS
})

export const clearUser = () => ({
    type: CLEAR_USER
})

//thunk

export const fetchUser = (username) => dispatch => (
    UsersAPIUtil.fetchUser(username)
        .then((user) => dispatch(receiveUser(user)))
    //errors
)

export const updateUser = (info) => dispatch => (
    UsersAPIUtil.updateUser(info)
        .then(() => dispatch(receiveUser(info.user)))
        .fail((errors) => dispatch(receiveUserErrors(errors.responseJSON)))
)

export const createDeleteFollower = ({user, follower}) => dispatch => (
    FollowersAPIUtil.createDeleteFollower(follower)
        .then(() => dispatch(receiveUser(user)))
)