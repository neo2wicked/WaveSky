export const fetchComments = (songId) => (
    $.ajax({
        url: `/api/comments/`,
        method: "GET",
        data: { comment: { song_id: songId } }
    })
)
export const createComment = (comment) => (
    // console.log(comment)
    $.ajax({
        url: `/api/comments`,
        method: "POST",
        data: {comment},
    })
)
export const deleteComment = (commentId) => (
    $.ajax({
        url: `/api/comments/${commentId}`,
        method: "DELETE",
    })
)