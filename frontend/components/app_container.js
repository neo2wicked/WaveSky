import {
    connect
} from 'react-redux'

import App from "./app"
const mapSTP = (state) => ({
    // username: state.session.currentUser.username
})



export default connect(mapSTP, null)(App)