import axios from "../utils/axios-customize"

const register = (fullName, email, password, phone) => {
    return axios.post(`/api/v1/user/register`, { fullName, email, password, phone })
}

const login = (email, password) => {
    return axios.post(`/api/v1/auth/login`, {
        username: email,
        password: password,
        delay: 3000
    })
}

const fetchAccount = () => {
    return axios.get(`api/v1/auth/account`)
}

const logout = () => {
    return axios.post(`/api/v1/auth/logout`)
}

// const getUserWithPaginate = (current, pageSize) => {
//     return axios.get(`api/v1/user?current=${current}&pageSize=${pageSize}`)
// }

const getUserWithPaginate = (query) => {
    return axios.get(`api/v1/user?${query}`)
}

const postAddNewUser = (fullName, password, email, phone) => {
    return axios.post(`/api/v1/user`, { fullName, password, email, phone })
}

const postCreateListUserBulk = (data) => {
    return axios.post(`api/v1/user/bulk-create`, data)
}

export {
    register, login, fetchAccount, logout, getUserWithPaginate,
    postAddNewUser, postCreateListUserBulk
}