export const fetchUserSongs = (userId) => (
    $.ajax({
        url: "/api/songs",
        method: 'GET',
        data: { song: {user_id: userId}}
    })
)
export const createSong = (song) => (
    $.ajax({
        url: "/api/songs",
        method: 'POST',
        data: { song }
    })
)