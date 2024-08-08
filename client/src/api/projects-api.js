import requester from "./requester";

const BASE_PROJECTS_URL = 'http://localhost:3030/jsonstore/projects';

const getAll = async () => {
    const result = await requester.get(BASE_PROJECTS_URL + '/list');

    const projects = Object.values(result);
    return projects;
}

const getOneById = (id) => requester.get(`${BASE_PROJECTS_URL}/details/${id}`);

export default {
    getAll,
    getOneById
}