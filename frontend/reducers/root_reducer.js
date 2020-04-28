import {combineReducers} from 'redux'
import entities from "./entities/entities_reducer.js"
import session from "./session/session_reducer"
const RootReducer = combineReducers({
    entities, 
    session
})

export default RootReducer;