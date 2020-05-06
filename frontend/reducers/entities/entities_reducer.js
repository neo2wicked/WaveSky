//this is entitites reducer
import { combineReducers } from 'redux'
import userReducer from "./user/user_reducer.js"
import songsReducer from "./songs/songs_reducer.js"
import commentsReducers from './comments/comments_reducer.js'

export default combineReducers({
    user: userReducer,
    songs: songsReducer,
    comments: commentsReducers,
})
