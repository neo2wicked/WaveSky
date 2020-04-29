import * as SongsAPIUtil from "../../utils/songs_api_util"

export const RECEIVE_SONGS = "RECEIVE_SONGS"
export const RECEIVE_SONG = "RECEIVE_SONG"

//actions

export const receiveSongs = ( songs ) => ({
    type: RECEIVE_SONGS,
    songs
})

export const receiveSong = ( song ) => ({
    type: RECEIVE_SONG,
    song
})

//thunk

export const fetchUserSongs = (username) => dispatch => (
    SongsAPIUtil.fetchUserSongs(username)
        .then((songs) => dispatch(receiveSongs(songs)))
)

export const createSong = (song) => dispatch => (
    SongsAPIUtil.createSong(song)
        .then(() => dispatch(receiveSong(song)))
)

export const updateSong = (song) => dispatch => (
    SongsAPIUtil.updateSong(song)
        .then(() => dispatch(receiveSong(song)))
)