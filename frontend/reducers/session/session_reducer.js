import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER, RECEIVE_CURRENT_SONG} from "../../actions/session/session_actions"

const _nullSession  = {
    currentUser: null
}

const sessionReducer = ( state = _nullSession , action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            const currentUser = action.user
            return Object.assign( {}, state, { currentUser })
        case RECEIVE_CURRENT_SONG:
            const currentSong = action.song
            return Object.assign({}, state, {currentSong} )
        case LOGOUT_CURRENT_USER:
            return _nullSession ;
        default:
            return state;
    }
}

export default sessionReducer;