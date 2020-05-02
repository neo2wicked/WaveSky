import {
    connect
} from 'react-redux'
import { withRouter} from "react-router-dom"
import App from "./app"
const mapSTP = (state, ownProps) => ({
    user: state.entities.user
})



export default withRouter(connect(mapSTP, null)(App))