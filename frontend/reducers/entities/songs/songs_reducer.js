import {
    RECEIVE_SONGS, RECEIVE_SONG
} from "../../../actions/songs/songs_actions"
/* NEEDS ATTENTION */

const songsReducers = (state = {}, action) => {
    Object.freeze(state)

    let nextState = Object.assign({}, state)

    switch (action.type) {
        case RECEIVE_SONGS:
            nextState = action.songs
            return nextState;
        case RECEIVE_SONG:
            nextState[action.song.id] = action.song
            return nextState;
        default:
            return state;
    }

}

export default songsReducers;