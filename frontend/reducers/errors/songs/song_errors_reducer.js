import {
    RECEIVE_SONG,
    RECEIVE_SONG_ERRORS,
    CLEAR_SONG_ERRORS
} from "../../../actions/songs/songs_actions"


const songErrorsReducer = (state = [], action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_SONG_ERRORS:
            return action.errors
        case RECEIVE_SONG:
            return [];
        case CLEAR_SONG_ERRORS:
            return [];
        default:
            return state;
    }
}

export default songErrorsReducer;