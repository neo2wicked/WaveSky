import { connect } from "react-redux"
import SongForm from "./song_form"
import {fetchUserSongs ,createSong , updateSong } from "../../actions/songs/songs_actions"
import {
    withRouter
} from 'react-router-dom';
import {fetchUser} from "../../actions/user/user_actions"


const mapSTP = state => ({
    // songs: Object.values(state.entities.songs),
    user: state.session.currentUser,
    errors: state.errors.song
})
const mapDTP = dispatch => ({
    // fetchUserSongs: (username) => dispatch(fetchUserSongs(username)),
    // fetchUser: (username) => dispatch(fetchUser(username)),
    createSong: (song) => dispatch(createSong(song)),
    // updateSong: (song) => dispatch(updateSong(song))
})

export default withRouter(connect(mapSTP,mapDTP)(SongForm))