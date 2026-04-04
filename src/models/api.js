import axios from "axios";
import StorageService from '../helpers/StorageService';

const api = axios.create({
    baseURL: "https://petadopt-eyp0.onrender.com",
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    async (config) => {
        try {
            const token = await StorageService.getToken('userToken'); 
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            
            return config;
        } catch (error) {
            return Promise.reject(error);            
        }
    },
    (error) => {
        return Promise.reject(error); 
    }
);

export default api;