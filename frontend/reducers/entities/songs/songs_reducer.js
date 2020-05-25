import {
    RECEIVE_SONGS,
    RECEIVE_SONG,
    REMOVE_SONG, 
    REMOVE_SONGS
} from "../../../actions/songs/songs_actions"

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
        case REMOVE_SONG:
            delete nextState[action.songId]
            return nextState;
        case REMOVE_SONGS:
            return {};
        default:
            return state;
    }

}

export default songsReducers;