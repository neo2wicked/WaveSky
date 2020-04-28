import {connect} from 'react-redux'
import React from 'react'
import { signup } from '../../actions/session/session_actions'
import SessionForm from "./session_form"

const mapSTP = (state,ownProps) => ({
    errors: state.errors.session,
    formType: "Sign up",
    username: ownProps.username

})
const mapDTP = dispatch => ({
    action: (user) => dispatch(signup(user))
})


export default connect(mapSTP, mapDTP)(SessionForm)