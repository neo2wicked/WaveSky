import {
    connect
} from 'react-redux'
import Home from "./home"
const mapSTP = state => ({
    user: state.entities.user
})

const mapDTP = dispatch => ({
})

export default connect(mapSTP, mapDTP)(Home)