import { connect } from 'react-redux'
//fetching user with ajax to check if he is in our db
import { fetchUserByUsername } from "../../utils/session_api_util"
import FirstForm from './first_form'

const mapSTP = state => ({
    
})

const mapDTP = dispatch => ({
    fetchUserByUsername: (user) => (fetchUserByUsername(user))
})

export default connect(mapSTP, mapDTP)(FirstForm)