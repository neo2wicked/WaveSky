import * as UsersAPIUtil from '../../utils/users_api_util'

export const RECEIVE_USER = "RECEIVE_USER"
//action

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

//thunk

export const fetchUser = (userId) => dispatch => (
    UsersAPIUtil.fetchUser(userId)
        .then( user => dispatch(receiveUser(user)))
//errors
)
