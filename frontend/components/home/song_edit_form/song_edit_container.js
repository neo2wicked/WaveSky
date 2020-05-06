import { connect } from "react-redux"
import {updateSong } from "../../../actions/songs/songs_actions"
import {
    withRouter
} from 'react-router-dom';

import SongEditForm from "./song_edit_form"


const mapSTP = state => ({
    // songs: Object.values(state.entities.songs),
    // user: state.session.currentUser,
    errors: state.errors.song
})
const mapDTP = dispatch => ({
    // fetchUserSongs: (username) => dispatch(fetchUserSongs(username)),
    // fetchUser: (username) => dispatch(fetchUser(username)),
    // createSong: (song) => dispatch(createSong(song)),
    updateSong: (song) => dispatch(updateSong(song))
})

export default withRouter(connect(mapSTP, mapDTP)(SongEditForm))