import { connect } from 'react-redux'
import React from 'react'
import {
    login
} from '../../actions/session/session_actions'
import SessionForm from "./session_form"


const mapSTP = state => ({
    //errors
    formType: "Sign up",
    navLink: <Link></Link>

})
const mapDTP = dispatch => ({
    action: (user) => dispatch(login(user))
})


export default connect(mapSTP, mapDTP)(SessionForm)