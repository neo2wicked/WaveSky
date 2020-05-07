import {
    connect
} from "react-redux"

import {
    fetchUserSongs, createDeleteLike, deleteSong
} from "../../../actions/songs/songs_actions"

import {
    withRouter
} from 'react-router-dom';

import {
    fetchUser
} from "../../../actions/user/user_actions"

import { receiveCurrentSong } from "../../../actions/session/session_actions"
import Songs from "./songs"


const mapSTP = state => ({
    songs: Object.values(state.entities.songs),
    user: state.entities.user,
    currentSong: state.session.currentSong,
    currentUser: state.session.currentUser
    
})
const mapDTP = dispatch => ({
    fetchUserSongs: (username) => dispatch(fetchUserSongs(username)),
    fetchUser: (username) => dispatch(fetchUser(username)),
    receiveCurrentSong: (song) => dispatch(receiveCurrentSong(song)),
    createDeleteLike: (payload) => dispatch(createDeleteLike(payload)),
    deleteSong: (songId) => dispatch(deleteSong(songId))
})

export default withRouter(connect(mapSTP, mapDTP)(Songs))