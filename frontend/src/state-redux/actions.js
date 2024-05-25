export const setUser = (payload) =>({
    type: "SET_USER",
    payload: payload
})

export const logOutUser = () => ({
    type: "LOGOUT_USER"
})