import requester from "./requester"

const BASE_USERS_URL = 'http://localhost:3000/api/users'

const updateUser = (userId, userData) => requester.put(`${BASE_USERS_URL}/update-user-details/${userId}`, { userData });

const deleteUser = (userId) => requester.del(`${BASE_USERS_URL}/${userId}`);

const likeProject = (projectId, userId) => requester.post(`${BASE_USERS_URL}/like/${projectId}`, { userId });

const dislikeProject = (projectId, userId) => requester.post(`${BASE_USERS_URL}/dislike/${projectId}`, { userId });

const getLikedProjects = (userId) => requester.get(`${BASE_USERS_URL}/favorite-projects/${userId}`);

const search = (search) => requester.get(`${BASE_USERS_URL}/search/${search}`);

const changePassword = (userId, oldPassword, newPassword) => requester.patch(`${BASE_USERS_URL}/change-pass`, { userId, oldPassword, newPassword });

export default {
    updateUser,
    deleteUser,
    likeProject,
    dislikeProject,
    getLikedProjects,
    search,
    changePassword
}
