import requester from "./requester"

const BASE_URL = 'http://localhost:3000/api/users'

export const login = (email, password) => requester.post(`${BASE_URL}/login`, { email, password });

export const register = (email, username, password) => requester.post(`${BASE_URL}/register`, { email, username, password });

