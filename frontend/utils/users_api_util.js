export const fetchUser = (username) => (
    $.ajax({
        url: `/api/users/`,
        method: 'GET',
        data: { user: {username}}
    })
)


