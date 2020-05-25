import {
    connect
} from "react-redux"
import {
    withRouter
} from "react-router-dom"

import Explore from "./explore"
import {
    fetchRandomSongs,
    createDeleteLike,
    deleteSong,
    removeSongs
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
    fetchRandomSongs: () => dispatch(fetchRandomSongs()),
    receiveCurrentSong: (song) => dispatch(receiveCurrentSong(song)),
    createDeleteLike: (payload) => dispatch(createDeleteLike(payload)),
    deleteSong: (songId) => dispatch(deleteSong(songId)),
    removeSongs: () => dispatch(removeSongs())
})

export default withRouter(connect(mapSTP, mapDTP)(Explore))