import { getAccessToken } from "../utils/authUtil";

const requester = async (method, url, data) => {
    const options = {};

    const accessToken = getAccessToken();

    if(accessToken) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`
        };        
    }

    if(method !== 'GET'){
        options.method = method;        
    }

    if(data) {
        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json'
        }

        options.body = JSON.stringify(data);        
    }

    try {
        const response = await fetch(url, options);

        if (response.status === 204) {
            return;
        }

        const result = await response.json();

        if (!response.ok) {
            throw result;
        }

        return result;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }
}

const get = requester.bind(null, 'GET');
const post = requester.bind(null, 'POST');
const put = requester.bind(null, 'PUT');
const patch = requester.bind(null, 'PATCH');
const del = requester.bind(null, 'DELETE');

export default {
    get,
    post,
    put,
    patch,
    del
}