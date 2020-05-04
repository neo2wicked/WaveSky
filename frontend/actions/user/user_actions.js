import * as UsersAPIUtil from '../../utils/users_api_util'

export const RECEIVE_USER = "RECEIVE_USER"
//action

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

//thunk

export const fetchUser = (username) => dispatch => (
    UsersAPIUtil.fetchUser(username)
        .then( (user) => dispatch(receiveUser(user)))
//errors
)

export const updateUser = (info) => dispatch => (
    UsersAPIUtil.updateUser(info)
)
