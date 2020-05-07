import {
    connect
} from 'react-redux'

import Index from "./index"
import { fetchRandomNoInfoSongs } from '../../actions/songs/songs_actions'
const mapSTP = (state) => ({
    songs: state.entities.songs
})
const mapDTP = (dispatch) => ({
    fetchRandomNoInfoSongs: () => dispatch(fetchRandomNoInfoSongs())
})



export default (connect(mapSTP, mapDTP)(Index))