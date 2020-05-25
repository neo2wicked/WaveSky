import {
    connect
} from "react-redux"
import SongForm from "./song_form"
import {
    createSong,
    clearSongErrors,
    removeSongs
} from "../../actions/songs/songs_actions"
import {
    withRouter
} from 'react-router-dom';

const mapSTP = state => ({
    user: state.session.currentUser,
    errors: state.errors.song
})

const mapDTP = dispatch => ({
    createSong: (song) => dispatch(createSong(song)),
    clearSongErrors: () => dispatch(clearSongErrors()),
    removeSongs: () => dispatch(removeSongs())
})

export default withRouter(connect(mapSTP, mapDTP)(SongForm))