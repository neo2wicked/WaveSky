import { RECEIVE_USER } from "../../../actions/user/user_actions"
/* NEEDS ATTENTION */

const userReducers = (state = {}, action) => {
    Object.freeze(state)
    
    let nextState = Object.assign({}, state)

    switch (action.type) {
        case RECEIVE_USER: 
            nextState = action.user
            return nextState;
        default:
            return state;
    }

}

export default userReducers;