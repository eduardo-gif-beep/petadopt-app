import api from '../models/api';
import StorageService from '../helpers/StorageService'; 

export const sendAdoptionRequest = async (adoptionData) => {
    try {
        const response = await api.post('/adoptions/request', adoptionData);
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.msg || "Error en el servidor");
    }
};


export const getMyRequests = async () => {
    try {
        const response = await api.get('/adoptions/my-requests');
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.msg || "No se pudo cargar el historial");
    }
};

export const getUserProfile = async () => {
    try {
        const response = await api.get('/auth/profile');
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener datos del perfil");
    }
};

export const logoutUser = async () => {
    await StorageService.resetToken('userToken');
};