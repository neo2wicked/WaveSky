import {
    connect
} from "react-redux"

import {
    fetchUserSongs, createDeleteLike, deleteSong, clearSongErrors, removeSongs
} from "../../../actions/songs/songs_actions"

import {
    withRouter
} from 'react-router-dom';

import {
    fetchUser, clearUser
} from "../../../actions/user/user_actions"

import { receiveCurrentSong } from "../../../actions/session/session_actions"
import Songs from "./songs"

const mapSTP = state => ({
    songs: state.entities.songs,
    user: state.entities.user,
    currentSong: state.session.currentSong,
    currentUser: state.session.currentUser
})

const mapDTP = dispatch => ({
    fetchUserSongs: (username) => dispatch(fetchUserSongs(username)),
    fetchUser: (username) => dispatch(fetchUser(username)),
    receiveCurrentSong: (song) => dispatch(receiveCurrentSong(song)),
    createDeleteLike: (payload) => dispatch(createDeleteLike(payload)),
    deleteSong: (songId) => dispatch(deleteSong(songId)),
    clearSongErrors: () => dispatch(clearSongErrors()),
    removeSongs: () => dispatch(removeSongs()),
    clearUser: () => dispatch(clearUser())
})

export default withRouter(connect(mapSTP, mapDTP)(Songs))