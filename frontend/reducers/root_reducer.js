import {combineReducers} from 'redux'
import entities from "./entities/entities_reducer.js"
import session from "./session/session_reducer"
import errors from "./errors/errors_reducer"
const RootReducer = combineReducers({
    entities, 
    session,
    errors
})

export default RootReducer;