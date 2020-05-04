import {
    connect
} from 'react-redux'
import Home from "./home"
import {updateUser} from "../../actions/user/user_actions"
const mapSTP = state => ({
    user: state.entities.user,
    currentUser: state.session.currentUser
})

const mapDTP = dispatch => ({
    updateUser: (user) => dispatch(updateUser(user))
})

export default connect(mapSTP, mapDTP)(Home)