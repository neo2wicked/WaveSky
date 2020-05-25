import {
    connect
} from 'react-redux'
import {
    receiveCurrentSong
} from "../../actions/session/session_actions"
import Player from "./player"
const mapSTP = state => ({
    currentSong: state.session.currentSong,
    user: state.entities.user,
})

const mapDTP = dispatch => ({
    receiveCurrentSong: (song) => dispatch(receiveCurrentSong(song))
})

export default connect(mapSTP, mapDTP)(Player)