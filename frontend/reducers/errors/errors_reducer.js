import { combineReducers } from 'redux'
import users from "./users/users_errors_reducer"
import sessionErrorsReducer from "./session/session_errors_reducer"
import songErrorsReducer from './songs/songs_errors_reducer'

export default combineReducers({
    // users,
    session: sessionErrorsReducer,
    song: songErrorsReducer, 
})
