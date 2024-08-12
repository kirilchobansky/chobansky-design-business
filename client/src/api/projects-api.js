import requester from "./requester";

const BASE_PROJECTS_URL = 'http://localhost:3000/api/projects';

const getAll = () => requester.get(BASE_PROJECTS_URL);

const getOneById = (id) => requester.get(`${BASE_PROJECTS_URL}/details/${id}`);

export default {
    getAll,
    getOneById
}