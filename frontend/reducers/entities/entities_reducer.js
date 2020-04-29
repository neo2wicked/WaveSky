//this is entitites reducer
import { combineReducers } from 'redux'
import users from "./users/users_reducer.js"
import songs from "./songs/songs_reducer.js"

export default combineReducers({
    users,
    songs
})
