import {
    connect
} from 'react-redux'
import Home from "./home"
import {
    updateUser,
    createDeleteFollower,
    clearUserErrors
} from "../../actions/user/user_actions"
const mapSTP = state => ({
    songs: Object.values(state.entities.songs),
    user: state.entities.user,
    currentUser: state.session.currentUser,
    imageErrors: state.errors.user
})

const mapDTP = dispatch => ({
    updateUser: (user) => dispatch(updateUser(user)),
    createDeleteFollower: (payload) => dispatch(createDeleteFollower(payload)),
    clearUserErrors: () => dispatch(clearUserErrors())
    
   
})

export default connect(mapSTP, mapDTP)(Home)