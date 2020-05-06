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


export const updateSong = (info) => (
    $.ajax({
        url: `/api/songs/${info.song.id}`,
        method: "PATCH",
        data: info.form,
        contentType: false,
        processData: false,
    })
)