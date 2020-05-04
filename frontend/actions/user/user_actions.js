import * as UsersAPIUtil from '../../utils/users_api_util'

export const RECEIVE_USER = "RECEIVE_USER"
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS"
//action

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})
export const receiveUserErrors = (errors) => ({
    type: RECEIVE_USER_ERRORS,
    errors
})

//thunk

export const fetchUser = (username) => dispatch => (
    UsersAPIUtil.fetchUser(username)
        .then( (user) => dispatch(receiveUser(user)))
//errors
)

export const updateUser = (info) => dispatch => (
    UsersAPIUtil.updateUser(info)
        .then(()=>dispatch(receiveUser(info.user)))
        .fail((errors)=>dispatch(receiveUserErrors(errors.responseJSON)))
)
