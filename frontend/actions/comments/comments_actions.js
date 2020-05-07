import * as CommentAPIUtil from "../../utils/comments_api_util"

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
export const RECEIVE_COMMENT = "RECEIVE_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"

//actions

export const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments
})

export const receiveComment = (comment) => ({
    type: RECEIVE_COMMENT,
    comment
})

export const removeComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
})

//thunk
export const fetchComments = (songId) => dispatch => (
    CommentAPIUtil.fetchComments(songId)
    .then((comments) => {
        dispatch(receiveComments(comments))})
)
export const createComment = (comment) => dispatch => (
    CommentAPIUtil.createComment(comment)
    .then(() => dispatch(fetchComments(comment.songId)))
)
export const deleteComment = (commentId) => dispatch => (
    CommentAPIUtil.deleteComment(commentId)
    .then(() => dispatch(removeComment(commentId)))
)