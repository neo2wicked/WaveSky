export const createDeleteFollower = (follower) => (
    $.ajax({
        url: `/api/followers`,
        method: "POST",
        data: {follower}
    })
)