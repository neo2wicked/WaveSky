export const fetchUser = (username) => (
    $.ajax({
        url: `/api/users/`,
        method: 'GET',
        data: { user: {username}}
    })
)
export const updateUser = (info) => (
    $.ajax({
        url: `/api/users/${info.user.id}`,
        method: 'PATCH',
        data: info.form,
        contentType: false,
        processData: false,
    })
)



