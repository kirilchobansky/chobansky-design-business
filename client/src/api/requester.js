const requester = async (method, url, data) => {
    const options = {};

    if(method !== 'GET'){
        options.method = method;
    }

    if(data) {
        options.headers = {
            'Content-Type': 'application/json'
        }

        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check if the response has content before parsing
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            const result = await response.json();
            return result;
        } else {
            // If there's no content or it's not JSON, return null or an empty object
            return null;
        }
    } catch (error) {
        console.error('Failed to fetch:', error);
        throw error;
    }
}

const get = requester.bind(null, 'GET');
const post = requester.bind(null, 'POST');
const put = requester.bind(null, 'PUT');
const del = requester.bind(null, 'DELETE');

export default {
    get,
    post,
    put,
    del
}