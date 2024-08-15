import requester from "./requester"

const BASE_USERS_URL = 'http://localhost:3000/api/users'

export const updateUser = (userId, userData) => requester.put(`${BASE_USERS_URL}/update-user-details/${userId}`, { userData });

export const deleteUser = (userId) => requester.del(`${BASE_USERS_URL}/${userId}`);

export const likeProject = (projectId, userId) => requester.post(`${BASE_USERS_URL}/like/${projectId}`, { userId });

export const dislikeProject = (projectId, userId) => requester.post(`${BASE_USERS_URL}/dislike/${projectId}`, { userId });

export const getLikedProjects = (userId) => requester.get(`${BASE_USERS_URL}/favorite-projects/${userId}`);