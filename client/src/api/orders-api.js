import requester from "./requester"

const BASE_ORDERS_URL = 'http://localhost:3000/api/orders';

const create = ({ email, name, phone, enquiry }, userId, projectId) => requester.post(`${BASE_ORDERS_URL}/${projectId}`, { email, name, phone, enquiry, userId });

const getOrdersByUser = (userId) => requester.get(`${BASE_ORDERS_URL}/${userId}`);

export default {
    create,
    getOrdersByUser
}