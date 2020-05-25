import {
    connect
} from 'react-redux'

import Index from "./index"
import {
    fetchRandomNoInfoSongs,
    removeSongs
} from '../../actions/songs/songs_actions'

const mapSTP = (state) => ({
    songs: state.entities.songs
})

const mapDTP = (dispatch) => ({
    fetchRandomNoInfoSongs: () => dispatch(fetchRandomNoInfoSongs()),
    removeSongs: () => dispatch(removeSongs())
})

export default (connect(mapSTP, mapDTP)(Index))