import requester from "./requester"

const BASE_URL = 'http://localhost:3030/jsonstore/projects/details';

const buildUrl = (projectId) => `${BASE_URL}/${projectId}/comments`;

const create = (projectId, username, text) => requester.post(buildUrl(projectId), { username, text });

const getAll = async (projectId) => {
    const result = await requester.get(buildUrl(projectId));

    if(result){
        const comments = Object.values(result);
        return comments;
    }
    return [];
}

export default {
    create,
    getAll
}