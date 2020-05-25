import {
    connect
} from 'react-redux'
//fetching user with ajax to check if he is in our db
import {
    fetchUserByUsername,
    login
} from "../../actions/session/session_actions"

import FirstForm from './first_form'

const mapDTP = dispatch => ({
    fetchUserByUsername: (user) => dispatch(fetchUserByUsername(user)),
    login: (user) => dispatch(login(user))
})

export default connect(null, mapDTP)(FirstForm)