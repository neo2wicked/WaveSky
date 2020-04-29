export const fetchUserSongs = (username) => (
    $.ajax({
        url: "/api/songs",
        method: 'GET',
        data: { song: {username: username}}
    })
)
export const createSong = (song) => (
    $.ajax({
        url: "/api/songs",
        method: 'POST',
        data: song,
        contentType: false,
        processData: false,
    })
)