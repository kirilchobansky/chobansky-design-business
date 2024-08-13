import requester from "./requester"

const BASE_COMMENTS_URL = 'http://localhost:3000/api/comments';

const create = (projectId, userId, comment) => requester.post(`${BASE_COMMENTS_URL}/${projectId}`, { comment, userId });

const edit = (commentId, updatedComment) => requester.put(`${BASE_COMMENTS_URL}/${commentId}`, { updatedComment });

const remove = (commentId, userId, projectId) => requester.del(`${BASE_COMMENTS_URL}/${commentId}`, { userId, projectId });

const getAllByProject = (projectId) => requester.get(`${BASE_COMMENTS_URL}/all/${projectId}`);

export default {
    create,
    edit,
    remove,
    getAllByProject
}