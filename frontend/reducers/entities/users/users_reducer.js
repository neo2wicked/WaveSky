import { RECEIVE_USER } from "../../../actions/users/users_actions"
/* NEEDS ATTENTION */

const usersReducers = (state = {}, action) => {
    Object.freeze(state)
    
    let nextState = Object.assign({}, state)

    switch (action.type) {
        case RECEIVE_USER: 
            nextState[action.user.id] = action.user
            return nextState;
        default:
            return state;
    }

}

export default usersReducers;