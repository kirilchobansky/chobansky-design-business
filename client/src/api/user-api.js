import requester from "./requester"

const BASE_URL = 'http://localhost:3000/api/users'

export const updateUser = (userId, userData) => requester.put(`${BASE_URL}/update-user-details/${userId}`, { userData });

export const deleteUser = (userId) => requester.del(`${BASE_URL}/${userId}`);