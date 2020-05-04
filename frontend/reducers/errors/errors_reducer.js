import { combineReducers } from 'redux'
import userErrorsReducer from "./users/user_errors_reducer"
import sessionErrorsReducer from "./session/session_errors_reducer"
import songErrorsReducer from './songs/song_errors_reducer'

export default combineReducers({
    user: userErrorsReducer,
    session: sessionErrorsReducer,
    song: songErrorsReducer, 
})
