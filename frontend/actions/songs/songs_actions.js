import * as SongsAPIUtil from "../../utils/songs_api_util"
import * as LikesAPIUtil from "../../utils/like_utils"

export const RECEIVE_SONGS = "RECEIVE_SONGS"
export const RECEIVE_SONG = "RECEIVE_SONG"
export const RECEIVE_SONG_ERRORS = "RECEIVE_SONG_ERRORS"

//actions

export const receiveSongs = ( songs ) => ({
    type: RECEIVE_SONGS,
    songs
})

export const receiveSong = ( song ) => ({
    type: RECEIVE_SONG,
    song
})

export const receiveSongErrors = (errors) => ({
    type: RECEIVE_SONG_ERRORS,
    errors
})

//thunk
export const createDeleteLike = ({song, like}) => dispatch => (
    LikesAPIUtil.createDeleteLike(like)
        .then(() => dispatch(receiveSong(song)))
)

export const fetchUserSongs = (username) => dispatch => (
    SongsAPIUtil.fetchUserSongs(username)
        .then((songs) => dispatch(receiveSongs(songs)))
)

export const fetchSong = (songId) => dispatch => (
    SongsAPIUtil.fetchSong(songId)
        .then((song) => dispatch(receiveSong(song)))
)

export const createSong = (song) => dispatch => (
    SongsAPIUtil.createSong(song)
        .then(() => dispatch(receiveSong(song)))
        .fail((errors) => dispatch(receiveSongErrors(errors.responseJSON)))
)

export const updateSong = (info) => dispatch => (
    SongsAPIUtil.updateSong(info)
        .then(() => dispatch(receiveSong(info.song)))
        .fail((errors) => dispatch(receiveSongErrors(errors.responseJSON)))
)