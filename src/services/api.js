import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getSuppliers = () => api.get('/suppliers');
export const getFarmers = () => api.get('/farmers');
export const getOrders = () => api.get('/orders');
export const createOrder = (orderData) => api.post('/orders', orderData);
export const registerFarmer = (farmerData) => api.post('/farmers/register', farmerData);

export default api;
