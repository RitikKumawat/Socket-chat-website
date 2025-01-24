const BASE_URL = "http://localhost:5000/api"

//AUTH ENDPOINTS
export const endpoints={
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    LOGOUT_API: BASE_URL + "/auth/logout",
}

//MESSAGE ENDPOINTS
export const messageEndpoints={
    GET_MESSAGE_API: BASE_URL + "/messages/:id",
    SEND_MESSAGE_API: BASE_URL + "/messages/send/:id",
}

//USER ENDPOINTS
export const userEndpoints={
    GET_SIDEBAR_USERS: BASE_URL + "/users/"
}