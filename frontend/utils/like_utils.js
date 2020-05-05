export const createDeleteLike = (like) => (
    $.ajax({
        url: `/api/likes`,
        method: "POST",
        data: { like }
    })
)