import {combineReducers} from 'redux'
import entities from "./entities/entities_reducer.js"
const RootReducer = combineReducers({
    entities
})

export default RootReducer;