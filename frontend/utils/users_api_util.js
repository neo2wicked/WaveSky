export const fetchUser = (username) => (
    $.ajax({
        url: `/api/users/`,
        method: 'GET',
        data: { user: {username}}
    })
)
export const updateUser = (user) => (
    $.ajax({
        url: `/api/users/${user.id}`,
        method: 'PATCH',
        data: { user }
    })
)



