import {
    connect
} from "react-redux"
import {
    withRouter
} from "react-router-dom"

import Search from "./search"
import {
    requestSearch,
    createDeleteLike,
    deleteSong
} from "../../actions/songs/songs_actions"

import {
    receiveCurrentSong
} from "../../actions/session/session_actions"
const mapSTP = state => ({
    currentUser: state.session.currentUser,
    songs: Object.values(state.entities.songs),
    currentSong: state.session.currentSong,

})
const mapDTP = dispatch => ({
    requestSearch: (search) => dispatch(requestSearch(search)),
    receiveCurrentSong: (song) => dispatch(receiveCurrentSong(song)),
    createDeleteLike: (payload) => dispatch(createDeleteLike(payload)),
    deleteSong: (songId) => dispatch(deleteSong(songId))

})

export default withRouter(connect(mapSTP, mapDTP)(Search))