import { connect } from 'react-redux'
//fetching user with ajax to check if he is in our db
import { fetchUserByUsername } from "../../actions/session/session_actions"
import FirstForm from './first_form'

const mapSTP = state => ({
    
})

const mapDTP = dispatch => ({
    fetchUserByUsername: (user) => dispatch(fetchUserByUsername(user))
})

export default connect(mapSTP, mapDTP)(FirstForm)