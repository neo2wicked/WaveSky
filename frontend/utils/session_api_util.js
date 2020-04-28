export const signup = (user) => (
    $.ajax({
        url: `/api/users/`,
        method: 'POST',
        data: { user }
    })
)

export const login = (user) => (
    $.ajax({
        url: `/api/session/`,
        method: 'POST',
        data: { user }
    })
)

export const logout = () => (
    $.ajax({
        url: `/api/session/`,
        method: 'DELETE'
    })
)

export const fetchUserByUsername = (user) => (
    $.ajax({
        url: `/api/session/`,
        method: 'GET',
        data: { user }
    })
)
// export const fetchUserByUsername = (user) => {
//     return ($.ajax({
//        url: `/api/session/`,
//        method: 'GET',
//        data: {
//            user
//        }
//    }))
// }