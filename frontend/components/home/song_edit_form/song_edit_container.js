import { connect } from "react-redux"
import {updateSong } from "../../../actions/songs/songs_actions"
import {
    withRouter
} from 'react-router-dom';

import SongEditForm from "./song_edit_form"


const mapSTP = state => ({
    errors: state.errors.song
})
const mapDTP = dispatch => ({
    updateSong: (song) => dispatch(updateSong(song))
})

export default withRouter(connect(mapSTP, mapDTP)(SongEditForm))