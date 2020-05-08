import {
    connect
} from "react-redux"


import {
    withRouter
} from 'react-router-dom';

import SongShowPage from "./song_show_page"

import {
    fetchSong,
    createDeleteLike,
    clearSongErrors
} from "../../../actions/songs/songs_actions"

import {fetchComments, createComment, deleteComment} from "../../../actions/comments/comments_actions"

import { receiveCurrentSong } from "../../../actions/session/session_actions"
import {
    fetchUser,
    createDeleteFollower
} from "../../../actions/user/user_actions"

const mapSTP = (state, ownProps) => ({
    user: state.entities.user,
    song: state.entities.songs[ownProps.match.params.songId],
    currentUser: state.session.currentUser,
    currentSong: state.session.currentSong,
    comments: state.entities.comments
})
const mapDTP = dispatch => ({
    fetchUser: (username) => dispatch(fetchUser(username)),
    fetchSong: (songId) => dispatch(fetchSong(songId)),
    fetchComments: (songId) => dispatch(fetchComments(songId)),
    createComment: (comment) => dispatch(createComment(comment)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    receiveCurrentSong: (song) => dispatch(receiveCurrentSong(song)),
    createDeleteLike: (payload) => dispatch(createDeleteLike(payload)),
    createDeleteFollower: (payload) => dispatch(createDeleteFollower(payload)),
    clearSongErrors: () => dispatch(clearSongErrors())
})

export default withRouter(connect(mapSTP, mapDTP)(SongShowPage))